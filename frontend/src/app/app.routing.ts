import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './component/about/about.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ProfileSelectionComponent } from './component/pheno-creator/profile-selection/profile-selection.component';
import { PhenopacketListComponent } from './component/phenopacket-list/phenopacket-list.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile-selection', component: ProfileSelectionComponent },
  { path: 'pheno-creator', loadChildren: () => import('./component/pheno-creator/pheno-creator.module').then(m => m.PhenoCreatorModule) },
  // { path: 'families', component: FamilyListComponent },
  { path: 'phenopackets', component: PhenopacketListComponent },
  // { path: 'cohorts', component: CohortListComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: 'dashboard' },
];

export const routing = RouterModule.forRoot(routes);
