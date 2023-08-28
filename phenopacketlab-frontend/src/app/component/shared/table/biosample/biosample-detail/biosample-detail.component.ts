import { Component, Input, OnInit } from '@angular/core';
import { BioSample } from 'src/app/models/biosample';
import { Measurement } from 'src/app/models/measurement';
import { File } from 'src/app/models/base';
import { PhenotypicFeature } from 'src/app/models/phenotypic-feature';

@Component({
  selector: 'app-biosample-detail',
  templateUrl: './biosample-detail.component.html',
  styleUrls: ['./biosample-detail.component.scss']
})
export class BiosampleDetailComponent implements OnInit {

  @Input()
  biosample: BioSample;

  id: string;

  constructor() { }

  ngOnInit() {
  }

  getPhenotypicFeatures() {
    if (this.biosample) {
      return this.biosample.phenotypicFeatures ? this.biosample.phenotypicFeatures : [];
    }
    return [];
  }

  getPhenopacketMeasurements() {
    if (this.biosample) {
      return this.biosample.measurements ? this.biosample.measurements : [];
    }
    return [];
  }
  getPhenopacketFiles() {
    if (this.biosample) {
      return this.biosample.files ? this.biosample.files : [];
    }
    return [];
  }
  changePhenotypicFeatures(phenotypicFeatures: PhenotypicFeature[]) {
    if (this.biosample) {
      this.biosample.phenotypicFeatures = phenotypicFeatures;
    }
  }
  changeMeasurements(measurements: Measurement[]) {
    if (this.biosample) {
      this.biosample.measurements = measurements;
    }
  }

  changeFiles(files: File[]) {
    if (this.biosample) {
      this.biosample.files = files;
    }
  }
}
