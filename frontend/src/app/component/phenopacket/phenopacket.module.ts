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
import { PhenopacketComponent } from './phenopacket.component';
import { FileDetailDialogComponent } from './file/file-detail/file-detail-dialog/file-detail-dialog.component';
import { DiseaseDetailDialogComponent } from './disease/disease-detail/disease-detail-dialog/disease-detail-dialog.component';
import { PhenotypicDetailDialogComponent } from './phenotypic-feature/phenotypic-detail/phenotypic-detail-dialog/phenotypic-detail-dialog.component';
import { MedicalActionComponent } from './medical-action/medical-action.component';
import { MedicalActionDetailComponent } from './medical-action/medical-action-detail/medical-action-detail.component';
import { MedicalActionDetailDialogComponent } from './medical-action/medical-action-detail/medical-action-detail-dialog/medical-action-detail-dialog.component';
import { MeasurementComponent } from './measurement/measurement.component';
import { MeasurementDetailComponent } from './measurement/measurement-detail/measurement-detail.component';
import { MeasurementDetailDialogComponent } from './measurement/measurement-detail/measurement-detail-dialog/measurement-detail-dialog.component';
import {MatDividerModule} from "@angular/material/divider";
import { MetadataComponent, ResourceDetailComponent } from './metadata/metadata.component';
import { InterpretationComponent } from './interpretation/interpretation.component';
import { InterpretationDetailComponent } from './interpretation/interpretation-detail/interpretation-detail.component';
import { InterpretationDetailDialogComponent } from './interpretation/interpretation-detail/interpretation-detail-dialog/interpretation-detail-dialog.component';
import { GenoInterpretationDetailComponent } from './interpretation/interpretation-detail/geno-interpretation/geno-interpretation-detail.component';
import { VariantInterpretationComponent } from './interpretation/interpretation-detail/geno-interpretation/variant-interpretation/variant-interpretation.component';
import { GeneDescriptorComponent } from './interpretation/interpretation-detail/geno-interpretation/gene-descriptor/gene-descriptor.component';
import { GeneContextDialogComponent } from './interpretation/interpretation-detail/geno-interpretation/gene-descriptor/gene-context-dialog/gene-context-dialog.component';
import { VcfRecordComponent } from './interpretation/interpretation-detail/geno-interpretation/vcf-record/vcf-record.component';
import { VcfRecordDialogComponent } from './interpretation/interpretation-detail/geno-interpretation/vcf-record/vcf-record-dialog/vcf-record-dialog.component';
import { BiosampleComponent } from './biosample/biosample.component';
import { BiosampleDetailComponent } from './biosample/biosample-detail/biosample-detail.component';
import { BiosampleDetailDialogComponent } from './biosample/biosample-detail/biosample-detail-dialog/biosample-detail-dialog.component';



@NgModule({
    imports: [
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
        SharedModule,
        MatDividerModule
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
    PhenotypicDetailDialogComponent,
    FileComponent,
    FileDetailComponent,
    FileDetailDialogComponent,
    MetadataComponent,
    ResourceDetailComponent,
    InterpretationComponent,
    InterpretationDetailComponent,
    GenoInterpretationDetailComponent,
    InterpretationDetailDialogComponent,
    VariantInterpretationComponent,
    GeneDescriptorComponent,
    GeneContextDialogComponent,
    VcfRecordComponent,
    VcfRecordDialogComponent,
    BiosampleComponent,
    BiosampleDetailComponent,
    BiosampleDetailDialogComponent,
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
    ResourceDetailComponent,
    InterpretationComponent,
    InterpretationDetailComponent,
    GenoInterpretationDetailComponent,
    InterpretationDetailDialogComponent,
    VariantInterpretationComponent,
    GeneDescriptorComponent,
    GeneContextDialogComponent,
    VcfRecordComponent,
    VcfRecordDialogComponent,
    BiosampleComponent,
    BiosampleDetailComponent,
    BiosampleDetailDialogComponent,
    PhenopacketComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PhenopacketModule { }