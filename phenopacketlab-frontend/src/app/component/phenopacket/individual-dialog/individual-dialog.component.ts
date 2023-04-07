import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Individual } from 'src/app/models/individual';

@Component({
  selector: 'app-individual-dialog',
  templateUrl: './individual-dialog.component.html',
  styleUrls: ['./individual-dialog.component.scss']
})
export class IndividualDialogComponent {

  subject: Individual;

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    this.subject = config.data?.subject;
  }

  updateSubject(subject) {
    this.subject = subject;
  }

  onCancelClick(): void {
    this.ref.close();
  }

  onOkClick() {
    this.ref.close(this.subject);
  }

}


