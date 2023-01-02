import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BiosampleStepComponent } from './biosample-step.component';
import { DiseaseStepComponent } from './disease-step.component';
import { FileStepComponent } from './file-step.component';
import { IndividualStepComponent } from './individual-step.component';
import { InterpretationStepComponent } from './interpretation-step.component';
import { MeasurementStepComponent } from './measurement-step.component';
import { MedicalActionStepComponent } from './medical-action-step.component';
import { PhenoCreatorAllComponent } from './pheno-creator-all.component';
import { PhenoCreatorRareComponent } from './pheno-creator-rare.component';
import { PhenotypicFeatureStepComponent } from './phenotypic-feature-step.component';
import { ValidateStepComponent } from './validate-step.component';


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'all', component: PhenoCreatorAllComponent, children: [
                    { path: '', redirectTo: 'individual', pathMatch: 'full' },
                    { path: 'individual', component: IndividualStepComponent },
                    { path: 'phenotypic-features', component: PhenotypicFeatureStepComponent },
                    { path: 'measurements', component: MeasurementStepComponent },
                    { path: 'biosamples', component: BiosampleStepComponent },
                    { path: 'interpretations', component: InterpretationStepComponent },
                    { path: 'diseases', component: DiseaseStepComponent },
                    { path: 'medical-actions', component: MedicalActionStepComponent },
                    { path: 'files', component: FileStepComponent },
                    { path: 'validate', component: ValidateStepComponent }

                ]
            },
            {
                path: 'rare', component: PhenoCreatorRareComponent, children: [
                    { path: '', redirectTo: 'individual', pathMatch: 'full' },
                    { path: 'individual', component: IndividualStepComponent },
                    { path: 'phenotypic-features', component: PhenotypicFeatureStepComponent },
                    { path: 'diseases', component: DiseaseStepComponent },
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
