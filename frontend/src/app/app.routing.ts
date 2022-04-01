import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { SelectableOntologyTreeComponent } from './component/ontology-tree/selectable/selectable-ontology-tree.component';
import { SimpleOntologyTreeComponent } from './component/ontology-tree/simple/simple-ontology-tree.component';
import { PhenotypicFeatureComponent } from './component/phenotypic-feature/phenotypic-feature.component';


const routes: Routes = [
  { path: 'aboutUs', component: DashboardComponent },
  { path: 'phenotypic-feature', component: PhenotypicFeatureComponent },
  { path: 'simple-ontology-tree', component: SimpleOntologyTreeComponent },
  { path: 'selectable-ontology-tree', component: SelectableOntologyTreeComponent }
];

export const routing = RouterModule.forRoot(routes);
