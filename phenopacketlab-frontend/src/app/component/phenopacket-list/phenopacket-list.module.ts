import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogModule } from 'primeng/dialog';

import { SharedModule } from '../shared/shared.module';
import { PhenopacketComponent } from './phenopacket/phenopacket.component';
import { MetadataComponent } from './phenopacket/metadata/metadata.component';

import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { IndividualDialogComponent } from './phenopacket/individual-dialog/individual-dialog.component';
import { PhenopacketListComponent } from './phenopacket-list.component';




@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CardModule,
    CalendarModule,
    InputNumberModule,
    InputTextModule,
    DropdownModule,
    InputMaskModule,
    DividerModule,
    RadioButtonModule,
    DialogModule

  ],
  declarations: [
    
    MetadataComponent,
    IndividualDialogComponent,
    PhenopacketComponent,
    PhenopacketListComponent
  ],
  exports: [
    MetadataComponent,
    IndividualDialogComponent,
    PhenopacketComponent,
    PhenopacketListComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DialogService, MessageService]
})
export class PhenopacketListModule { }
