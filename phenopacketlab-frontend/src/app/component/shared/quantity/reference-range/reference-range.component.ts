import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OntologyClass } from 'src/app/models/base';
import { ReferenceRange } from 'src/app/models/measurement';

@Component({
  selector: 'app-reference-range',
  templateUrl: './reference-range.component.html',
  styleUrls: ['./reference-range.component.scss']
})
export class ReferenceRangeComponent {

  @Input()
  referenceRange: ReferenceRange;
  @Input()
  unit: OntologyClass;
  @Output()
  referenceRangeChange = new EventEmitter<ReferenceRange>();

  constructor() {
  }

  updateLow(low) {
    if (this.referenceRange === undefined) {
      this.referenceRange = new ReferenceRange();
      this.referenceRange.unit = this.unit;
    }
    this.referenceRange.low = low;
    this.referenceRangeChange.emit(this.referenceRange);
  }

  updateHigh(high) {
    if (this.referenceRange === undefined) {
      this.referenceRange = new ReferenceRange();
      this.referenceRange.unit = this.unit;
    }
    this.referenceRange.high = high;
    this.referenceRangeChange.emit(this.referenceRange);
  }

}
