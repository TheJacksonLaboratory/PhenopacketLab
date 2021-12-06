import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeLayoutRoutes } from './home-layout.routing';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { DashboardComponent } from '../component/dashboard/dashboard.component';
import { AgeControlComponent } from '../component/age-control/age-control.component';
import { SimpleOntologyTreeComponent } from '../component/ontology-tree/simple/simple-ontology-tree.component';
import { JwtInterceptor } from '../helpers/jwt.interceptor';
import { ErrorInterceptor } from '../helpers/error.interceptor';
import { SelectableOntologyTreeComponent } from '../component/ontology-tree/selectable/selectable-ontology-tree.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(HomeLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatTooltipModule,
        MatAutocompleteModule,
        MatTabsModule,
        MatCardModule,
        HttpClientModule,
        MatDialogModule,
        MatCheckboxModule,
        MatChipsModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatTreeModule,
        MatCheckboxModule,
        MatIconModule,
        MatButtonToggleModule
    ],
    declarations: [
        DashboardComponent,
        AgeControlComponent,
        SimpleOntologyTreeComponent,
        SelectableOntologyTreeComponent
    ],
    providers: [{ provide: MatDialogRef, useValue: {} },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
    entryComponents: [],
})

export class HomeLayoutModule {
}
