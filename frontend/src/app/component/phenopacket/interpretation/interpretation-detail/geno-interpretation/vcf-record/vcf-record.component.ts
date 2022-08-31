import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataPresentMatTableDataSource } from 'src/app/component/shared/DataPresentMatTableDataSource';
import { MessageDialogComponent } from 'src/app/component/shared/message-dialog/message-dialog.component';
import { VcfRecord } from 'src/app/models/interpretation';
import { VcfRecordDialogComponent } from './vcf-record-dialog/vcf-record-dialog.component';

@Component({
  selector: 'app-vcf-record',
  templateUrl: './vcf-record.component.html',
  styleUrls: ['./vcf-record.component.scss']
})

export class VcfRecordComponent {

  vcfRecordDisplayedColumns = ['assembly', 'chrom', 'pos', 'id', 'ref', 'alt', 'qual', 'filter', 'info', 'remove'];
  vcfRecordDataSource = new DataPresentMatTableDataSource<VcfRecord>();

  @Output()
  onVcfRecordChanged = new EventEmitter<VcfRecord>();

  @Input()
  vcfRecord: VcfRecord;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.updateVcfRecord();
  }

  updateVcfRecord() {
    if (this.vcfRecord) {
      this.vcfRecordDataSource.data = [this.vcfRecord];
      this.onVcfRecordChanged.emit(this.vcfRecord);
    }

  }

  openEditDialog() {
    const vcfRecordData = { 'title': 'Add/Edit VCF Record' };
    vcfRecordData['vcfRecord'] = this.vcfRecord;
    vcfRecordData['displayCancelButton'] = true;
    const dialogRef = this.dialog.open(VcfRecordDialogComponent, {
      width: '1000px',
      data: vcfRecordData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        let updatedVcfRecord = result.vcfRecord;
        if (updatedVcfRecord) {
          // update interpretation
          this.vcfRecord = updatedVcfRecord;
          this.updateVcfRecord();
        }
      }
    });
    return dialogRef;
  }

  getStringArrayDisplay(array: string[]) {
    let displayResult = '';
    if (array) {
      for (let i = 0; i < array.length; i++) {
        if (i < array.length - 1) {
          displayResult += `${array[i]}, `;
        } else {
          displayResult += `${array[i]}`;
        }
      }
    }
    return displayResult;
  }

  /**
     * Removes the chosen element, if ok is pressed on the popup window.
     * @param element 
     * @returns 
     */
  deleteVcfRecord(element: VcfRecord) {
    const msgData = { 'title': 'Delete VCF record' };
    msgData['description'] = 'Please confirm that you want to delete the VCF Record.';
    msgData['displayCancelButton'] = true;
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '400px',
      data: msgData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'ok') {
        this.vcfRecordDataSource.data = [];
        this.onVcfRecordChanged.emit(undefined);
      }
    });
    return dialogRef;
  }

  getTooltip(columnName, element) {
    return `${columnName}: ${element}`;
  }

}

