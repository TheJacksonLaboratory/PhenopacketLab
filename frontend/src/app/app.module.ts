import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { routing } from './app.routing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { MatExpansionModule } from '@angular/material/expansion';
import { AgeControlComponent } from './component/age-control/age-control.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { SelectableOntologyTreeComponent } from './component/ontology-tree/selectable/selectable-ontology-tree.component';
import { SimpleOntologyTreeComponent } from './component/ontology-tree/simple/simple-ontology-tree.component';
import { AppComponent } from './app.component';

import { ErrorInterceptor } from './helpers/error.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ComponentsModule } from './component/components.module';
import { MatRippleModule } from '@angular/material/core';
import { SearchFilterComponent } from './component/age-control/search-filter/search-filter.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    routing,
    ComponentsModule,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatCardModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    MatDialogModule,
    MatCheckboxModule,
    MatChipsModule,
    MatSortModule,
    MatTreeModule,
    MatProgressSpinnerModule,
    BrowserModule,
    CommonModule,
    MatButtonToggleModule,
    MatExpansionModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    SearchFilterComponent,
    AgeControlComponent,
    SimpleOntologyTreeComponent,
    SelectableOntologyTreeComponent
  ],
  exports: [RouterModule],
  providers: [{ provide: MatDialogRef, useValue: {} },
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  entryComponents: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
