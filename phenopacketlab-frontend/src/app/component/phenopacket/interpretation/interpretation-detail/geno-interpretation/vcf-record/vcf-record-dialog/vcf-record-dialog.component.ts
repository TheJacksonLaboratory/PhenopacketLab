import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VcfRecord } from 'src/app/models/interpretation';
import { InterpretationService } from 'src/app/services/interpretation.service';

@Component({
  selector: 'app-vcf-record-dialog',
  templateUrl: './vcf-record-dialog.component.html',
  styleUrls: ['./vcf-record-dialog.component.scss']
})

export class VcfRecordDialogComponent implements OnInit {
  title: String;

  vcfRecord: VcfRecord;

  constructor(public dialogRef: MatDialogRef<VcfRecordDialogComponent>,
    public searchService: InterpretationService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.vcfRecord = data['vcfRecord'];
    this.title = data['title'];
  }

  ngOnInit() {
    this.updateVcfRecord();

  }

  updateVcfRecord() {
    if (this.vcfRecord) {

    } else {
      this.vcfRecord = new VcfRecord();
    }
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  onOkClick() {
    return { 'vcfRecord': this.vcfRecord };
  }
}
