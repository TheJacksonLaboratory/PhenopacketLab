import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BiosampleFormComponent } from './biosample-form.component';
import { DiseaseFormComponent } from './disease-form.component';
import { FileFormComponent } from './file-form.component';
import { IndividualFormComponent } from './individual-form.component';
import { InterpretationFormComponent } from './interpretation-form.component';
import { MeasurementFormComponent } from './measurement-form.component';
import { MedicalActionFormComponent } from './medical-action-form.component';
import { PhenoCreatorComponent } from './pheno-creator.component';
import { PhenotypicFeatureFormComponent } from './phenotypic-feature-form.component';
import { ValidateFormComponent } from './validate-form.component';


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '', component: PhenoCreatorComponent, children: [
                    { path: '', redirectTo: 'individual', pathMatch: 'full' },
                    { path: 'individual', component: IndividualFormComponent },
                    { path: 'phenotypic-features', component: PhenotypicFeatureFormComponent },
                    { path: 'measurements', component: MeasurementFormComponent },
                    { path: 'biosamples', component: BiosampleFormComponent },
                    { path: 'interpretations', component: InterpretationFormComponent },
                    { path: 'diseases', component: DiseaseFormComponent },
                    { path: 'medical-actions', component: MedicalActionFormComponent },
                    { path: 'files', component: FileFormComponent },
                    { path: 'validate', component: ValidateFormComponent }

                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class PhenoCreatorRoutingModule { }
