import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PhenotypicFeature } from 'src/app/models/phenotypic-feature';

@Component({
  selector: 'app-phenotypic-feature-dialog',
  templateUrl: './phenotypic-feature-dialog.component.html',
  styleUrls: ['./phenotypic-feature-dialog.component.scss']
})
export class PhenotypicFeatureDialogComponent {

  phenotypicFeature: PhenotypicFeature;

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    this.phenotypicFeature = config.data?.phenotypicFeature;
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
