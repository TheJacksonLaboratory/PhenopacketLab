import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-file-detail-dialog',
  templateUrl: './file-detail-dialog.component.html',
  styleUrls: ['./file-detail-dialog.component.scss']
})
export class FileDetailDialogComponent {

  fileDetailTitle: string;
  // title, comboTitle, comboItems, txtFieldTitle are the available keys
  value = '';
  comboTitle: string;
  comboItems: string[];
  txtFieldTitle: string;
  fileDetailDescription: string;
  displayCancelButton = true;
  selectedKey;
  txtFieldValue;

  constructor(public dialogRef: MatDialogRef<FileDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.fileDetailTitle = data['title'];
      this.fileDetailDescription = data['description'];
      this.comboTitle = data['comboTitle'];
      this.comboItems = data['comboItems'];
      console.log(this.comboItems);
      this.txtFieldTitle = data['txtFieldTitle'];
      if (data['displayCancelButton'] != undefined){
        this.displayCancelButton = data['displayCancelButton'];
      }
    }

  onOkClick(): void {
    let resultObj = { 'key': this.selectedKey, 'value': this.txtFieldValue };
    this.dialogRef.close(resultObj);
  }

  onCancelClick(): void {
    this.dialogRef.close('cancel');
  }

  setSelected(key: any) {
    this.selectedKey = key;
  }

  getDialogResult() {
    return { 'key': this.selectedKey, 'value': this.txtFieldValue };
  }
}

