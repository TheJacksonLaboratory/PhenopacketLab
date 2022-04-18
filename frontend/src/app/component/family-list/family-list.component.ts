import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Family } from 'src/app/models/family';
import { Individual, Sex } from 'src/app/models/individual';
import { Phenopacket } from 'src/app/models/phenopacket';
import { MessageDialogComponent } from '../shared/message-dialog/message-dialog.component';
import { FamilyData } from './family-data';

@Component({
  selector: 'app-family-list',
  templateUrl: 'family-list.component.html',
  styleUrls: ['family-list.component.scss'],
  providers: [DatePipe]
})
export class FamilyListComponent implements OnInit {
  family: Family;
  /** Array used to hold opened tabs **/
  individualTabs: Phenopacket[] = [];
  /** Array used to hold the list of individuals present in the summary tab **/
  familyMap: Map<String, Phenopacket>;
  selected = new FormControl(0);

  @ViewChild('varPaginator', { static: true }) varPaginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  //Table items
  displayedColumns = ['id', 'dob', 'sex', 'proband', 'remove'];

  // MatPaginator Inputs
  pageLength = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 50, 100];

  datasource = new MatTableDataSource<Phenopacket>();
  selectionProband = new SelectionModel<Phenopacket>(false, []);

  constructor(public dialog: MatDialog, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.family = new FamilyData().FAMILY_DATA;
    this.individualTabs.push(this.family.proband);
    this.familyMap = new Map<string, Phenopacket>();
    this.familyMap.set(this.family.proband.id, this.family.proband);
    for (let relative of this.family.relatives) {
      this.individualTabs.push(relative);
      this.familyMap.set(relative.id, relative);
    }
    this.datasource.data = Array.from(this.familyMap.values());
  }

  addTab() {
    let newPheno = new Phenopacket();
    newPheno.id = "new-pheno-" + (this.individualTabs.length + 1);
    newPheno.subject = new Individual();
    this.individualTabs.push(newPheno);
    this.familyMap.set(newPheno.id, newPheno);
    this.selected.setValue(this.individualTabs.length);
    this.datasource.data = Array.from(this.familyMap.values());
  }

  removeIndividual(individual: Phenopacket) {
    // we remove the tab and the individual
    const msgData = { 'title': 'Delete Phenopacket' };
    msgData['description'] = 'Delete the Phenopacket with id ' + individual.id + '?';
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
        this.familyMap.delete(individual.id);
        this.datasource.data = Array.from(this.familyMap.values());
      }
    });
    return dialogRef;

  }

  changeId(id: string, index: number) {
    console.log("id:" + id + ", index:" + index);
    let selectedIndividual = this.individualTabs[index];
    selectedIndividual.id = id;
  }
  changeSex(sex: Sex, index: number) {
    console.log("sex:" + sex + ", index:" + index);
    let selectedIndividual = this.individualTabs[index];
    selectedIndividual.subject.sex = sex;
  }
  changeDob(dob: Date, index: number) {
    console.log("dob:" + dob + ", index:" + index);
    let selectedIndividual = this.individualTabs[index];
    selectedIndividual.subject.dateOfBirth = dob;
  }

  openTab(element: any) {
    if (!this.individualTabs.includes(element)) {
      this.individualTabs.push(element);
    }
    this.selected.setValue(this.individualTabs.length);
  }
  closeTab(index: number) {
    this.individualTabs.splice(index, 1)
  }

  doPageChange(pageEvent: any) {

  }

  formatDate(date: Date, format: string) {
    return this.datePipe.transform(date, format);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selectionProband.selected.length;
    const numRows = this.datasource.data.length;
    return numSelected === numRows;
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Phenopacket): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selectionProband.isSelected(row) ? 'deselect' : 'select'}`;
  }
}
