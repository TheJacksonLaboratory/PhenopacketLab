import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './component/about/about.component';
import { CohortListComponent } from './component/cohort-list/cohort-list.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FamilyListComponent } from './component/family-list/family-list.component';
import { PhenoCreatorComponent } from './component/pheno-creator/pheno-creator.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'pheno-creator', component: PhenoCreatorComponent },
  { path: 'families', component: FamilyListComponent },
  { path: 'cohorts', component: CohortListComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' },
];

export const routing = RouterModule.forRoot(routes);
