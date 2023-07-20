import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BiosampleStepComponent } from './biosample-step.component';
import { DiseaseStepComponent } from './disease-step.component';
import { FileStepComponent } from './file-step.component';
import { IndividualStepComponent } from './individual-step.component';
import { InterpretationStepComponent } from './interpretation-step.component';
import { MeasurementStepComponent } from './measurement-step.component';
import { MedicalActionStepComponent } from './medical-action-step.component';
import { PhenotypicFeatureStepComponent } from './phenotypic-feature-step.component';
import { ValidateStepComponent } from './validate-step.component';
import { PhenoCreatorComponent } from './pheno-creator.component';


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'all', component: PhenoCreatorComponent, children: [
                    { path: '', redirectTo: 'individual', pathMatch: 'full' },
                    { path: 'individual', component: IndividualStepComponent },
                    { path: 'phenotypic-features', component: PhenotypicFeatureStepComponent },
                    { path: 'measurements', component: MeasurementStepComponent },
                    { path: 'biosamples', component: BiosampleStepComponent },
                    { path: 'diseases', component: DiseaseStepComponent },
                    { path: 'interpretations', component: InterpretationStepComponent },
                    { path: 'medical-actions', component: MedicalActionStepComponent },
                    { path: 'files', component: FileStepComponent },
                    { path: 'validate', component: ValidateStepComponent }

                ]
            },
            {
                path: 'rare', component: PhenoCreatorComponent, children: [
                    { path: '', redirectTo: 'individual', pathMatch: 'full' },
                    { path: 'individual', component: IndividualStepComponent },
                    { path: 'phenotypic-features', component: PhenotypicFeatureStepComponent },
                    { path: 'diseases', component: DiseaseStepComponent },
                    { path: 'interpretations', component: InterpretationStepComponent },
                    { path: 'validate', component: ValidateStepComponent }

                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class PhenoCreatorRoutingModule { }
