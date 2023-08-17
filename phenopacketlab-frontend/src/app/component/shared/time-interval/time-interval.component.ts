import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TimeInterval } from 'src/app/models/base';

@Component({
  selector: 'app-time-interval',
  templateUrl: './time-interval.component.html',
  styleUrls: ['./time-interval.component.scss']
})
export class TimeIntervalComponent {

  @Input()
  timeInterval: TimeInterval;
  @Output()
  timeIntervalChange = new EventEmitter<TimeInterval>();

  constructor() {
  }

  updateStart(start) {
    if (this.timeInterval === undefined) {
      this.timeInterval = new TimeInterval();
    }
    this.timeInterval.start = start;
    this.timeIntervalChange.emit(this.timeInterval);
  }

  updateEnd(end) {
    if (this.timeInterval === undefined) {
      this.timeInterval = new TimeInterval();
    }
    this.timeInterval.end = end;
    this.timeIntervalChange.emit(this.timeInterval);
  }
}
