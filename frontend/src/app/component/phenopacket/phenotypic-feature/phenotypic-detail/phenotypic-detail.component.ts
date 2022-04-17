import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { PhenotypicFeature } from 'src/app/models/phenotypic-feature';

@Component({
  selector: 'app-phenotypic-detail',
  templateUrl: './phenotypic-detail.component.html',
  styleUrls: ['./phenotypic-detail.component.scss']
})

export class PhenotypicDetailComponent {

  phenotypicDetailName: string;
  termId: string;
  description: string;
  selectedStatus: string;
  statuses: string[] = ['Included', 'Excluded'];

  // TODO - fetch from backend
  severities: string[] = ['Borderline', 'Mild', 'Moderate', 'Severe', 'Profound'];

  // TODO - fetch from backend
  modifierValues: string[] = ['modifier 1', 'modifier 2'];

  // TODO - fetch from backend
  evidenceValues: string[] = ['evidence 1', 'evidence 2'];

  // @ViewChild('phenotypicFeaturePaginator', { static: true }) phenotypicFeaturePaginator: MatPaginator;
  // @ViewChild(MatSort, { static: true }) phenotypicFeatureSort: MatSort;

  @Input()
  phenotypicFeature: PhenotypicFeature;

  constructor(public router: Router) { }

  ngOnInit() {
    this.phenotypicDetailName = this.phenotypicFeature.type.label;
    this.termId = this.phenotypicFeature.type.id;
    this.description = this.phenotypicFeature.description;
    this.selectedStatus = this.phenotypicFeature.excluded ? 'Excluded' : 'Included';

  }

}