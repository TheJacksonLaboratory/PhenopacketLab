import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './component/about/about.component';
import { HelpComponent } from './component/help/help.component';
import { PhenopacketListComponent } from './component/phenopacket-list/phenopacket-list.component';
import { PhenoCreatorComponent } from './component/pheno-creator/pheno-creator.component';
import { IndividualStepComponent } from './component/pheno-creator/individual-step.component';
import { PhenotypicFeatureStepComponent } from './component/pheno-creator/phenotypic-feature-step.component';
import { MeasurementStepComponent } from './component/pheno-creator/measurement-step.component';
import { BiosampleStepComponent } from './component/pheno-creator/biosample-step.component';
import { DiseaseStepComponent } from './component/pheno-creator/disease-step.component';
import { InterpretationStepComponent } from './component/pheno-creator/interpretation-step.component';
import { FileStepComponent } from './component/pheno-creator/file-step.component';
import { MedicalActionStepComponent } from './component/pheno-creator/medical-action-step.component';
import { ValidateStepComponent } from './component/pheno-creator/validate-step.component';


const routes: Routes = [
  { path: '', component: PhenopacketListComponent },
  {
    path: 'creator', component: PhenoCreatorComponent, children: [
      { path: '', redirectTo: 'individual', pathMatch: 'full' },
      { path: 'individual', component: IndividualStepComponent },
      { path: 'phenotypic-features', component: PhenotypicFeatureStepComponent },
      { path: 'measurements', component: MeasurementStepComponent },
      { path: 'biosamples', component: BiosampleStepComponent },
      { path: 'diseases', component: DiseaseStepComponent },
      { path: 'interpretations', component: InterpretationStepComponent },
      { path: 'medical-actions', component: MedicalActionStepComponent },
      { path: 'files', component: FileStepComponent },
      { path: 'validate', component: ValidateStepComponent }]
  },
  // { path: 'families', component: FamilyListComponent },
  // { path: 'cohorts', component: CohortListComponent },
  { path: 'about', component: AboutComponent },
  { path: 'help', component: HelpComponent },
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
