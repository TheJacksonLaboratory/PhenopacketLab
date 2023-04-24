import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Interpretation } from 'src/app/models/interpretation';
import { Phenopacket } from 'src/app/models/phenopacket';

@Component({
  selector: 'app-interpretation-detail-dialog',
  templateUrl: './interpretation-detail-dialog.component.html',
  styleUrls: ['./interpretation-detail-dialog.component.scss']
})

export class InterpretationDetailDialogComponent {

  interpretation: Interpretation;
  phenopacket: Phenopacket;

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    this.interpretation = config.data?.interpretation;
    this.phenopacket = config.data?.phenopacket;
  }

  updateInterpretation(interpretation) {
    this.interpretation = interpretation;
    this.ref.close(this.interpretation);
  }

}
