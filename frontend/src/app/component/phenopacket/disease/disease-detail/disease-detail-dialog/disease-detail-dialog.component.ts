import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';

import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { OntologyClass } from 'src/app/models/base';
import { ClinicalFindings, Disease, Laterality, Severities, Stages } from 'src/app/models/disease';

@Component({
  selector: 'app-disease-detail-dialog',
  templateUrl: './disease-detail-dialog.component.html',
  styleUrls: ['./disease-detail-dialog.component.scss']
})
export class DiseaseDetailDialogComponent implements OnInit {

  disease: Disease;

  diseaseDetailName: string;
  diseaseId: string;
  isA: string;
  description: string;

  laterality: OntologyClass;
  severity: OntologyClass;
  finding: OntologyClass;
  stage: OntologyClass;


  statuses: string[] = ['Observed', 'Excluded'];
  selectedStatus: string;

  // TODO - fetch from backend
  // stages: string[] = ['Incubation', 'Prodromal', 'Illness', 'Decline', 'Convalescence'];
  stages: string[] = ['Stage 0 - carcinoma in situ', 'Stage I - localized cancer', 'Stage II - locally advanced cancer, early stages', 'Stage III - locally advanced cancer, later stages', 'Stage IV - metastatic cancer'];

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    this.disease = config.data?.disease;
  }

  ngOnInit(): void {
    if (this.disease) {
      this.diseaseDetailName = this.disease.term.label;
      this.diseaseId = this.disease.term.id;
      this.description = this.disease.description;
      this.isA = this.disease.isA;
      this.selectedStatus = this.disease.excluded ? 'Excluded' : 'Observed';
    }
  }

  changeStatus(evt: MatRadioChange) {
    this.selectedStatus = evt.value;
    if (this.disease) {
      this.disease.excluded = evt.value === 'Excluded';
    }
  }

  getLateralities() {
    return Laterality.VALUES;
  }

  getClinicalFindings() {
    return ClinicalFindings.VALUES;
  }
  getStages() {
    return Stages.VALUES;
  }
  getSeverities() {
    return Severities.VALUES;
  }
  // onCancelClick(): void {
  //   this.dialogRef.close('cancel');
  // }
  onCancelClick(): void {
    this.ref.close();
  }
  // onOkClick() {
  //   return { 'disease': this.disease };
  // }
  onOkClick() {
    this.ref.close(this.disease);
  }

}


