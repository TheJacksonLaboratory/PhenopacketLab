import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PhenotypicFeature } from 'src/app/models/phenotypic-feature';

@Component({
  selector: 'app-phenotypic-detail-dialog',
  templateUrl: './phenotypic-detail-dialog.component.html',
  styleUrls: ['./phenotypic-detail-dialog.component.scss']
})

export class PhenotypicDetailDialogComponent {

  phenotypicFeature: PhenotypicFeature;

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    this.phenotypicFeature = config.data?.feature;
  }

  updatePhenotypicFeature(phenotypicFeature) {
    this.phenotypicFeature = phenotypicFeature;
  }

  onCancelClick(): void {
    this.ref.close();
  }

  onOkClick() {
    this.ref.close(this.phenotypicFeature);
  }

}
