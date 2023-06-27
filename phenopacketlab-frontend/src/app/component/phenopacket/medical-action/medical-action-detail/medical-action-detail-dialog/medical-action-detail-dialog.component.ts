import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Disease } from 'src/app/models/disease';
import { MedicalAction } from 'src/app/models/medical-action';

@Component({
  selector: 'app-medical-action-detail-dialog',
  templateUrl: './medical-action-detail-dialog.component.html',
  styleUrls: ['./medical-action-detail-dialog.component.scss']
})

export class MedicalActionDetailDialogComponent {
  medicalAction: MedicalAction;
  diseases: Disease[];

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    this.medicalAction = config.data?.medicalAction;
    this.diseases = config.data?.diseases;
  }

  updateMedicalAction(medicalAction) {
    this.medicalAction = medicalAction;
    this.ref.close(this.medicalAction);
  }

  onCancelClick(): void {
    this.ref.close();
  }

  onOkClick() {
    this.ref.close(this.medicalAction);
  }
}
