import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Family } from 'src/app/models/family';
import { Individual } from 'src/app/models/individual';
import { Phenopacket } from 'src/app/models/phenopacket';
import { FamilyService } from 'src/app/services/family.service';
import { PhenopacketService } from 'src/app/services/phenopacket.service';
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
  selected = new UntypedFormControl(0);

  isProband: boolean;
  activeIndex = 0;

  // Table items
  displayedColumns = ['id', 'dob', 'sex', 'proband', 'remove'];

  datasource = new MatTableDataSource<Phenopacket>();
  selectionProband = new SelectionModel<Phenopacket>(false, []);

  phenopacketSubscription: Subscription;
  familySubscription: Subscription;

  constructor(private familyService: FamilyService,
              public phenopacketService: PhenopacketService,
              public dialog: MatDialog, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    // add created phenopacket
    // console.log(this.phenopacketService.phenopacket);
    // this.addTab(this.phenopacketService.phenopacket);
    // this.updateFamily(this.familyService.family);
    this.phenopacketSubscription = this.phenopacketService.getPhenopacket().subscribe(phenopacket => {
      this.addTab(phenopacket);
      this.updateFamily(this.familyService.family);
    });

    this.familySubscription = this.familyService.getPhenopacket().subscribe(phenopacket => {
      this.addTab(phenopacket);
      this.updateFamily(this.familyService.family);
    });
    this.updateFamily(this.familyService.family);
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.familySubscription.unsubscribe();
    this.phenopacketSubscription.unsubscribe();
  }

  updateFamily(family: Family) {
    this.family = family;
    if (this.family) {
      if (this.individualTabsMap.keys.length < this.family.relatives.keys.length + 1) {
        if (this.family.proband) {
          this.individualTabsMap.set(this.family.proband.id, this.family.proband);
          this.familyMap.set(this.family.proband.id, this.family.proband);
        }
        this.family.relatives.forEach((value: Phenopacket, key: string) => {
          this.individualTabsMap.set(value.id, value);
          this.familyMap.set(value.id, value);
        });
        this.individualTabs = Array.from(this.individualTabsMap.values());
        this.datasource.data = Array.from(this.familyMap.values());
      }
    }
  }

  // createNewPhenopacket() {
  //   let phenopacket;
  //   // add new phenopacket using wizard creator
  //   const phenopacketCreatorData = {};
  //   phenopacketCreatorData['displayCancelButton'] = true;
  //   const dialogRef = this.dialog.open(PhenoCreatorComponent, {
  //     width: '800px',
  //     data: phenopacketCreatorData
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result !== undefined) {
  //       let newPhenopacket = result.phenopacket;
  //       if (newPhenopacket !== undefined) {
  //         phenopacket = newPhenopacket;
  //         // emit change
  //         // this.onFeatureChanged.emit(this.phenotypicFeature);
  //       }
  //     }
  //   });
  //   this.addTab(phenopacket);
  // }

  addTab(phenopacket?: Phenopacket) {
    if (phenopacket === undefined) {
      phenopacket = new Phenopacket();
      phenopacket.id = `new-patient-${this.individualTabs.length + 1}`;
      phenopacket.subject = new Individual();
    }
    this.individualTabs = Array.from(this.individualTabsMap.values());
    // add new phenopacket to family
    if (this.family === undefined) {
      this.family = new Family('family-id');
    }

    phenopacket.isProband = false;
    this.family.relatives.set(phenopacket.id, phenopacket);

    this.individualTabsMap.set(phenopacket.id, phenopacket);
    this.familyMap.set(phenopacket.id, phenopacket);
    this.selected.setValue(this.individualTabs.keys.length);
    this.datasource.data = Array.from(this.familyMap.values());
    this.individualTabs = Array.from(this.individualTabsMap.values());

    this.familyService.setFamily(this.family);
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
      if (result) {
        // remove individual tab
        this.individualTabsMap.delete(individual.id);
        // remove individual from family map
        this.familyMap.delete(individual.id);
        this.datasource.data = Array.from(this.familyMap.values());
        this.individualTabs = Array.from(this.individualTabsMap.values());

        // remove from family
        this.family.relatives.delete(individual.id);
        if (this.family.proband) {
          if (this.family.proband.subject.id === individual.id) {
            this.family.proband = undefined;
          }
        }
        this.familyService.setFamily(this.family);
      }
    });
    return dialogRef;

  }
  changeProband(element: any, phenopacket: Phenopacket) {
    const currentProband = this.family.proband;
    const isProband = element.checked !== undefined ? element.checked : false;
    this.individualTabsMap.forEach((value: Phenopacket, key: String) => {
      if (isProband && value.id === phenopacket.id) {
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
      } else if (!isProband && value.id === phenopacket.id) {
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
    const selectedIndividual = this.individualTabsMap.get(phenopacket.id);
    selectedIndividual.id = id;
    // change id in map
    this.individualTabsMap.delete(phenopacket.id);
    this.individualTabsMap.set(selectedIndividual.id, selectedIndividual);
  }
  changeSex(sex: string, phenopacket: Phenopacket) {
    const selectedIndividual = this.individualTabsMap.get(phenopacket.id);
    selectedIndividual.subject.sex = sex;
  }
  changeDob(dob: Date, phenopacket: Phenopacket) {
    const selectedIndividual = this.individualTabsMap.get(phenopacket.id);
    if (dob) {
      selectedIndividual.subject.dateOfBirth = dob.toISOString();
    }
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

  formatDate(date: Date, format: string) {
    return this.datePipe.transform(date, format);
  }

  /**
   * Refresh the datasource
   */
  refresh() {
    // this.dataFilesService.getDataFilesAndParameters().subscribe(resp => {
    //   // let jsonObj = JSON.parse(resp)
    //   this.dataSource = new MatTableDataSource(resp);
    //   this.dataSource.sort = this.sort;
    // }, err => {
    //   // TODO: display our server error dialog?
    //   console.log(err);
    // });
    // this.changeDetectorRefs.detectChanges();
  }
  openFileUploadDialog() {
    return;
  }
}
