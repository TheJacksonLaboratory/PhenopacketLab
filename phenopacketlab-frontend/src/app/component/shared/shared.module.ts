import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularSplitModule } from 'angular-split';

import { PrimeModule } from './prime.module';
import { SpinnerDialogComponent } from './spinner-dialog/spinner-dialog.component';
import { TimeElementComponent } from './time-element/time-element.component';
import { AgeComponent } from './time-element/age/age.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { OntologyClassComponent } from './ontology-class/ontology-class.component';
import { TreeSelectComponent } from './ontology-class/tree-select/tree-select.component';
import { IndividualEditComponent } from './edit/individual-edit/individual-edit.component';
import { AgeRangeComponent } from './time-element/age-range/age-range.component';
import { GestationalAgeComponent } from './time-element/gestational-age/gestational-age.component';
import { OntologyTimeComponent } from './time-element/ontology-time/ontology-time.component';
import { VariantInterpretationComponent } from './dialog/interpretation-dialog/genomic-interpretation/variant-interpretation/variant-interpretation.component';
import { GenomicInterpretationDialogComponent } from './dialog/interpretation-dialog/genomic-interpretation/genomic-interpretation-dialog.component';
import { VariationDescriptorComponent } from './dialog/interpretation-dialog/genomic-interpretation/variant-interpretation/variation-descriptor/variation-descriptor.component';
import { GeneDescriptorComponent } from './dialog/interpretation-dialog/genomic-interpretation/gene-descriptor/gene-descriptor.component';
import { VariationSearchComponent } from './dialog/interpretation-dialog/genomic-interpretation/variant-interpretation/variation-search/variation-search.component';
import { LabelCreatorDialogComponent } from './dialog/interpretation-dialog/genomic-interpretation/gene-descriptor/label-creator-dialog.component';
import { TextPipe } from './text.pipe';
import { ValidationResultsDialogComponent } from './validation-results-dialog/validation-results-dialog.component';
import { InterpretationDialogComponent } from './dialog/interpretation-dialog/interpretation-dialog.component';
import { PhenotypicFeatureSearchDialogComponent } from './dialog/phenotypic-feature-search-dialog/phenotypic-feature-search-dialog.component';
import { TextMiningComponent } from './text-mining/text-mining.component';
import { PhenotypicFeatureDialogComponent } from './dialog/phenotypic-feature-dialog/phenotypic-feature-dialog.component';
import { DiseaseDialogComponent } from './dialog/disease-dialog/disease-dialog.component';
import { DiseaseSearchDialogComponent } from './dialog/disease-search-dialog/disease-search-dialog.component';
import { FileDialogComponent } from './dialog/file-dialog/file-dialog.component';
import { MedicalActionDialogComponent } from './dialog/medical-action-dialog/medical-action-dialog.component';
import { QuantityComponent } from './quantity/quantity.component';
import { ReferenceRangeComponent } from './quantity/reference-range/reference-range.component';
import { MeasurementComponent } from './table/measurement/measurement.component';
import { MeasurementDetailComponent } from './table/measurement/measurement-detail/measurement-detail.component';
import { DiseaseComponent } from './table/disease/disease.component';
import { DiseaseDetailComponent } from './table/disease/disease-detail/disease-detail.component';
import { MedicalActionComponent } from './table/medical-action/medical-action.component';
import { MedicalActionDetailComponent } from './table/medical-action/medical-action-detail/medical-action-detail.component';
import { PhenotypicFeatureComponent } from './table/phenotypic-feature/phenotypic-feature.component';
import { PhenotypicDetailComponent } from './table/phenotypic-feature/phenotypic-detail/phenotypic-detail.component';
import { FileComponent } from './table/file/file.component';
import { FileDetailComponent } from './table/file/file-detail/file-detail.component';
import { InterpretationComponent } from './table/interpretation/interpretation.component';
import { InterpretationDetailComponent } from './table/interpretation/interpretation-detail/interpretation-detail.component';
import { BiosampleComponent } from './table/biosample/biosample.component';
import { BiosampleDetailComponent } from './table/biosample/biosample-detail/biosample-detail.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeModule,
    AngularSplitModule
  ],
  declarations: [
    SpinnerDialogComponent,
    TimeElementComponent,
    AgeComponent,
    AgeRangeComponent,
    GestationalAgeComponent,
    OntologyTimeComponent,
    SearchBoxComponent,
    TreeSelectComponent,
    OntologyClassComponent,
    DiseaseDialogComponent,
    DiseaseSearchDialogComponent,
    PhenotypicFeatureDialogComponent,
    PhenotypicFeatureSearchDialogComponent,
    IndividualEditComponent,
    InterpretationDialogComponent,
    VariantInterpretationComponent,
    GenomicInterpretationDialogComponent,
    VariationDescriptorComponent,
    VariationSearchComponent,
    GeneDescriptorComponent,
    LabelCreatorDialogComponent,
    TextPipe,
    MedicalActionDialogComponent,
    ValidationResultsDialogComponent,
    TextMiningComponent,
    FileDialogComponent,
    QuantityComponent,
    ReferenceRangeComponent,
    MeasurementComponent,
    MeasurementDetailComponent,
    DiseaseComponent,
    DiseaseDetailComponent,
    MedicalActionComponent,
    MedicalActionDetailComponent,
    PhenotypicFeatureComponent,
    PhenotypicDetailComponent,
    FileComponent,
    FileDetailComponent,
    InterpretationComponent,
    InterpretationDetailComponent,
    BiosampleComponent,
    BiosampleDetailComponent
  ],
  exports: [
    SpinnerDialogComponent,
    TimeElementComponent,
    AgeComponent,
    AgeRangeComponent,
    GestationalAgeComponent,
    OntologyTimeComponent,
    SearchBoxComponent,
    TreeSelectComponent,
    OntologyClassComponent,
    DiseaseDialogComponent,
    DiseaseSearchDialogComponent,
    PhenotypicFeatureDialogComponent,
    PhenotypicFeatureSearchDialogComponent,
    IndividualEditComponent,
    InterpretationDialogComponent,
    VariantInterpretationComponent,
    GenomicInterpretationDialogComponent,
    VariationDescriptorComponent,
    GeneDescriptorComponent,
    VariationSearchComponent,
    LabelCreatorDialogComponent,
    PrimeModule,
    AngularSplitModule,
    TextPipe,
    MedicalActionDialogComponent,
    ValidationResultsDialogComponent,
    TextMiningComponent,
    FileDialogComponent,
    QuantityComponent,
    ReferenceRangeComponent,
    MeasurementComponent,
    MeasurementDetailComponent,
    DiseaseComponent,
    DiseaseDetailComponent,
    MedicalActionComponent,
    MedicalActionDetailComponent,
    PhenotypicFeatureComponent,
    PhenotypicDetailComponent,
    FileComponent,
    FileDetailComponent,
    InterpretationComponent,
    InterpretationDetailComponent,
    BiosampleComponent,
    BiosampleDetailComponent
  ]
})
export class SharedModule { }
