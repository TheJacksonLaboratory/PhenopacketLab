import { Component, Input, OnInit } from '@angular/core';
import { PhenotypicFeature } from 'src/app/models/phenotypic-feature';

@Component({
  selector: 'app-phenotypic-detail',
  templateUrl: './phenotypic-detail.component.html',
  styleUrls: ['./phenotypic-detail.component.scss']
})
export class PhenotypicDetailComponent implements OnInit {

  @Input()
  phenotypicFeature: PhenotypicFeature;

  constructor() { }

  ngOnInit() {
  }

  getModifiers() {
    if (this.phenotypicFeature.modifiers) {
      const result = [];
      this.phenotypicFeature.modifiers.forEach(modifier => {
        result.push(modifier.toString());
      });
      return result.join(',');
    }
    return '';
  }
}
