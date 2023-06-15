import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { TabView } from 'primeng/tabview';
import { Subscription } from 'rxjs';
import { Cohort } from 'src/app/models/cohort';
import { Phenopacket } from 'src/app/models/phenopacket';
import { CohortService } from 'src/app/services/cohort.service';
import { DownloadService } from 'src/app/services/download-service';
import { PhenopacketService } from 'src/app/services/phenopacket.service';
import { UploadService } from '../../services/upload-service';
import { Table } from 'primeng/table';
import { ProfileSelection } from 'src/app/models/profile';
import { Router } from '@angular/router';
import { MetadataService } from 'src/app/services/metadata.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ValidationResultsDialogComponent } from '../shared/validation-results-dialog/validation-results-dialog.component';

@Component({
  selector: 'app-phenopacket-list',
  templateUrl: './phenopacket-list.component.html',
  styleUrls: ['./phenopacket-list.component.scss'],
  providers: [DatePipe],
  encapsulation: ViewEncapsulation.None
})
export class PhenopacketListComponent implements OnInit, OnDestroy {

  @ViewChild(Table) table: Table;

  @ViewChild(FileUpload) fupload: FileUpload;

  @ViewChild(TabView) tabView: TabView;
  cohort: Cohort;
  /** Array used to hold opened tabs **/
  tabs: Phenopacket[] = [];
  /** Array used to hold the list of individuals present in the summary tab **/
  tabIndex = 0;

  phenopacketSubscription: Subscription;
  cohortPhenopacketSubscription: Subscription;
  phenopackets: Phenopacket[];
  ref: DynamicDialogRef;

  constructor(public phenopacketService: PhenopacketService,
    private cohortService: CohortService,
    private uploadService: UploadService,
    public dialog: MatDialog,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
    private downloadService: DownloadService,
    private dialogService: DialogService,
    private metadataService: MetadataService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.cohortService.getCohort().subscribe(cohort => {
      this.cohort = cohort;
      this.phenopackets = cohort.members;
    });
  }

  ngOnDestroy(): void {
    if (this.phenopacketSubscription) {
      this.phenopacketSubscription.unsubscribe();
    }
    if (this.cohortPhenopacketSubscription) {
      this.cohortPhenopacketSubscription.unsubscribe();
    }
    if (this.ref) {
      this.ref.close();
    }
  }

  removeIndividual(individual: Phenopacket) {
    // we remove the tab and the individual
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Remove tab if open since we are not default opening them
        const removeIdx = this.tabs.indexOf(individual);
        if (removeIdx > -1) {
          this.tabs.splice(removeIdx, 1);
        }
        // Remove them from the cohort.
        this.cohortService.removeCohortMember(individual);
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: `Phenopacket ${individual.id} removed.` });
      },
      reject: () => { }, key: 'positionDialog'
    });
  }

  startRareDisease() {
    this.phenopacketService.setProfileSelection(ProfileSelection.RARE_DISEASE);
    this.router.navigate(['creator/rare']);
  }

  downloadPhenopacket(phenopacket: Phenopacket) {
    this.downloadService.saveAsJson(phenopacket, true);
  }

  changeId(id: string, index: number) {
    const selectedIndividual = this.tabs[index];
    selectedIndividual.id = id;
  }
  changeSex(sex: string, index: number) {
    const selectedIndividual = this.tabs[index];
    selectedIndividual.subject.sex = sex;
  }
  changeDob(dob: Date, index: number) {
    const selectedIndividual = this.tabs[index];
    selectedIndividual.subject.dateOfBirth = dob.toISOString();
  }

  openTab(phenopacket) {
    this.table._selection = null;
    this.table.selectionChange.emit();
    // Avoid random bug in primeng
    if (!this.tabs.includes(phenopacket)) {
      this.tabView.tabs[0].selected = false;
      this.tabs.push(phenopacket);
    }
    this.tabIndex = this.tabs.indexOf(phenopacket) + 1;
  }
  closeTab(index: number) {
    this.tabs.splice(index - 1, 1);
  }

  formatDate(date: Date, format: string) {
    return this.datePipe.transform(date, format);
  }

  handleFileUpload(event: any) {
    console.log('---Uploading one or more files---');
    const files: File[] = event.files;
    files.map(file => this.uploadService.importFromFile(file).subscribe((newPhenopacket: Phenopacket) => {
      const phenopacketListIds = this.cohort.members?.map(phenopacket => phenopacket?.id);
      if (phenopacketListIds.includes(newPhenopacket.id)) {
        const errorMessage = `'${newPhenopacket.id}' already exists.`;
        this.messageService.add({ severity: 'error', summary: 'Duplicate Phenopacket ID Error', detail: errorMessage });
        this.clearFileUpload();
        return;
      }
      this.cohortService.addCohortMember(newPhenopacket);
      this.clearFileUpload();
      this.messageService.add({ severity: 'success', summary: 'Phenopacket Upload Success!' });
    }, (error) => {
      this.clearFileUpload();
      const detail = error?.detail != null ? error.detail : 'Please try again.';
      this.messageService.add({ severity: 'error', summary: error.message, detail: detail });
    })
    );
  }

  validatePhenopacket(phenopacket: Phenopacket) {
    // validate phenopacket
    const phenopacketStr = this.downloadService.saveAsJson(phenopacket, false);
    this.phenopacketService.validatePhenopacket(phenopacketStr).subscribe(validationResults => {
      this.ref = this.dialogService.open(ValidationResultsDialogComponent, {
        header: 'Validation results',
        width: '50%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        resizable: true,
        data: {
          validationResults: validationResults,
          phenopacket: phenopacket
        }
      });
      this.ref.onClose.subscribe(validatedPheno => {
        console.log(validationResults);
        this.cohortService.getCohort().subscribe(cohort => {
          // remove old pheno
          const index = cohort.members.indexOf(phenopacket, 0);
          if (index > -1) {
            cohort.members.splice(index, 1);
          }
          // add updated pheno
          cohort.members.push(validatedPheno);
        });
      });

    });
  }

  clearFileUpload() {
    this.fupload.clear();
    this.fupload._files = [];
  }
}
