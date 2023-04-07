import { Component, Inject } from '@angular/core';
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
  txtFieldValue: string;
  placeholderId: string;
  placeholderValue: string;

  constructor(public dialogRef: MatDialogRef<FileDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.fileDetailTitle = data['title'];
      this.fileDetailDescription = data['description'];
      this.comboTitle = data['comboTitle'];
      this.comboItems = data['comboItems'];
      this.placeholderId = data['placeholderId'];
      this.placeholderValue = data['placeholderValue'];
      this.txtFieldTitle = data['txtFieldTitle'];
      if (data['displayCancelButton'] !== undefined) {
        this.displayCancelButton = data['displayCancelButton'];
      }
    }

  onOkClick(): void {
    const resultObj = { 'key': this.selectedKey, 'value': this.txtFieldValue };
    this.dialogRef.close(resultObj);
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  setSelected(key: any) {
    this.selectedKey = key;
  }

  getDialogResult() {
    return { 'key': this.selectedKey, 'value': this.txtFieldValue };
  }
  getPlaceholderTxt() {
    if (this.comboItems) {
      if (this.selectedKey === this.comboItems[0]) {
        return this.placeholderId;
      }
      if (this.selectedKey === this.comboItems[1]) {
        return this.placeholderValue;
      }
    }
    return '';
  }
}

