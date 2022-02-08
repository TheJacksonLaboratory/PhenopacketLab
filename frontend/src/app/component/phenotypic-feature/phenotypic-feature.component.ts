import { Component } from '@angular/core';

@Component({
  selector: 'app-phenotypic-feature',
  templateUrl: './phenotypic-feature.component.html',
  styleUrls: ['./phenotypic-feature.component.scss']
})

export class PhenotypicFeatureComponent {

  phenotypicFeatureName = "Hypertension";
  termId = "HP:0000822";
  description = "The presence of chronic increased pressure in the systemic arterial system.";
  selectedStatus = "Included";
  statuses: string[] = ['Included', 'Excluded'];

  severities: string[] = ['Borderline', 'Mild', 'Moderate', 'Severe', 'Profound'];

  modifierValues: string[] = ['modifier 1', 'modifier 2'];

  evidenceValues: string[] = ['evidence 1', 'evidence 2'];

}