import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BioSample } from 'src/app/models/biosample';
import { Measurement } from 'src/app/models/measurement';
import { File } from 'src/app/models/base';
import { PhenotypicFeature } from 'src/app/models/phenotypic-feature';
import { BiosampleDetailDialogComponent } from './biosample-detail-dialog/biosample-detail-dialog.component';

@Component({
  selector: 'app-biosample-detail',
  templateUrl: './biosample-detail.component.html',
  styleUrls: ['./biosample-detail.component.scss']
})

export class BiosampleDetailComponent {

  id: string;

  @Input()
  biosample: BioSample;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openEditDialog() {
    const phenotypicDetailData = { 'title': 'Edit biosample' };
    phenotypicDetailData['biosample'] = this.biosample;
    phenotypicDetailData['displayCancelButton'] = true;
    const dialogRef = this.dialog.open(BiosampleDetailDialogComponent, {
      width: '750px',
      data: phenotypicDetailData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        let updatedBiosample = result.biosample;
        if (updatedBiosample !== undefined) {
          // update feature
          this.biosample = updatedBiosample;
          // emit change
          // this.onFeatureChanged.emit(this.phenotypicFeature);
        }
      }
    });
    return dialogRef;
  }

  getPhenotypicFeatures() {
    if (this.biosample) {
      return this.biosample.phenotypicFeatures? this.biosample.phenotypicFeatures : [];
    }
    return [];
  }
  
  getPhenopacketMeasurements() {
    if (this.biosample) {
      return this.biosample.measurements? this.biosample.measurements : [];
    }
    return [];
  }
  getPhenopacketFiles() {
    if (this.biosample) {
      return this.biosample.files? this.biosample.files : [];
    }
    return [];
  }
  changePhenotypicFeatures(phenotypicFeatures: PhenotypicFeature[]) {
    this.biosample.phenotypicFeatures = phenotypicFeatures;
  }
  changeMeasurements(measurements: Measurement[]) {
    this.biosample.measurements = measurements;
  }

  changeFiles(files: File[]) {
    this.biosample.files = files;
  }
}