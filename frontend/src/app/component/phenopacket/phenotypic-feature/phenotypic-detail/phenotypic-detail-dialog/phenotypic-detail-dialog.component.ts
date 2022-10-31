import {Component, Inject, Input, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { PhenotypicFeature } from 'src/app/models/phenotypic-feature';

@Component({
  selector: 'app-phenotypic-detail-dialog',
  templateUrl: './phenotypic-detail-dialog.component.html',
  styleUrls: ['./phenotypic-detail-dialog.component.scss']
})

export class PhenotypicDetailDialogComponent implements OnInit {

  phenotypicDetailName: string;
  termId: string;
  description: string;
  selectedStatus: string;
  statuses: string[] = ['Observed', 'Excluded'];

  // TODO - fetch from backend
  severities: string[] = ['Borderline', 'Mild', 'Moderate', 'Severe', 'Profound'];

  // TODO - fetch from backend
  modifierValues: string[] = ['modifier 1', 'modifier 2'];

  // TODO - fetch from backend
  evidenceValues: string[] = ['evidence 1', 'evidence 2'];

  @Input()
  phenotypicFeature: PhenotypicFeature;

  constructor(public dialogRef: MatDialogRef<PhenotypicDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.phenotypicFeature = data['feature'];
     }

  ngOnInit() {
    if (this.phenotypicFeature) {
      this.phenotypicDetailName = this.phenotypicFeature.type.label;
      this.termId = this.phenotypicFeature.type.id;
      this.description = this.phenotypicFeature.description;
      this.selectedStatus = this.phenotypicFeature.excluded ? 'Excluded' : 'Observed';
    }

  }

  changeStatus(evt: MatRadioChange) {
    this.selectedStatus = evt.value;
    this.phenotypicFeature.excluded = evt.value === 'Excluded';
  }

  onCancelClick(): void {
    this.dialogRef.close('cancel');
  }

  onOkClick() {
    return { 'feature': this.phenotypicFeature };
  }

}
