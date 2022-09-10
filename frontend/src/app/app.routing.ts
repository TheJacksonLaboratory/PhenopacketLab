import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './component/about/about.component';
import { CohortListComponent } from './component/cohort-list/cohort-list.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FamilyListComponent } from './component/family-list/family-list.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'families', component: FamilyListComponent },
  { path: 'cohorts', component: CohortListComponent },
  { path: 'about', component: AboutComponent },
];

export const routing = RouterModule.forRoot(routes);
