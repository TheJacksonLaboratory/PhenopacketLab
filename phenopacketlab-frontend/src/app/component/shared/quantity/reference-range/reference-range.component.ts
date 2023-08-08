import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { OntologyClass } from 'src/app/models/base';
import { ReferenceRange } from 'src/app/models/measurement';
import { OntologyTreeNode } from 'src/app/models/ontology-treenode';
import { ConstantsService } from 'src/app/services/constants.service';

@Component({
  selector: 'app-reference-range',
  templateUrl: './reference-range.component.html',
  styleUrls: ['./reference-range.component.scss']
})
export class ReferenceRangeComponent implements OnInit, OnDestroy {

  @Input()
  referenceRange: ReferenceRange;
  @Output()
  referenceRangeChange = new EventEmitter<ReferenceRange>();

  unitSubscription: Subscription;
  unitNodes: OntologyTreeNode[];
  unit: OntologyClass;
  low: number;
  high: number;

  constructor(public constantsService: ConstantsService) {
  }

  ngOnInit() {
    this.unitSubscription = this.constantsService.getUnits().subscribe(nodes => {
      if (nodes) {
        this.unitNodes = <OntologyTreeNode[]>nodes.children;
      }
    });
    this.unit = this.referenceRange?.unit;
    this.high = this.referenceRange?.high;
    this.low = this.referenceRange?.low;
  }
  ngOnDestroy(): void {
    if (this.unitSubscription) {
      this.unitSubscription.unsubscribe();
    }
  }

  updateUnit(unit) {
  }

  updateLow(low) {

  }

  updateHigh(high) {

  }

}
