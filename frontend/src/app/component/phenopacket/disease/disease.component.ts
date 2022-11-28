import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Disease } from 'src/app/models/disease';

import { MondoDisease } from 'src/app/models/mondo-disease';
import { MessageDialogComponent } from '../../shared/message-dialog/message-dialog.component';
import { SpinnerDialogComponent } from '../../shared/spinner-dialog/spinner-dialog.component';
import { DiseaseSearchService } from 'src/app/services/disease-search.service';
import { DataPresentMatTableDataSource } from '../../shared/DataPresentMatTableDataSource';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { OntologyClass } from 'src/app/models/base';

@Component({
  selector: 'app-disease',
  templateUrl: './disease.component.html',
  styleUrls: ['./disease.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DiseaseComponent implements OnInit, OnChanges {

  /**
  * If this variable is true, we show the add button and also add the selected phenotypic feature to the datasource.
  * If false, we do not show the add button and just return a single phenotypic feature with the corresponding type OntologyClass
  */
  @Input()
  showAddButton = true;

  @Input()
  phenopacketDiseases: Disease[] = [];

  @Output() onDiseasesChanged = new EventEmitter<Disease[]>();

  // search box params
  itemName = 'Disease';
  searchLabel = 'Disease name';
  placeHolderTxt = 'Enter disease name';
  localStorageKey = 'hpo_diseases';

  // Table items
  displayedColumns = ['id', 'name', 'status', 'onset', 'resolution', 'metadata', 'remove'];

  expandedElement: Disease | null;

  // diseases: MondoDisease[] = [];
  datasource = new DataPresentMatTableDataSource<Disease>();

  diseaseCount: number;
  // searchparams
  currSearchParams: any = {};

  dialogRef: any;
  spinnerDialogRef: any;


  constructor(public searchService: DiseaseSearchService, public dialog: MatDialog) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('change:');
    console.log(changes);
    // this.phenotypicFeatures = changes.phenotypicFeatures.currentValue;
    console.log(this.phenopacketDiseases);
    this.datasource.data = this.phenopacketDiseases;
    this.onDiseasesChanged.emit(this.phenopacketDiseases);
  }

  ngOnInit(): void {
    // if (this.phenopacketDiseases === undefined) {
    //   this.phenopacketDiseases = [];
    // }
    this.datasource.data = this.phenopacketDiseases;
    // this.onDiseasesChanged.emit(this.phenopacketDiseases);
  }

  addDisease(disease: Disease) {
    // this.phenopacketDiseases.push(disease);
    // this.datasource.data = this.phenopacketDiseases;
    // this.onDiseasesChanged.emit(this.phenopacketDiseases);

    if (disease === undefined) {
      const newDisease = new Disease();
      newDisease.term = new OntologyClass('id', 'name');
      newDisease.excluded = false;
      this.phenopacketDiseases.push(newDisease);
      this.datasource.data = this.phenopacketDiseases;
      this.onDiseasesChanged.emit(this.phenopacketDiseases);
    } else if (disease && this.showAddButton) {
      this.phenopacketDiseases.push(disease);
      this.datasource.data = this.phenopacketDiseases;
      this.onDiseasesChanged.emit(this.phenopacketDiseases);
    } else if (disease && !this.showAddButton) {
      this.onDiseasesChanged.emit([disease]);
    }
  }

  removeDisease(element: Disease) {
    const msgData = { 'title': 'Remove Disease' };
    msgData['description'] = `Remove "${element.term.label}" from disease list ?`;
    msgData['displayCancelButton'] = true;
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '400px',
      data: msgData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'ok') {
        this.phenopacketDiseases.forEach((disease, index) => {
          if (disease === element) {
            this.phenopacketDiseases.splice(index, 1);

          }
        });
        this.datasource.data = this.phenopacketDiseases;
        this.onDiseasesChanged.emit(this.phenopacketDiseases);
      }
    });
    return dialogRef;
  }

  onSearchCriteriaChange(searchCriteria: any) {
    this.currSearchParams.offset = 0;
    const id = searchCriteria.selectedItems[0].selectedValue.id;

    if ((searchCriteria.selectedItems && searchCriteria.selectedItems.length > 0)) {
      this.currSearchParams = searchCriteria;
      this._queryDiseasesById(id);
    }

  }

  private _queryDiseasesById(id: string) {
    this.openSpinnerDialog();
    this.searchService.queryDiseasesById(id).subscribe(data => {
      const dis = new MondoDisease(data);
      // convert MondoDisease to phenopacket Disease
      const disease = dis.getPhenoDisease();
      this.addDisease(disease);
      this.spinnerDialogRef.close();
    },
      (error) => {
        this.spinnerDialogRef.close();
      });
  }

  openSpinnerDialog() {
    this.spinnerDialogRef = this.dialog.open(SpinnerDialogComponent, {
      panelClass: 'transparent',
      disableClose: true
    });
  }

  expandCollapse(element: any) {
    this.expandedElement = this.expandedElement === element ? null : element;
  }

  changeDisease(disease: Disease) {
    for (let i = 0; i < this.phenopacketDiseases.length; i++) {
      if (this.phenopacketDiseases[i].term.id === disease.term.id) {
        this.phenopacketDiseases[i] = disease;
        this.datasource.data = this.phenopacketDiseases;
      }
    }
  }

  getStatus(disease: Disease) {
    return disease.excluded ? 'Excluded' : 'Observed';
  }
}


