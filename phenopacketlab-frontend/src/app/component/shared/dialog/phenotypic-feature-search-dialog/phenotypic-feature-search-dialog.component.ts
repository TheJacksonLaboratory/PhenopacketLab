import { Component } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';

import { OntologyClass } from 'src/app/models/base';
import { PhenotypicFeature } from 'src/app/models/phenotypic-feature';
import { ProfileSelection } from 'src/app/models/profile';
import { Utils } from '../../utils';
import { PhenotypicFeatureDialogComponent } from 'src/app/component/shared/dialog/phenotypic-feature-dialog/phenotypic-feature-dialog.component';

@Component({
  selector: 'app-phenotypic-feature-search-dialog',
  templateUrl: './phenotypic-feature-search-dialog.component.html',
  styleUrls: ['./phenotypic-feature-search-dialog.component.scss']
})
export class PhenotypicFeatureSearchDialogComponent {

  selectedFeature: PhenotypicFeature;
  features: PhenotypicFeature[];
  profile: ProfileSelection;

  refEdit: DynamicDialogRef;

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig,
              private dialogService: DialogService,
              private confirmationService: ConfirmationService) {
    this.features = config.data?.features;
    if (this.features === undefined) {
      this.features = [];
    }
    this.profile = config.data?.profile;
  }

  featureItemSelected(item: any) {
    if (item) {
      const feature = new PhenotypicFeature();
      feature.type = new OntologyClass(item.id, item.lbl);
      this.addPhenotypicFeature(feature);
    }
  }

  addTextMinedFeatures(phenotypicFeatures: PhenotypicFeature[]) {
    phenotypicFeatures.forEach(feature => {
      this.addPhenotypicFeature(feature);
    });
  }

  /**
     * Adds a new phenotypic feature.
     **/
  addPhenotypicFeature(phenotypicFeature?: PhenotypicFeature) {
    if (phenotypicFeature === undefined) {
      return;
    }
    // set unique key for feature table
    phenotypicFeature.key = Utils.getBiggestKey(this.features) + 1;
    phenotypicFeature.type.termUrl = Utils.getUrlForId(phenotypicFeature.type.id);
    this.features.push(phenotypicFeature);
    // we copy the array after each update so the ngChange method is triggered on the child component
    this.features = this.features.slice();
  }

  editPhenotypicFeature(feature?: PhenotypicFeature) {
    this.refEdit = this.dialogService.open(PhenotypicFeatureDialogComponent, {
      header: 'Edit Phenotypic feature',
      width: '50%',
      contentStyle: { 'overflow': 'auto' },
      baseZIndex: 10000,
      resizable: true,
      draggable: true,
      data: { phenotypicFeature: feature }
    });

    this.refEdit.onClose.subscribe((phenoFeature: PhenotypicFeature) => {
      if (phenoFeature) {
        const indexToUpdate = this.features.findIndex(item => item.key === phenoFeature.key);
        if (indexToUpdate === -1) {
          this.features.push(phenoFeature);
        } else {
          this.features[indexToUpdate] = phenoFeature;
          this.features = Object.assign([], this.features);
        }
      }
    });
  }

  deleteFeature(feature: PhenotypicFeature) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to remove \'' + feature.type.label + '\'?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.features = this.features.filter(val => val.key !== feature.key);
        this.selectedFeature = null;
      },
      reject: () => {
        this.confirmationService.close();
      }
    });
  }

  onCancelClick() {
    this.ref.close();
  }
  onOkClick() {
    this.ref.close(this.features);
  }

}
