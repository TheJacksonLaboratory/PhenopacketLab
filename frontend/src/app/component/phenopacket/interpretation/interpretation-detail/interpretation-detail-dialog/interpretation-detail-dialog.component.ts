import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OntologyClass, Procedure, TimeElement } from 'src/app/models/base';
import { ComplexValue, Measurement, Quantity, TypedQuantity, Value } from 'src/app/models/measurement';
import { MeasurementService } from 'src/app/services/measurement.search.service';

@Component({
  selector: 'app-interpretation-detail-dialog',
  templateUrl: './interpretation-detail-dialog.component.html',
  styleUrls: ['./interpretation-detail-dialog.component.scss']
})

export class InterpretationDetailDialogComponent {

  description: string;
  assay:  OntologyClass;
  measurementValue: Value | ComplexValue;
  timeObserved: TimeElement;
  // procedure
  procedure: Procedure;
  procedureCode: OntologyClass;
  bodySite: OntologyClass;
  performed: TimeElement;
  // Value
  value: Quantity | OntologyClass;
  complexValue: TypedQuantity[];
  
  measurement: Measurement;

  constructor(public dialogRef: MatDialogRef<InterpretationDetailDialogComponent>,
    public searchService: MeasurementService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.measurement = data['interpretation'];
  }

  ngOnInit() {
    this.updateMeasurement();

  }

  updateMeasurement() {
    if (this.measurement) {
      
    } else {
      this.measurement = new Measurement();
    }
  }

  onAssayChange(eventObj: any) {
    this.assay = eventObj.value;
    if (this.measurement) {
      this.measurement.assay = this.assay;
    }
  }

  onMeasurementValueChange(eventObj: any) {
    this.measurementValue = eventObj.value;
    if (this.measurement) {
      this.measurement.measurementValue = this.measurementValue;
    }
  }

  onTimeOfMeasurementChange(eventObj: any) {
    this.timeObserved = eventObj.value;
    if (this.measurement) {
      this.measurement.timeObserved = this.timeObserved;
    }
  }

  onProcedureChange(eventObj: any) {
    this.procedure = eventObj.value;
    if (this.measurement) {
      this.measurement.procedure = this.procedure;
    }
  }

  onDescriptionChange(eventObj: any) {
    this.description = eventObj.value;
    if (this.measurement) {
      this.measurement.description = this.description;
    }
  }

  onCancelClick(): void {
    this.dialogRef.close('cancel');
  }

  onOkClick() {
    return { 'measurement': this.measurement };
  }
}