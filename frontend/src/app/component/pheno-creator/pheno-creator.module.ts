import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhenoCreatorRoutingModule } from './pheno-creator-routing.module';
import { StepsModule } from 'primeng/steps';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { AccordionModule } from 'primeng/accordion';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TreeSelectModule } from 'primeng/treeselect';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { AngularSplitModule } from 'angular-split';

// import { EditorModule } from 'primeng/editor';
// import { QuillModule } from 'ngx-quill'

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhenoCreatorComponent } from './pheno-creator.component';
import { IndividualFormComponent } from './individual-form.component';
import { PhenotypicFeatureFormComponent } from './phenotypic-feature-form.component';
import { MeasurementFormComponent } from './measurement-form.component';
import { BiosampleFormComponent } from './biosample-form.component';
import { InterpretationFormComponent } from './interpretation-form.component';
import { DiseaseFormComponent } from './disease-form.component';
import { MedicalActionFormComponent } from './medical-action-form.component';
import { FileFormComponent } from './file-form.component';
import { ValidateFormComponent } from './validate-form.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../shared/shared.module';
import { PhenopacketModule } from '../phenopacket/phenopacket.module';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { CohortService } from 'src/app/services/cohort.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        PhenoCreatorRoutingModule,
        TabViewModule,
        ButtonModule,
        CardModule,
        InputTextModule,
        DropdownModule,
        InputMaskModule,
        CheckboxModule,
        StepsModule,
        ToastModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatTooltipModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatDialogModule,
        MatAutocompleteModule,
        MatRippleModule,
        MatSelectModule,
        CalendarModule,
        InputNumberModule,
        AccordionModule,
        PhenopacketModule,
        SharedModule,
        InputTextareaModule,
        RadioButtonModule,
        TreeSelectModule,
        AngularSplitModule,
        TableModule,
        TabViewModule,
        ConfirmDialogModule,
        ToastModule,
        MessagesModule
        // EditorModule,
        // QuillModule.forRoot()

    ],
    exports: [
        StepsModule,
        ToastModule,
        PhenoCreatorRoutingModule
    ],
    declarations: [
        PhenoCreatorComponent,
        IndividualFormComponent,
        PhenotypicFeatureFormComponent,
        MeasurementFormComponent,
        BiosampleFormComponent,
        InterpretationFormComponent,
        DiseaseFormComponent,
        MedicalActionFormComponent,
        FileFormComponent,
        ValidateFormComponent
    ],
    providers: [
        CohortService,
        MessageService
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]

})
export class PhenoCreatorModule { }
