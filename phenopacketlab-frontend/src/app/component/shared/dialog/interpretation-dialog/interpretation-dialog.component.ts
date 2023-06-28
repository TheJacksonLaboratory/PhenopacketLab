import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Interpretation } from 'src/app/models/interpretation';
import { Phenopacket } from 'src/app/models/phenopacket';
import { ProfileSelection } from 'src/app/models/profile';

@Component({
  selector: 'app-interpretation-dialog',
  templateUrl: './interpretation-dialog.component.html',
  styleUrls: ['./interpretation-dialog.component.scss']
})

export class InterpretationDialogComponent {

  interpretation: Interpretation;
  phenopacket: Phenopacket;
  profile: ProfileSelection;

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    this.interpretation = config.data?.interpretation;
    this.phenopacket = config.data?.phenopacket;
    this.profile = config.data?.profile;
  }

  updateInterpretation(interpretation) {
    this.interpretation = interpretation;
    this.ref.close(this.interpretation);
  }

}
