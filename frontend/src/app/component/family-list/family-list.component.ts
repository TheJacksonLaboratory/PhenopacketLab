import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Family } from 'src/app/models/family';
import { Individual, Sex } from 'src/app/models/individual';
import { Phenopacket } from 'src/app/models/phenopacket';
import { FamilyService } from 'src/app/services/family.service';
import { MessageDialogComponent } from '../shared/message-dialog/message-dialog.component';

@Component({
  selector: 'app-family-list',
  templateUrl: 'family-list.component.html',
  styleUrls: ['family-list.component.scss'],
  providers: [DatePipe]
})
export class FamilyListComponent implements OnInit, OnDestroy, AfterViewInit {
  family: Family;
  /** Map used to hold opened tabs **/
  // individualTabs: Phenopacket[] = [];
  individualTabsMap = new Map<String, Phenopacket>();
  individualTabs = [];
  /** Array used to hold the list of individuals present in the summary tab **/
  familyMap = new Map<string, Phenopacket>();
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

  // familySubscription: Subscription;

  constructor(private familyService: FamilyService, public dialog: MatDialog, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.updateFamily(this.familyService.family);
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    // this.familySubscription.unsubscribe();
  }

  updateFamily(family: Family) {
    this.family = family;
    if (this.family) {
      if (this.individualTabsMap.keys.length < this.family.relatives.keys.length + 1) {
        this.individualTabsMap.set(this.family.proband.id, this.family.proband);
        this.familyMap.set(this.family.proband.id, this.family.proband);
        this.family.relatives.forEach((value: Phenopacket, key: string) => {
          this.individualTabsMap.set(value.id, value);
          this.familyMap.set(value.id, value);
        });
        this.individualTabs = Array.from(this.individualTabsMap.values());
        this.datasource.data = Array.from(this.familyMap.values());
      }
    }
  }

  addTab() {
    let newPheno = new Phenopacket();
    this.individualTabs = Array.from(this.individualTabsMap.values());

    newPheno.id = "new-patient-" + (this.individualTabs.length + 1);
    newPheno.subject = new Individual();
    // add new phenopacket to family
    if (this.family === undefined) {
      this.family = new Family("family-id");
    }
    if (this.family.proband === undefined) {
      newPheno.isProband = true;
      this.family.proband = newPheno;
    } else {
      this.family.relatives.set(newPheno.id, newPheno);
    }
    this.individualTabsMap.set(newPheno.id, newPheno);
    this.familyMap.set(newPheno.id, newPheno);
    this.selected.setValue(this.individualTabs.keys.length);
    this.datasource.data = Array.from(this.familyMap.values());
    this.individualTabs = Array.from(this.individualTabsMap.values());

    this.familyService.setFamily(this.family);
    console.log("new phenopacket added: " + newPheno.id);
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
        // remove individual tab
        this.individualTabsMap.delete(individual.id);
        // remove individual from family map
        this.familyMap.delete(individual.id);
        this.datasource.data = Array.from(this.familyMap.values());
        this.individualTabs = Array.from(this.individualTabsMap.values());

        // remove from family
        this.family.relatives.delete(individual.id);
        if (this.family.proband.subject.id === individual.id) {
          this.family.proband = undefined;
        }
        this.familyService.setFamily(this.family);
      }
    });
    return dialogRef;

  }
  changeProband(element: any, index: number) {
    let relatives = this.family.relatives;
    let currentProband = this.family.proband;
    let isProband = element.checked !== undefined ? element.checked : false;
    this.individualTabsMap.forEach((value: Phenopacket, key: String) => {
      if (isProband && value.id === element.id) {
        // if proband then we select
        this.selectionProband.select(value);
        value.isProband = true;
        this.family.proband = value;
        // remove from relatives
        this.family.relatives.delete(value.id);
        // add to previous proband to relatives
        if (currentProband) {
          this.family.relatives.set(currentProband.id, currentProband);
        }
      }
      else if (!isProband && value.id === element.id) {
         // if not proband, we deselect
         value.isProband = false;
         this.selectionProband.deselect(value);
         this.family.relatives.set(value.id, value);
      } else {
        // all other indices: If not originally selected then deselect
        if (!this.selectionProband.isSelected) {
          value.isProband = false;
          this.selectionProband.deselect(value);
          this.family.relatives.set(value.id, value);
        }
      }
    });
    this.familyService.setFamily(this.family);
  }

  changeId(id: string, phenopacket: Phenopacket) {
    console.log(this.individualTabsMap);
    let selectedIndividual = this.individualTabsMap.get(phenopacket.id);
    selectedIndividual.id = id;
    // change id in map
    this.individualTabsMap.delete(phenopacket.id);
    this.individualTabsMap.set(selectedIndividual.id, selectedIndividual);
  }
  changeSex(sex: Sex, phenopacket: Phenopacket) {
    let selectedIndividual = this.individualTabsMap.get(phenopacket.id);
    selectedIndividual.subject.sex = sex;
  }
  changeDob(dob: Date, phenopacket: Phenopacket) {
    let selectedIndividual = this.individualTabsMap.get(phenopacket.id);
    selectedIndividual.subject.dateOfBirth = dob;
  }

  openTab(element: any) {
    if (!this.individualTabsMap.has(element)) {
      this.individualTabsMap.set(element.id, element);
    }
    this.individualTabs = Array.from(this.individualTabsMap.values());
    for (let i = 0; i < this.individualTabs.length; i++) {
      if (element === this.individualTabs[i]) {
        this.selected.setValue(i + 1);
      }
    }

  }
  closeTab(element: any) {
    this.individualTabsMap.delete(element.id);
    this.individualTabs = Array.from(this.individualTabsMap.values());
  }

  doPageChange(pageEvent: any) {

  }

  formatDate(date: Date, format: string) {
    return this.datePipe.transform(date, format);
  }

}
