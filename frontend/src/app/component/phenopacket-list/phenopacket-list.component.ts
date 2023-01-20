import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Cohort } from 'src/app/models/cohort';
import { Individual, Sex } from 'src/app/models/individual';
import { Phenopacket } from 'src/app/models/phenopacket';
import { CohortService } from 'src/app/services/cohort.service';
import { DownloadService } from 'src/app/services/download-service';
import { PhenopacketService } from 'src/app/services/phenopacket.service';
import { MessageDialogComponent } from '../shared/message-dialog/message-dialog.component';
import { UploadDialogComponent } from '../shared/upload-dialog/upload-dialog.component';


@Component({
  selector: 'app-phenopacket-list',
  templateUrl: './phenopacket-list.component.html',
  styleUrls: ['./phenopacket-list.component.scss'],
  providers: [DatePipe]
})
export class PhenopacketListComponent implements OnInit, OnDestroy {
  cohort: Cohort;
  /** Array used to hold opened tabs **/
  individualTabsMap = new Map<String, Phenopacket>();
  individualTabs: Phenopacket[] = [];
  /** Array used to hold the list of individuals present in the summary tab **/
  cohortMap = new Map<string, Phenopacket>();

  // Table items
  displayedColumns = ['id', 'timeOfLastEncounter', 'sex', 'download', 'remove'];
  activeIndex = 0;

  phenopacketSubscription: Subscription;
  cohortPhenopacketSubscription: Subscription;
  cohortSubscription: Subscription;
  datasource = new MatTableDataSource<Phenopacket>();
  constructor(public phenopacketService: PhenopacketService,
    private cohortService: CohortService,
    private downloadService: DownloadService,
    public dialog: MatDialog,
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
        this.datasource.data = Array.from(this.cohortMap.values());
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
    this.datasource.data = Array.from(this.cohortMap.values());
    this.individualTabs = Array.from(this.individualTabsMap.values());

    // this.cohortService.setCohort(this.cohort);
  }

  removeIndividual(individual: Phenopacket) {
    // we remove the tab and the individual
    const msgData = { 'title': 'Delete Phenopacket' };
    msgData['description'] = `Delete the Phenopacket with id ${individual.id} ?`;
    msgData['displayCancelButton'] = true;
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '400px',
      data: msgData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'ok') {
        // find idx in individualTabs for individual to remove
        let idx;
        for (let i = 0; i < this.individualTabs.length; i++) {
          if (this.individualTabs[i].id === individual.id) {
            idx = i;
            break;
          }
        }
        // remove individual tab
        this.individualTabs.splice(idx, 1);
        // remove individual from family map
        this.cohortMap.delete(individual.id);
        this.datasource.data = Array.from(this.cohortMap.values());
      }
    });
    return dialogRef;

  }

  downloadPhenopacket(phenopacket: Phenopacket) {
    this.downloadService.saveAsJson(phenopacket, true);
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
    if (!this.individualTabs.includes(element)) {
      this.individualTabs.push(element);
    }
    for (let i = 0; i < this.individualTabs.length; i++) {
      if (element === this.individualTabs[i]) {
        this.activeIndex = i + 1;
      }
    }
  }
  closeTab(index: number) {
    this.individualTabs.splice(index, 1);
  }

  formatDate(date: Date, format: string) {
    return this.datePipe.transform(date, format);
  }

  /**
   * Open dialog to upload a new file
   */
  public openFileUploadDialog() {
    const currPhenopackets = [];
    if (this.cohort) {
      this.cohort.members?.forEach(val => currPhenopackets.push(val));
      console.log('uploaded:');
      console.log(this.cohort.members);
    }
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      width: '40%',
      height: '40%',
      data: { fileType: 'JSON, yaml', titleText: 'Upload Phenopacket file(s)', currentPhenopackets: currPhenopackets }
    });
    dialogRef.afterClosed().subscribe(result => {
      // refresh datasource
      // this.refresh();
      // wait 2 sec
      // (async () => {
      // await this.delay(2000);
      // this.refresh();
      // })();
    });
  }

}
