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
import { PhenotypicDetailComponent } from './phenotypic-feature/phenotypic-detail/phenotypic-detail.component';
import { DiseaseComponent } from './disease/disease.component';
import { PhenotypicFeatureComponent } from './phenotypic-feature/phenotypic-feature.component';
import { DiseaseDetailComponent } from './disease/disease-detail/disease-detail.component';
import { FileComponent } from './file/file.component';
import { FileDetailComponent } from './file/file-detail/file-detail.component';
import { PhenopacketComponent } from './phenopacket.component';
import { FileDetailDialogComponent } from './file/file-detail/file-detail-dialog/file-detail-dialog.component';
import { DiseaseDetailDialogComponent } from './disease/disease-detail/disease-detail-dialog/disease-detail-dialog.component';
import { MedicalActionComponent } from './medical-action/medical-action.component';
import { MedicalActionDetailComponent } from './medical-action/medical-action-detail/medical-action-detail.component';
import { MedicalActionDetailDialogComponent } from './medical-action/medical-action-detail/medical-action-detail-dialog/medical-action-detail-dialog.component';
import { MeasurementComponent } from './measurement/measurement.component';
import { MeasurementDetailComponent } from './measurement/measurement-detail/measurement-detail.component';
import { MeasurementDetailDialogComponent } from './measurement/measurement-detail/measurement-detail-dialog/measurement-detail-dialog.component';
import { MetadataComponent } from './metadata/metadata.component';
import { InterpretationComponent } from './interpretation/interpretation.component';
import { InterpretationDetailComponent } from './interpretation/interpretation-detail/interpretation-detail.component';
import { BiosampleComponent } from './biosample/biosample.component';
import { BiosampleDetailComponent } from './biosample/biosample-detail/biosample-detail.component';
import { BiosampleDetailDialogComponent } from './biosample/biosample-detail/biosample-detail-dialog/biosample-detail-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { IndividualDialogComponent } from './individual-dialog/individual-dialog.component';




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
    MeasurementComponent,
    MeasurementDetailComponent,
    MeasurementDetailDialogComponent,
    DiseaseComponent,
    DiseaseDetailComponent,
    DiseaseDetailDialogComponent,
    MedicalActionComponent,
    MedicalActionDetailComponent,
    MedicalActionDetailDialogComponent,
    PhenotypicFeatureComponent,
    PhenotypicDetailComponent,
    FileComponent,
    FileDetailComponent,
    FileDetailDialogComponent,
    MetadataComponent,
    InterpretationComponent,
    InterpretationDetailComponent,
    BiosampleComponent,
    BiosampleDetailComponent,
    BiosampleDetailDialogComponent,
    IndividualDialogComponent,
    PhenopacketComponent
  ],
  exports: [
    MeasurementComponent,
    MeasurementDetailComponent,
    MeasurementDetailDialogComponent,
    DiseaseComponent,
    DiseaseDetailComponent,
    MedicalActionComponent,
    MedicalActionDetailComponent,
    PhenotypicFeatureComponent,
    PhenotypicDetailComponent,
    FileComponent,
    FileDetailComponent,
    MetadataComponent,
    InterpretationComponent,
    InterpretationDetailComponent,
    BiosampleComponent,
    BiosampleDetailComponent,
    IndividualDialogComponent,
    PhenopacketComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DialogService, MessageService]
})
export class PhenopacketModule { }
