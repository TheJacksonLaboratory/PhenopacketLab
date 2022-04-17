import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerDialogComponent } from './spinner-dialog/spinner-dialog.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SearchFilterComponent } from './age-control/search-filter/search-filter.component';
import { AgeControlComponent } from './age-control/age-control.component';
import { DateComponent } from './age-control/date/date.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatRadioModule,
    MatRippleModule,
    MatAutocompleteModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatTooltipModule,
    MatIconModule,
    MatSelectModule,
    MatListModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    MessageDialogComponent,
    SpinnerDialogComponent,
    AgeControlComponent,
    SearchFilterComponent,
    DateComponent
  ],
  exports: [
    MessageDialogComponent,
    SpinnerDialogComponent,
    AgeControlComponent,
    SearchFilterComponent,
    DateComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule { }