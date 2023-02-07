import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationService, ConfirmEventType, MessageService } from "primeng/api";
import { FileUpload } from "primeng/fileupload";
import { Subscription } from 'rxjs';
import { Cohort } from 'src/app/models/cohort';
import { Individual, Sex } from 'src/app/models/individual';
import { Phenopacket } from 'src/app/models/phenopacket';
import { CohortService } from 'src/app/services/cohort.service';
import { PhenopacketService } from 'src/app/services/phenopacket.service';
import { UploadService } from "../../services/upload-service";
import { MessageDialogComponent } from '../shared/message-dialog/message-dialog.component';
import { Table }  from 'primeng/table';

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
  cohort: Cohort;
  /** Array used to hold opened tabs **/
  individualTabsMap = new Map<String, Phenopacket>();
  individualTabs: Phenopacket[] = [];
  /** Array used to hold the list of individuals present in the summary tab **/
  cohortMap = new Map<string, Phenopacket>();

  // Table items
  displayedColumns = ['id', 'dob', 'sex', 'remove'];
  activeIndex = 0;

  phenopacketSubscription: Subscription;
  cohortPhenopacketSubscription: Subscription;
  cohortSubscription: Subscription;
  phenopackets: Phenopacket[];

  selectedPhenopacket: Phenopacket;
  constructor(public phenopacketService: PhenopacketService,
              private cohortService: CohortService,

              private uploadService: UploadService,
              public dialog: MatDialog,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private datePipe: DatePipe) {
  }
  ngOnDestroy(): void {
    if (this.cohortSubscription) {
      this.cohortSubscription.unsubscribe();
    }
    if (this.phenopacketSubscription) {
      this.phenopacketSubscription.unsubscribe();
    }
    if (this.cohortPhenopacketSubscription) {
      this.cohortPhenopacketSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.cohortSubscription = this.cohortService.getCohort().subscribe(cohort => {
      this.cohort = cohort;
      const members = this.cohort.members;
      if (members) {
        for (const phenopacket of members) {
          this.addTab(phenopacket);
        }

      }
    });
    this.updateCohort();
  }

  updateCohort() {
    if (this.cohort) {
      if (this.individualTabsMap.keys.length < this.cohort.members.keys.length + 1) {
        this.cohort.members.forEach(phenopacket => {
          this.individualTabsMap.set(phenopacket.id, phenopacket);
          this.cohortMap.set(phenopacket.id, phenopacket);
        });
        this.individualTabs = Array.from(this.individualTabsMap.values());
        this.phenopackets = Array.from(this.cohortMap.values());
      }
    }
  }

  addTab(phenopacket?: Phenopacket) {
    if (phenopacket === undefined) {
      phenopacket = new Phenopacket();
      phenopacket.id = `new-patient-${this.individualTabs.length + 1}`;
      phenopacket.subject = new Individual();
    }
    this.individualTabs = Array.from(this.individualTabsMap.values());
    this.individualTabsMap.set(phenopacket.id, phenopacket);
    this.cohortMap.set(phenopacket.id, phenopacket);
    // this.selected.setValue(this.individualTabs.keys.length);
    this.phenopackets = Array.from(this.cohortMap.values());
    this.individualTabs = Array.from(this.individualTabsMap.values());

    // this.cohortService.setCohort(this.cohort);
  }

  removeIndividual(individual: Phenopacket) {
    // we remove the tab and the individual
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Remove here
        // find idx in individualTabs for individual to remove
        const removeIdx = this.individualTabs.indexOf(individual);
        // remove individual tab
        this.individualTabs.splice(removeIdx, 1);
        // remove individual from family map
        this.cohortMap.delete(individual.id);
        this.phenopackets = Array.from(this.cohortMap.values());
        this.messageService.add({severity:'info', summary:'Confirmed', detail: `Phenopacket ${individual.id} removed.`});
      },
      reject: () => {}, key: "positionDialog"});
  }

  changeId(id: string, index: number) {
    const selectedIndividual = this.individualTabs[index];
    selectedIndividual.id = id;
  }
  changeSex(sex: Sex, index: number) {
    const selectedIndividual = this.individualTabs[index];
    selectedIndividual.subject.sex = sex;
  }
  changeDob(dob: Date, index: number) {
    const selectedIndividual = this.individualTabs[index];
    selectedIndividual.subject.dateOfBirth = dob.toISOString();
  }

  openTab(element: any) {
    this.table._selection = null;
    this.table.selectionChange.emit();

    if (!this.individualTabs.includes(element)) {
      this.individualTabs.push(element);
    }
    this.activeIndex = this.individualTabs.indexOf(element) + 1;
  }
  closeTab(index: number) {
    this.individualTabs.splice(index - 1, 1);
  }

  formatDate(date: Date, format: string) {
    return this.datePipe.transform(date, format);
  }

  handleFileUpload(event: any) {
    console.log('---Uploading one or more files---');
    let currentPhenopackets = [];
    if (this.cohort) {
      this.cohort.members?.forEach(val => currentPhenopackets.push(val));
    }
    const files = event.files;
    const isSingleUploaded = files.length > 1;
    // TODO: multiple files?
    this.uploadService.importFromFile(files[0])
        .subscribe(
            (phenopackets: Phenopacket[]) => {
              const currentPhenopacketsId = currentPhenopackets.map(phenopacket => phenopacket.id);
              for (const newPhenopacket of phenopackets) {
                if (newPhenopacket.id in currentPhenopacketsId) {
                  const errorMessage = `Phenopacket Id '${newPhenopacket.id}' already exists.`;
                  throw new Error(errorMessage);
                }
              }

              this.phenopackets = phenopackets;
              if (this.cohort === undefined) {
                this.cohortService.setCohort(new Cohort());
              }
              this.cohort.members.push(phenopackets[0]);
              this.cohortService.setCohort(this.cohort);
              this.messageService.add({severity:'success', summary: "Phenopacket Upload Success!"});

            }, (error) => {
              this.fupload.clear()
              this.fupload._files = [];
              const detail = error?.detail != null ? error.detail : 'Please try again.';
              this.messageService.add({severity:'error', summary: error.message, detail: detail});
            });
  }

}
