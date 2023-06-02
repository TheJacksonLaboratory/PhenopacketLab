import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ValidationResults } from 'src/app/models/validation-results';

@Component({
  selector: 'app-validation-result-dialog',
  templateUrl: './validation-results-dialog.component.html',
  styleUrls: ['./validation-results-dialog.component.scss']
})

export class ValidationResultsDialogComponent {

  validationResults: ValidationResults;

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    this.validationResults = config.data?.validationResults;
  }

  closeDialog() {
    if (this.ref) {
      this.ref.close();
    }
  }

}
