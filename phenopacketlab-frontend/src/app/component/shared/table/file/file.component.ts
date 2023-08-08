import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

import { DialogMode, File } from 'src/app/models/base';
import { Phenopacket } from 'src/app/models/phenopacket';
import { FileDialogComponent } from '../../dialog/file-dialog/file-dialog.component';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

  @Input()
  files: File[] = [];
  @Input()
  phenopacket: Phenopacket;
  @Output()
  onFilesChanged = new EventEmitter<File[]>();

  ref: DynamicDialogRef;


  constructor(public dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {

  }

  addFile() {
    this.ref = this.dialogService.open(FileDialogComponent, {
      header: 'Add File',
      width: '50%',
      contentStyle: { 'overflow': 'auto' },
      baseZIndex: 10000,
      resizable: true,
      draggable: true,
      data: {
        phenopacket: this.phenopacket,
        mode: DialogMode.ADD
      }
    });

    this.ref.onClose.subscribe((file: File) => {
      this.updateFile(file);
    });
  }

  removeFile(file: File) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete file with URI \'' + file.uri + '\'?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.files = this.files.filter(val => val.key !== file.key);
        this.onFilesChanged.emit(this.files);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'File Deleted', life: 3000 });
      },
      reject: () => {
        this.confirmationService.close();
      }
    });
  }

  editFile(file?: File) {
    this.ref = this.dialogService.open(FileDialogComponent, {
      header: 'Edit File',
      width: '50%',
      contentStyle: { 'overflow': 'auto' },
      baseZIndex: 10000,
      resizable: true,
      draggable: true,
      data: {
        file: file,
        mode: DialogMode.EDIT,
        phenopacket: this.phenopacket
      }
    });

    this.ref.onClose.subscribe((resultFile: File) => {
      this.updateFile(resultFile);
    });
  }

  updateFile(file: File) {
    if (file) {
      if (this.files === undefined) {
        this.files = [];
      }
      // remove old file if exist
      this.files = this.files.filter(val => val.key !== file.key);
      // add file
      this.files.push(file);

      this.onFilesChanged.emit(this.files);
    }
  }

  getColor(attribute) {
    if (attribute.key === 'fileFormat') {
      return 'primary-chip';
    }
    if (attribute.key === 'genomeAssembly') {
      return 'accent-chip';
    }
    return 'gray-chip';
  }

  getKeyValueLabel(item) {
    if (item) {
      return `${item.key} -> ${item.value}`;
    }
  }
}
