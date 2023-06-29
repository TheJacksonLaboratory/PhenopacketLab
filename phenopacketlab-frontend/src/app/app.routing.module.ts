import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './component/about/about.component';
import { HelpComponent } from './component/help/help.component';
import { PhenopacketListComponent } from './component/phenopacket-list/phenopacket-list.component';


const routes: Routes = [
  { path: '', component: PhenopacketListComponent},
  { path: 'creator', loadChildren: () =>
        import('./component/pheno-creator/pheno-creator.module')
            .then(m => m.PhenoCreatorModule) },
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
