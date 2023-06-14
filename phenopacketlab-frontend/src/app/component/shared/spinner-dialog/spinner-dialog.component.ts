import { Component } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-spinner-dialog',
  templateUrl: './spinner-dialog.component.html',
  styleUrls: ['./spinner-dialog.component.scss']
})
export class SpinnerDialogComponent {

  loadingMessage: string;

  constructor(public config: DynamicDialogConfig) {
    this.loadingMessage = config.data?.loadingMessage;
  }

}
