import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  label: string;

  constructor(public messageService: MessageService,
              public ref: DynamicDialogRef,
              public config: DynamicDialogConfig) {
  }

  ngOnInit(): void {
    this.label = this.config.data?.label;
  
  }

  onCancelClick(): void {
    this.ref.close(false);
  }

  onOkClick() {
    this.ref.close(true);
  }

}
