import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { BioSample } from 'src/app/models/biosample';
import { Measurement } from 'src/app/models/measurement';
import { File } from 'src/app/models/base';
import { PhenotypicFeature } from 'src/app/models/phenotypic-feature';
import { BiosampleDetailDialogComponent } from './biosample-detail-dialog/biosample-detail-dialog.component';

@Component({
  selector: 'app-biosample-detail',
  templateUrl: './biosample-detail.component.html',
  styleUrls: ['./biosample-detail.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class BiosampleDetailComponent implements OnInit {

  @Input()
  biosample: BioSample;

  id: string;

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
        const updatedBiosample = result.biosample;
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
