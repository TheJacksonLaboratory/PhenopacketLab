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

import { PhenotypicDetailComponent } from './phenotypic-feature/phenotypic-detail/phenotypic-detail.component';
import { DiseaseComponent } from './disease/disease.component';
import { PhenotypicFeatureComponent } from './phenotypic-feature/phenotypic-feature.component';
import { DiseaseDetailComponent } from './disease/disease-detail/disease-detail.component';
import { SearchBoxComponent } from './disease/search-box/search-box.component';
import { SharedModule } from '../shared/shared.module';


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
    SharedModule
  ],
  declarations: [
    DiseaseComponent,
    SearchBoxComponent,
    DiseaseDetailComponent,
    PhenotypicFeatureComponent,
    PhenotypicDetailComponent
  ],
  exports: [
    DiseaseComponent,
    SearchBoxComponent,
    DiseaseDetailComponent,
    PhenotypicFeatureComponent,
    PhenotypicDetailComponent,
    // PhenopacketComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PhenopacketModule { }