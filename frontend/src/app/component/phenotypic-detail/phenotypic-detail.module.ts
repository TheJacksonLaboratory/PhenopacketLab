import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PhenotypicDetailComponent } from './phenotypic-detail.component';
import { AgeControlComponent } from './age-control/age-control.component';
import { SearchFilterComponent } from './age-control/search-filter/search-filter.component';
import { DateComponent } from './age-control/date/date.component';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatChipsModule,
    MatTooltipModule,
    MatIconModule
  ],
  declarations: [
    AgeControlComponent,
    SearchFilterComponent,
    DateComponent,
    PhenotypicDetailComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  exports: [
    PhenotypicDetailComponent
  ]
})
export class PhenotypicDetailModule { }