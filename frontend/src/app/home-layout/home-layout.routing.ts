import { Routes } from '@angular/router';
import { AgeControlComponent } from '../component/age-control/age-control.component';
import { DashboardComponent } from '../component/dashboard/dashboard.component';
import { SelectableOntologyTreeComponent } from '../component/ontology-tree/selectable/selectable-ontology-tree.component';
import { SimpleOntologyTreeComponent } from '../component/ontology-tree/simple/simple-ontology-tree.component';



export const HomeLayoutRoutes: Routes = [
    { path: 'aboutUs',      component: DashboardComponent },
    { path: 'age-control',   component: AgeControlComponent },
    { path: 'simple-ontology-tree',  component: SimpleOntologyTreeComponent },
    { path: 'selectable-ontology-tree', component: SelectableOntologyTreeComponent },
    // { path: 'aboutUs', component: AboutUsComponent },
    // { path: 'aboutUs/:selectedTab', component: AboutUsComponent },
];
