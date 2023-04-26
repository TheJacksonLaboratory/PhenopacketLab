import {Component, Input, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Measurement } from 'src/app/models/measurement';

@Component({
  selector: 'app-measurement-detail',
  templateUrl: './measurement-detail.component.html',
  styleUrls: ['./measurement-detail.component.scss']
})

export class MeasurementDetailComponent implements OnInit {
  @Input()
  measurement: Measurement;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  getMeasurementValue() {
    if (this.measurement) {
      if (this.measurement.value) {
        return this.measurement.value.toString();
      } else if (this.measurement.complexValue) {
        return this.measurement.complexValue;
      }
    }
    return '';
  }

}
