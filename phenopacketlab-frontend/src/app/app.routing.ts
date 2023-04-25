import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './component/about/about.component';
import { HelpComponent } from './component/help/help.component';
import { ProfileSelectionComponent } from './component/pheno-creator/profile-selection/profile-selection.component';
import { PhenopacketListComponent } from './component/phenopacket-list/phenopacket-list.component';


const routes: Routes = [
  { path: 'dashboard', component: PhenopacketListComponent },
  { path: 'profile-selection', component: ProfileSelectionComponent },
  { path: 'creator', loadChildren: () => import('./component/pheno-creator/pheno-creator.module').then(m => m.PhenoCreatorModule) },
  // { path: 'families', component: FamilyListComponent },
  // { path: 'cohorts', component: CohortListComponent },
  { path: 'about', component: AboutComponent },
  { path: 'help', component: HelpComponent },
  { path: '**', redirectTo: 'dashboard' },
];

export const ROUTING = RouterModule.forRoot(routes);
