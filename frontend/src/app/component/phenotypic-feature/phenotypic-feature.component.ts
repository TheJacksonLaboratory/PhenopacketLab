import { Component } from '@angular/core';

@Component({
  selector: 'app-phenotypic-feature',
  templateUrl: './phenotypic-feature.component.html',
  styleUrls: ['./phenotypic-feature.component.scss']
})

export class PhenotypicFeatureComponent {
    selectedStatus: string;
    statuses: string[] = ['Included', 'Excluded'];

    severities: string[] = ['Severity 0', 'Severity 1', 'Severity 2', 'Severity 3'];

    modifierValues: string[] = [ 'modifier 1', 'modifier 2' ];

    evidenceValues: string[] = [ 'evidence 1', 'evidence 2' ];
   
  
}