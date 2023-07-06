import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularSplitModule } from 'angular-split';

import { MaterialModule } from './material.module';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { PrimeModule } from './prime.module';
import { SpinnerDialogComponent } from './spinner-dialog/spinner-dialog.component';
import { SearchFilterComponent } from './time-element/search-filter/search-filter.component';
import { TimeElementComponent } from './time-element/time-element.component';
import { AgeComponent } from './time-element/age/age.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { OntologyClassComponent } from './ontology-class/ontology-class.component';
import { TreeSelectComponent } from './ontology-class/tree-select/tree-select.component';
import { TreeSearchComponent } from './ontology-class/tree-search/tree-search.component';
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
import { MedicalActionEditComponent } from './edit/medical-action-edit/medical-action-edit.component';
import { ValidationResultsDialogComponent } from './validation-results-dialog/validation-results-dialog.component';
import { InterpretationDialogComponent } from './dialog/interpretation-dialog/interpretation-dialog.component';
import { PhenotypicFeatureSearchDialogComponent } from './dialog/phenotypic-feature-search-dialog/phenotypic-feature-search-dialog.component';
import { TextMiningComponent } from './text-mining/text-mining.component';
import { PhenotypicFeatureDialogComponent } from './dialog/phenotypic-feature-dialog/phenotypic-feature-dialog.component';
import { DiseaseDialogComponent } from './dialog/disease-dialog/disease-dialog.component';
import { DiseaseSearchDialogComponent } from './dialog/disease-search-dialog/disease-search-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeModule,
    MaterialModule,
    AngularSplitModule
  ],
  declarations: [
    MessageDialogComponent,
    SpinnerDialogComponent,
    TimeElementComponent,
    SearchFilterComponent,
    AgeComponent,
    AgeRangeComponent,
    GestationalAgeComponent,
    OntologyTimeComponent,
    SearchBoxComponent,
    TreeSelectComponent,
    OntologyClassComponent,
    TreeSearchComponent,
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
    MedicalActionEditComponent,
    ValidationResultsDialogComponent,
    TextMiningComponent
  ],
  exports: [
    MessageDialogComponent,
    SpinnerDialogComponent,
    TimeElementComponent,
    SearchFilterComponent,
    AgeComponent,
    AgeRangeComponent,
    GestationalAgeComponent,
    OntologyTimeComponent,
    SearchBoxComponent,
    TreeSelectComponent,
    OntologyClassComponent,
    TreeSearchComponent,
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
    MaterialModule,
    AngularSplitModule,
    TextPipe,
    MedicalActionEditComponent,
    ValidationResultsDialogComponent,
    TextMiningComponent
  ]
})
export class SharedModule { }
