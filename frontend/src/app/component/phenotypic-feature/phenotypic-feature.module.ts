import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AgeControlComponent } from './age-control/age-control.component';
import { SearchFilterComponent } from './age-control/search-filter/search-filter.component';
import { PhenotypicFeatureComponent } from './phenotypic-feature.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { SelectChipComponent } from './select-chip/select-chip.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { DateComponent } from './age-control/date/date.component';


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
    SelectChipComponent,
    DateComponent,
    PhenotypicFeatureComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  exports: [
    MatFormFieldModule,
    MatInputModule,
    PhenotypicFeatureComponent
  ]
})
export class PhenotypicFeatureModule { }