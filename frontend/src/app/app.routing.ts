import { Routes, RouterModule } from '@angular/router';
import { CohortListComponent } from './component/cohort-list/cohort-list.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FamilyListComponent } from './component/family-list/family-list.component';
import { PhenopacketComponent } from './component/phenopacket/phenopacket.component';


const routes: Routes = [
  { path: 'aboutUs', component: DashboardComponent },
  { path: 'families', component: FamilyListComponent },
  { path: 'cohorts', component: CohortListComponent },
  { path: 'phenopackets', component: PhenopacketComponent },
];

export const routing = RouterModule.forRoot(routes);
