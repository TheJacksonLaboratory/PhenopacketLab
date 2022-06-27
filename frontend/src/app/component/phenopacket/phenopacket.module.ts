import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';

import { PhenotypicDetailComponent } from './phenotypic-feature/phenotypic-detail/phenotypic-detail.component';
import { DiseaseComponent } from './disease/disease.component';
import { PhenotypicFeatureComponent } from './phenotypic-feature/phenotypic-feature.component';
import { DiseaseDetailComponent } from './disease/disease-detail/disease-detail.component';
import { SharedModule } from '../shared/shared.module';
import { FileComponent } from './file/file.component';
import { FileDetailComponent } from './file/file-detail/file-detail.component';
import { BrowserModule } from '@angular/platform-browser';
import { PhenopacketComponent } from './phenopacket.component';
import { FileDetailDialogComponent } from './file/file-detail/file-detail-dialog/file-detail-dialog.component';
import { DiseaseDetailDialogComponent } from './disease/disease-detail/disease-detail-dialog/disease-detail-dialog.component';
import { PhenotypicDetailDialogComponent } from './phenotypic-feature/phenotypic-detail/phenotypic-detail-dialog/phenotypic-detail-dialog.component';
import { MedicalActionComponent } from './medical-action/medical-action.component';
import { MedicalActionDetailComponent } from './medical-action/medical-action-detail/medical-action-detail.component';
import { MedicalActionDetailDialogComponent } from './medical-action/medical-action-detail/medical-action-detail-dialog/medical-action-detail-dialog.component';



@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    MatRadioModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatCardModule,
    MatRippleModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatTooltipModule,
    MatIconModule,
    MatExpansionModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatDialogModule,
    MatChipsModule,
    SharedModule
  ],
  declarations: [
    DiseaseComponent,
    DiseaseDetailComponent,
    DiseaseDetailDialogComponent,
    MedicalActionComponent,
    MedicalActionDetailComponent,
    MedicalActionDetailDialogComponent,
    PhenotypicFeatureComponent,
    PhenotypicDetailComponent,
    PhenotypicDetailDialogComponent,
    FileComponent,
    FileDetailComponent,
    FileDetailDialogComponent,
    PhenopacketComponent
  ],
  exports: [
    DiseaseComponent,
    DiseaseDetailComponent,
    MedicalActionComponent,
    MedicalActionDetailComponent,
    PhenotypicFeatureComponent,
    PhenotypicDetailComponent,
    FileComponent,
    FileDetailComponent,
    PhenopacketComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PhenopacketModule { }