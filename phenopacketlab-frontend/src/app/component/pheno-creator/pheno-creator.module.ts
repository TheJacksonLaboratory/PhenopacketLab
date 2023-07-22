import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { InplaceModule } from 'primeng/inplace';
import { SplitterModule } from 'primeng/splitter';
import { TooltipModule } from 'primeng/tooltip';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ChipModule } from 'primeng/chip';

import { AngularSplitModule } from 'angular-split';

import { IndividualStepComponent } from './individual-step.component';
import { PhenotypicFeatureStepComponent } from './phenotypic-feature-step.component';
import { MeasurementStepComponent } from './measurement-step.component';
import { BiosampleStepComponent } from './biosample-step.component';
import { DiseaseStepComponent } from './disease-step.component';
import { MedicalActionStepComponent } from './medical-action-step.component';
import { FileStepComponent } from './file-step.component';
import { ValidateStepComponent } from './validate-step.component';
import { SharedModule } from '../shared/shared.module';
import { PhenopacketModule } from '../phenopacket/phenopacket.module';
import { InterpretationStepComponent } from './interpretation-step.component';
import { WordDialogComponent } from '../shared/text-mining/word-dialog.component';
import { ProfileSelectionComponent } from './profile-selection/profile-selection.component';
import { PhenoCreatorComponent } from './pheno-creator.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
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
        MessagesModule,
        InplaceModule,
        SplitterModule,
        TooltipModule,
        SelectButtonModule,
        DialogModule,
        DynamicDialogModule,
        ProgressSpinnerModule,
        ScrollPanelModule,
        ChipModule

    ],
    exports: [
        StepsModule,
        ToastModule
    ],
    declarations: [
        IndividualStepComponent,
        PhenotypicFeatureStepComponent,
        MeasurementStepComponent,
        BiosampleStepComponent,
        InterpretationStepComponent,
        DiseaseStepComponent,
        MedicalActionStepComponent,
        FileStepComponent,
        ValidateStepComponent,
        WordDialogComponent,
        ProfileSelectionComponent,
        PhenoCreatorComponent
    ],
    providers: [
        MessageService
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]

})
export class PhenoCreatorModule { }
