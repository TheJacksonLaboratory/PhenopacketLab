import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from "primeng/confirmdialog";

import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { ChipsModule } from 'primeng/chips';
import { TreeModule } from 'primeng/tree';
import { AccordionModule } from 'primeng/accordion';
import { TreeSelectModule } from 'primeng/treeselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from "primeng/toast";
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    DropdownModule,
    InputNumberModule,
    MessagesModule,
    MessageModule,
    CalendarModule,
    InputTextModule,
    TriStateCheckboxModule,
    ChipsModule,
    AccordionModule,
    TreeSelectModule,
    TreeModule,
    RadioButtonModule,
    CheckboxModule,
    TabViewModule,
    CardModule,
    TableModule,
    FileUploadModule,
    ToastModule,
    ConfirmDialogModule,
    TooltipModule
  ],
  exports: [
    ButtonModule,
    DropdownModule,
    InputNumberModule,
    MessagesModule,
    MessageModule,
    CalendarModule,
    InputTextModule,
    TriStateCheckboxModule,
    ChipsModule,
    AccordionModule,
    TreeSelectModule,
    TreeModule,
    RadioButtonModule,
    CheckboxModule,
    TabViewModule,
    CardModule,
    TableModule,
    FileUploadModule,
    ToastModule,
    ConfirmDialogModule,
    TooltipModule
  ],
  providers: [MessageService, ConfirmationService]
})
export class PrimeModule { }
