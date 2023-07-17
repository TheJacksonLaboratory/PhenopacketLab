import { Component } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';

import { ProfileSelection } from 'src/app/models/profile';
import { Utils } from '../../utils';
import { Disease } from 'src/app/models/disease';
import { OntologyClass } from 'src/app/models/base';
import { DiseaseDialogComponent } from '../disease-dialog/disease-dialog.component';

@Component({
  selector: 'app-disease-search-dialog',
  templateUrl: './disease-search-dialog.component.html',
  styleUrls: ['./disease-search-dialog.component.scss']
})
export class DiseaseSearchDialogComponent {

  selectedDisease: Disease;
  diseases: Disease[];
  profile: ProfileSelection;

  refEdit: DynamicDialogRef;

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig,
              private dialogService: DialogService,
              private confirmationService: ConfirmationService) {
    this.diseases = config.data?.diseases;
    if (this.diseases === undefined) {
      this.diseases = [];
    }
    this.profile = config.data?.profile;
  }

  diseaseItemSelected(item: any) {
    if (item) {
      const disease = new Disease();
      disease.term = new OntologyClass(item.id, item.lbl);
      this.addDisease(disease);
    }
  }

  /**
     * Adds a new disease.
     **/
  addDisease(disease?: Disease) {
    if (disease === undefined) {
      return;
    }
    // set unique key for feature table
    disease.key = Utils.getBiggestKey(this.diseases) + 1;
    disease.term.termUrl = Utils.getUrlForId(disease.term.id);
    this.diseases.push(disease);
    // we copy the array after each update so the ngChange method is triggered on the child component
    this.diseases = this.diseases.slice();
  }

  editDisease(disease?: Disease) {
    this.refEdit = this.dialogService.open(DiseaseDialogComponent, {
      header: 'Edit Disease',
      width: '50%',
      contentStyle: { 'overflow': 'auto' },
      baseZIndex: 10000,
      resizable: true,
      draggable: true,
      data: { disease: disease,
        profile: this.profile }
    });

    this.refEdit.onClose.subscribe((diseaseEdited: Disease) => {
      if (diseaseEdited) {
        const indexToUpdate = this.diseases.findIndex(item => item.key === diseaseEdited.key);
        if (indexToUpdate === -1) {
          this.diseases.push(diseaseEdited);
        } else {
          this.diseases[indexToUpdate] = diseaseEdited;
          this.diseases = Object.assign([], this.diseases);
        }
      }
    });
  }

  deleteDisease(disease: Disease) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to remove \'' + disease.term.label + '\'?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.diseases = this.diseases.filter(val => val.key !== disease.key);
        this.selectedDisease = null;
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
    this.ref.close(this.diseases);
  }

}
