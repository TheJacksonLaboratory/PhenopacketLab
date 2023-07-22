import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
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
import { ToastModule } from 'primeng/toast';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PanelModule } from 'primeng/panel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FieldsetModule } from 'primeng/fieldset';
import { SplitterModule } from 'primeng/splitter';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SpinnerModule } from 'primeng/spinner';
import { ChipModule } from 'primeng/chip';
import { ToggleButtonModule } from 'primeng/togglebutton';


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
    ProgressSpinnerModule,
    PanelModule,
    SidebarModule,
    MenubarModule,
    MenuModule,
    TooltipModule,
    InputTextareaModule,
    FieldsetModule,
    SplitterModule,
    DialogModule,
    SpinnerModule,
    DialogModule,
    InputMaskModule,
    AutoCompleteModule,
    ChipModule,
    ToggleButtonModule
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
    TooltipModule,
    ProgressSpinnerModule,
    PanelModule,
    SidebarModule,
    MenubarModule,
    MenuModule,
    InputTextareaModule,
    FieldsetModule,
    SplitterModule,
    DialogModule,
    SpinnerModule,
    DialogModule,
    InputMaskModule,
    AutoCompleteModule,
    ChipModule,
    ToggleButtonModule
  ],
  providers: [MessageService, ConfirmationService]
})
export class PrimeModule { }
