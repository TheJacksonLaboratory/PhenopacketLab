import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Cohort } from 'src/app/models/cohort';
import { Individual, Sex } from 'src/app/models/individual';
import { Phenopacket } from 'src/app/models/phenopacket';
import { FamilyData } from '../family-list/family-data';
import { DataPresentMatTableDataSource } from '../shared/DataPresentMatTableDataSource';
import { MessageDialogComponent } from '../shared/message-dialog/message-dialog.component';


@Component({
  selector: 'app-cohort-list',
  templateUrl: './cohort-list.component.html',
  styleUrls: ['./cohort-list.component.scss'],
  providers: [DatePipe]
})
export class CohortListComponent implements OnInit {
  cohort: Cohort;
  /** Array used to hold opened tabs **/
  individualTabs: Phenopacket[] = [];
  /** Array used to hold the list of individuals present in the summary tab **/
  cohortMap: Map<String, Phenopacket>;
  selected = new FormControl(0);

  @ViewChild('varPaginator', { static: true }) varPaginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  //Table items
  displayedColumns = ['id', 'dob', 'sex', 'remove'];

  // MatPaginator Inputs
  pageLength = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 50, 100];

  datasource = new DataPresentMatTableDataSource<Phenopacket>();
  selectionProband = new SelectionModel<Phenopacket>(false, []);

  constructor(public dialog: MatDialog, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.cohort = new FamilyData().COHORT_DATA;
    this.cohortMap = new Map<string, Phenopacket>();
    for (let individual of this.cohort.members) {
      this.individualTabs.push(individual);
      this.cohortMap.set(individual.id, individual);
    }
    this.datasource.data = Array.from(this.cohortMap.values());
  }

  addTab() {
    let newPheno = new Phenopacket();
    newPheno.id = `new-patient-${this.individualTabs.length + 1}`;
    newPheno.subject = new Individual();
    this.individualTabs.push(newPheno);
    this.cohortMap.set(newPheno.id, newPheno);
    this.selected.setValue(this.individualTabs.length);
    this.datasource.data = Array.from(this.cohortMap.values());
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
    let selectedIndividual = this.individualTabs[index];
    selectedIndividual.id = id;
  }
  changeSex(sex: Sex, index: number) {
    let selectedIndividual = this.individualTabs[index];
    selectedIndividual.subject.sex = sex;
  }
  changeDob(dob: Date, index: number) {
    let selectedIndividual = this.individualTabs[index];
    selectedIndividual.subject.dateOfBirth = dob;
  }

  openTab(element: any) {
    if (!this.individualTabs.includes(element)) {
      this.individualTabs.push(element);
    }
    for(let i = 0; i < this.individualTabs.length; i++) {
      if (element === this.individualTabs[i]) {
        this.selected.setValue(i + 1);
      }
    }
    
  }
  closeTab(index: number) {
    this.individualTabs.splice(index, 1)
  }

  doPageChange(pageEvent: any) {

  }

  formatDate(date: Date, format: string) {
    return this.datePipe.transform(date, format);
  }

}
