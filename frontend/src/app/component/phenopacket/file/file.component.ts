import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FileService } from 'src/app/services/file.service';
import { File } from 'src/app/models/base';

import { MessageDialogComponent } from '../../shared/message-dialog/message-dialog.component';
import { SpinnerDialogComponent } from '../../shared/spinner-dialog/spinner-dialog.component';
import { Attribute } from './file-detail/file-detail.component';

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
  // @ViewChild('diseasePaginator', { static: true }) diseasePaginator: MatPaginator;
  // @ViewChild(MatSort, { static: true }) sort: MatSort;
  // @ViewChild('diseaseTable', { static: false }) diseaseTable: MatTable<HpoDisease>;

  expandedElement: File | null;
  @Input()
  phenopacketFiles: File[] = [];
  @Output()
  onFilesChanged = new EventEmitter<File[]>();

  filesMap = new Map<string, File>();
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
      this.phenopacketFiles.forEach((element, index) => {
        let id = "file-" + index;
        element.id = id;
        this.filesMap.set(id, element);
      });
    }
    this.datasource.data = Array.from(this.filesMap.values());
  }

  addFile() {
    let newFile = new File('new/file/uri', 'new file description');
    let id = "file-" + (this.filesMap.size + 1);
    newFile.id = id;
    this.filesMap.set(id, newFile);
    this.updateFiles();
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
        this.filesMap.delete(element.id);
        this.updateFiles();
      }
    });
    return dialogRef;
  }

  changeFile(file: File, element: File) {
    this.filesMap.set(element.id, file);
    // update files
    this.updateFiles();
  }

  doPageChange(pageEvent: any) {

  }

  // private clearSort() {
  //   this.sort.sort({ id: '', start: 'asc', disableClear: false });
  // }

  openSpinnerDialog() {
    this.spinnerDialogRef = this.dialog.open(SpinnerDialogComponent, {
      panelClass: 'transparent',
      disableClose: true
    });
  }

  expandCollapse(element: any) {
    this.expandedElement = this.expandedElement === element ? null : element

  }

  updateFiles() {
    let filesArray = Array.from(this.filesMap.values());
    this.datasource.data = filesArray;
    this.onFilesChanged.emit(filesArray);
  }

  getMappingKeys(file: File) {
    return file.individualToFileIdentifier.keys();
  }
  getMapping(file: File, key: string) {
    let value = file.individualToFileIdentifier.get(key);
    return key + " -> " + value;
  }
  getAttributeKeys(file: File) {
    let resultKeys = [];
    // remove description key
    file.fileAttribute.forEach((value: string, key: string) => {
      if (key !== 'description') {
        resultKeys.push(key);
      }
    });
    return resultKeys;
  }
  getColor(key: string) {
    if (key === Attribute.Keys.FileFormat) {
      return 'accent';
    }
    if (key === Attribute.Keys.GenomeAssembly) {
      return 'primary';
    }
    return '';
  }
  getAttribute(file: File, key: string) {
    return file.fileAttribute.get(key);
  }

}


