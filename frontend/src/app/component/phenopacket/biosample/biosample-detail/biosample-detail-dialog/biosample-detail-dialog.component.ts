import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BioSample } from 'src/app/models/biosample';

@Component({
  selector: 'app-biosample-detail-dialog',
  templateUrl: './biosample-detail-dialog.component.html',
  styleUrls: ['./biosample-detail-dialog.component.scss']
})

export class BiosampleDetailDialogComponent {

  biosample: BioSample;

  constructor(public dialogRef: MatDialogRef<BiosampleDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.biosample = data['biosample'];
     }

  ngOnInit() {
    if(this.biosample) {
      
    }

  }

  onCancelClick(): void {
    this.dialogRef.close('cancel');
  }

  onOkClick() {
    return { 'biosample': this.biosample };
  }

}