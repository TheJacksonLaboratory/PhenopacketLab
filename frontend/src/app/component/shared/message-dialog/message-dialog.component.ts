import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent {

  messageTitle: string;
  messageDescription: string;
  displayCancelButton = true;

  constructor(
    public dialogRef: MatDialogRef<MessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.messageTitle = data['title'];
      this.messageDescription = data['description'];
      if (data['displayCancelButton'] != undefined){
        this.displayCancelButton = data['displayCancelButton'];
      }
    }

  onOkClick(): void {
    this.dialogRef.close('ok');
  }

  onCancelClick(): void {
    this.dialogRef.close('cancel');
  }
}

