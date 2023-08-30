import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Individual } from 'src/app/models/individual';
import { Utils } from '../../../shared/utils';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-individual-dialog',
  templateUrl: './individual-dialog.component.html',
  styleUrls: ['./individual-dialog.component.scss']
})
export class IndividualDialogComponent {

  subject: Individual;

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig,
      private messageService: MessageService) {
    if (config.data?.subject) {
      this.subject = Utils.clone(config.data?.subject);
    }
  }

  updateSubject(subject) {
    this.subject = subject;
  }

  onCancelClick(): void {
    this.ref.close();
  }

  onOkClick() {
    if (this.subject) {
      try {
        Individual.convert(this.subject);
      } catch(error) {
        this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: `${error}` });
        return;
      }     
    }
    this.ref.close(this.subject);
  }

}


