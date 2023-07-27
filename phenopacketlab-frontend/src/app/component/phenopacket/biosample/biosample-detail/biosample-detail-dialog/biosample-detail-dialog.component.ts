import { Component, OnInit } from '@angular/core';
import { BioSample } from 'src/app/models/biosample';

@Component({
  selector: 'app-biosample-detail-dialog',
  templateUrl: './biosample-detail-dialog.component.html',
  styleUrls: ['./biosample-detail-dialog.component.scss']
})

export class BiosampleDetailDialogComponent implements OnInit {

  biosample: BioSample;

  constructor() {

  }

  ngOnInit() {
    if (this.biosample) {

    }

  }

  onCancelClick(): void {
  }

  onOkClick() {
    return { 'biosample': this.biosample };
  }

}
