import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Disease } from 'src/app/models/disease';

import { MondoDisease } from 'src/app/models/mondo-disease';
import { MessageDialogComponent } from '../../shared/message-dialog/message-dialog.component';
import { SpinnerDialogComponent } from '../../shared/spinner-dialog/spinner-dialog.component';
import { DiseaseSearchService } from 'src/app/services/disease-search.service';
import { DataPresentMatTableDataSource } from '../../shared/DataPresentMatTableDataSource';

@Component({
  selector: 'app-disease',
  templateUrl: './disease.component.html',
  styleUrls: ['./disease.component.scss']
})
export class DiseaseComponent implements OnInit {
  // search box params
  itemName = "Disease";
  searchLabel = "Disease name";
  placeHolderTxt = "Enter disease name";
  localStorageKey = "hpo_diseases";

  //Table items
  displayedColumns = ['id', 'name', 'status', 'onset', 'resolution', 'metadata', 'remove'];

  expandedElement: Disease | null;
  @Input()
  phenopacketDiseases: Disease[] = [];
  
  @Output() onDiseasesChanged = new EventEmitter<Disease[]>();

  // diseases: MondoDisease[] = [];
  datasource = new DataPresentMatTableDataSource<Disease>();

  diseaseCount: number;
  //searchparams
  currSearchParams: any = {}

  dialogRef: any;
  spinnerDialogRef: any;


  constructor(public searchService: DiseaseSearchService, public dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.phenopacketDiseases === undefined) {
      this.phenopacketDiseases = [];
    }
    this.datasource.data = this.phenopacketDiseases;
    this.onDiseasesChanged.emit(this.phenopacketDiseases);
  }

  addDisease(disease: Disease) {
    this.phenopacketDiseases.push(disease);
    this.datasource.data = this.phenopacketDiseases;
    this.onDiseasesChanged.emit(this.phenopacketDiseases);
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
          if (disease == element) {
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
    const params: any = {};
    this.currSearchParams.offset = 0;
    let id = searchCriteria.selectedItems[0].selectedValue.id;

    if ((searchCriteria.selectedItems && searchCriteria.selectedItems.length > 0)) {
      this.currSearchParams = searchCriteria;
      this._queryDiseasesById(id);
    }

  }

  private _queryDiseasesById(id: string) {
    this.openSpinnerDialog();
    this.searchService.queryDiseasesById(id).subscribe(data => {
      let dis = new MondoDisease(data);
      // convert MondoDisease to phenopacket Disease
      let disease = dis.getPhenoDisease();
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
    this.expandedElement = this.expandedElement === element ? null : element
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
    return disease.excluded ? 'Excluded' : 'Included';
  }
}


