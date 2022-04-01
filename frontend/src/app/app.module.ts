import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { routing } from './app.routing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { MatExpansionModule } from '@angular/material/expansion';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { SelectableOntologyTreeComponent } from './component/ontology-tree/selectable/selectable-ontology-tree.component';
import { SimpleOntologyTreeComponent } from './component/ontology-tree/simple/simple-ontology-tree.component';

import { ErrorInterceptor } from './helpers/error.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { MatRippleModule } from '@angular/material/core';

import { AppComponent } from './app.component';
import { ComponentsModule } from './component/components.module';
import { PhenotypicFeatureModule } from './component/phenotypic-feature/phenotypic-feature.module';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    routing,
    ComponentsModule,
    RouterModule,
    CommonModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatTooltipModule,
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
    MatExpansionModule,
    PhenotypicFeatureModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
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
