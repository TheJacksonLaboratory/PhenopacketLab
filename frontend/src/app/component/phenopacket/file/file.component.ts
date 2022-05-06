import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FileService } from 'src/app/services/file.service';
import { File } from 'src/app/models/base';

import { MessageDialogComponent } from '../../shared/message-dialog/message-dialog.component';
import { SpinnerDialogComponent } from '../../shared/spinner-dialog/spinner-dialog.component';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

  //Table items
  displayedColumns = ['uri', 'description', 'mapping', 'attribute', 'remove'];

  // MatPaginator Inputs
  pageLength = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 50, 100];
  @ViewChild('diseasePaginator', { static: true }) diseasePaginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  // @ViewChild('diseaseTable', { static: false }) diseaseTable: MatTable<HpoDisease>;

  expandedElement: File | null;
  @Input()
  phenopacketFiles: File[] = [];

  files: File[] = [];
  datasource = new MatTableDataSource<File>();
  diseaseCount: number;
  //searchparams
  currSearchParams: any = {}

  dialogRef: any;
  spinnerDialogRef: any;


  constructor(public searchService: FileService, public dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.phenopacketFiles) {
      console.log("phenopacketFiles defined")
      this.phenopacketFiles.forEach(element => {
        // let disease = new MondoDisease(element.term.id, element.term.label);
        // disease.description = '';
        // disease.onset = element.onset;
        // disease.excluded = element.excluded;
        // // TODO other values to set up
        // this.diseases.push(disease);
      });
    }
    this.datasource.data = this.files;
  }

  addFile() {
    let newFile = new File('new/file/uri', 'new file description');
    // let newFile = new MondoDisease(disease.id, disease.name);
    // newFile.isA = disease.isA;
    // newFile.description = disease.description;
    // newFile.synonyms = disease.synonyms;
    // newFile.xrefs = disease.xrefs;
    this.files.push(newFile);
    this.datasource.data = this.files;
  }

  removeFile(element: File) {
    const msgData = { 'title': 'Remove File' };
    msgData['description'] = 'Remove file from list" ?';
    msgData['displayCancelButton'] = true;
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '400px',
      data: msgData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'ok') {
        this.files.forEach((disease, index) => {
          if (disease == element) {
            this.files.splice(index, 1);

          }
        });
        this.datasource.data = this.files;
      }
    });
    return dialogRef;
  }

  doPageChange(pageEvent: any) {

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


