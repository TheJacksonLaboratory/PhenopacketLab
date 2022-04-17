import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Disease } from 'src/app/models/disease';

import { MondoDisease } from 'src/app/models/mondo-disease';
import { MessageDialogComponent } from '../../shared/message-dialog/message-dialog.component';
import { SpinnerDialogComponent } from '../../shared/spinner-dialog/spinner-dialog.component';
import { DiseaseSearchService } from './disease-search.service';

@Component({
  selector: 'app-disease',
  templateUrl: './disease.component.html',
  styleUrls: ['./disease.component.scss']
})
export class DiseaseComponent implements OnInit {

  //Table items
  displayedColumns = ['id', 'name', 'status', 'onset', 'resolution', 'metadata', 'remove'];

  // MatPaginator Inputs
  pageLength = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 50, 100];
  @ViewChild('diseasePaginator', { static: true }) diseasePaginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  // @ViewChild('diseaseTable', { static: false }) diseaseTable: MatTable<HpoDisease>;

  expandedElement: MondoDisease | null;
  @Input()
  phenopacketDiseases: Disease[] = [];

  diseases: MondoDisease[] = [];
  datasource = new MatTableDataSource<MondoDisease>();
  diseaseCount: number;
  //searchparams
  currSearchParams: any = {}

  dialogRef: any;
  spinnerDialogRef: any;


  constructor(private searchService: DiseaseSearchService, public dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.phenopacketDiseases) {
      console.log("phenopacketDisease defined")
      this.phenopacketDiseases.forEach(element => {
        let disease = new MondoDisease(element.term.id, element.term.label);
        disease.description = '';
        disease.onset = element.onset;
        // TODO other values to set up
        this.diseases.push(disease);
      });
    }
    // this.diseases = [...this.diseases];
    this.datasource.data = this.diseases;
    // this.diseaseTable.renderRows();
  }

  addDisease(disease: MondoDisease) {
    let newDisease = new MondoDisease(disease.id, disease.name);
    newDisease.isA = disease.isA;
    newDisease.description = disease.description;
    newDisease.synonyms = disease.synonyms;
    newDisease.xrefs = disease.xrefs;
    this.diseases.push(newDisease);
    console.log(newDisease);
    console.log(this.diseases.length);
    this.datasource.data = this.diseases;
    // this.diseaseTable.renderRows();
  }

  removeDisease(element: MondoDisease) {
    const msgData = { 'title': 'Remove Disease' };
    msgData['description'] = 'Remove "' + element.name + ' from disease list" ?';
    msgData['displayCancelButton'] = true;
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '400px',
      data: msgData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'ok') {
        this.diseases.forEach((disease, index) => {
          if (disease == element) {
            this.diseases.splice(index, 1);

          }
        });
        console.log(this.diseases.length);
        this.datasource.data = this.diseases;
        // this.diseaseTable.renderRows();
      }
    });
    return dialogRef;
  }

  doPageChange(pageEvent: any) {

  }

  onSearchCriteriaChange(searchCriteria: any) {
    const params: any = {};
    this.currSearchParams.offset = 0;
    console.log("selectedItems[]");
    console.log(searchCriteria.selectedItems[0].selectedValue.id);
    let id = searchCriteria.selectedItems[0].selectedValue.id;
    this.diseasePaginator.pageIndex = 0;
    this.clearSort();

    if ((searchCriteria.selectedItems && searchCriteria.selectedItems.length > 0)) {
      this.currSearchParams = searchCriteria;
      this._queryDiseasesById(id);
    }
    //  else {
    //   this.diseaseDatasource = []
    //   this.diseaseCount = 0
    //   this.pageLength = 0
    // }

  }

  private _queryDiseasesById(id: string) {
    this.openSpinnerDialog();
    this.searchService.queryDiseasesById(id).subscribe(data => {
      this.addDisease(data);
      this.spinnerDialogRef.close();
    },
      (error) => {
        this.spinnerDialogRef.close();
      });
  }

  private clearSort() {
    this.sort.sort({ id: '', start: 'asc', disableClear: false });
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

}


