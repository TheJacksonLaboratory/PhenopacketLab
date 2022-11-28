import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Cohort } from 'src/app/models/cohort';
import { Individual, Sex } from 'src/app/models/individual';
import { Phenopacket } from 'src/app/models/phenopacket';
import { CohortService } from 'src/app/services/cohort.service';
import { FamilyData } from '../family-list/family-data';
import { MessageDialogComponent } from '../shared/message-dialog/message-dialog.component';
import { UploadDialogComponent } from '../shared/upload-dialog/upload-dialog.component';


@Component({
  selector: 'app-phenopacket-list',
  templateUrl: './phenopacket-list.component.html',
  styleUrls: ['./phenopacket-list.component.scss'],
  providers: [DatePipe]
})
export class PhenopacketListComponent implements OnInit {
  cohort: Cohort;
  /** Array used to hold opened tabs **/
  individualTabsMap = new Map<String, Phenopacket>();
  individualTabs: Phenopacket[] = [];
  /** Array used to hold the list of individuals present in the summary tab **/
  cohortMap: Map<String, Phenopacket>;
  selected = new UntypedFormControl(0);

  // Table items
  displayedColumns = ['id', 'dob', 'sex', 'remove'];

  cohortSubscription: Subscription;
  datasource = new MatTableDataSource<Phenopacket>();
  selectionProband = new SelectionModel<Phenopacket>(false, []);

  constructor(private cohortService: CohortService, public dialog: MatDialog, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.cohort = new FamilyData().COHORT_DATA;
    this.cohortMap = new Map<string, Phenopacket>();
    for (const individual of this.cohort.members) {
      this.individualTabs.push(individual);
      this.cohortMap.set(individual.id, individual);
    }

    this.cohortSubscription = this.cohortService.getPhenopacket().subscribe(phenopacket => {
      this.addTab(phenopacket);
      this.updateCohort(this.cohortService.cohort);
    });
    this.datasource.data = Array.from(this.cohortMap.values());
  }

  updateCohort(cohort: Cohort) {
    this.cohort = cohort;
    if (this.cohort) {
      if (this.individualTabsMap.keys.length < this.cohort.members.keys.length + 1) {

        this.cohort.members.forEach((value: Phenopacket) => {
          this.cohortMap.set(value.id, value);
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
    this.individualTabs.push(phenopacket);
    // add new phenopacket to family
    if (this.cohort === undefined) {
      this.cohort = new Cohort();
    }
    this.individualTabsMap.set(phenopacket.id, phenopacket);
    this.cohortMap.set(phenopacket.id, phenopacket);
    this.selected.setValue(this.individualTabs.keys.length);
    this.datasource.data = Array.from(this.cohortMap.values());
    this.individualTabs = Array.from(this.individualTabsMap.values());

    this.cohortService.setCohort(this.cohort);
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
        this.selected.setValue(i + 1);
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
      height: '30%',
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
