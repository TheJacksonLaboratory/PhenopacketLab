import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AgeControlComponent } from './component/age-control/age-control.component';
import { SelectableOntologyTreeComponent } from './component/ontology-tree/selectable/selectable-ontology-tree.component';
import { SimpleOntologyTreeComponent } from './component/ontology-tree/simple/simple-ontology-tree.component';


const routes: Routes = [
  { path: 'aboutUs', component: DashboardComponent },
  { path: 'age-control', component: AgeControlComponent },
  { path: 'simple-ontology-tree', component: SimpleOntologyTreeComponent },
  { path: 'selectable-ontology-tree', component: SelectableOntologyTreeComponent }
];

export const routing = RouterModule.forRoot(routes);
