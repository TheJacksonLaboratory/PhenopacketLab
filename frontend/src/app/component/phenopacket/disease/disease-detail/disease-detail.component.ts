import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

import { Disease } from 'src/app/models/disease';
import { DiseaseDetailDialogComponent } from './disease-detail-dialog/disease-detail-dialog.component';

@Component({
  selector: 'app-disease-detail',
  templateUrl: './disease-detail.component.html',
  styleUrls: ['./disease-detail.component.scss']
})
export class DiseaseDetailComponent implements OnInit, OnDestroy {

  @Input() disease: Disease;
  @Output() onDiseaseChanged = new EventEmitter<Disease>();

  diseaseDetailName: string;
  diseaseId: string;
  isA: string;
  description: string;
  status: string;
  onset: string;
  resolution: string;
  stage: string;
  finding: string;
  severity: string;
  laterality: string;

  ref: DynamicDialogRef;

  statuses: string[] = ['Included', 'Excluded'];
  selectedStatus: string;

  // TODO - fetch from backend
  // stages: string[] = ['Incubation', 'Prodromal', 'Illness', 'Decline', 'Convalescence'];
  stages: string[] = ['Stage 0 - carcinoma in situ', 'Stage I - localized cancer', 'Stage II - locally advanced cancer, early stages', 'Stage III - locally advanced cancer, later stages', 'Stage IV - metastatic cancer'];
  clinicalFindings: string[] = ['Tumor', 'Nodes', 'Metastasis'];
  severities: string[] = ['Borderline', 'Mild', 'Moderate', 'Severe', 'Profound'];

  constructor(public dialogService: DialogService, public messageService: MessageService, public dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.disease) {
      this.diseaseDetailName = this.disease.term.label;
      this.diseaseId = this.disease.term.id;
      this.description = this.disease.description;
      this.updateDiseaseDetails();
    }
  }

  updateDiseaseDetails() {
    this.isA = this.disease.isA;
    this.status = this.disease.excluded ? 'Excluded' : 'Included';
    this.onset = this.disease.onset?.toString(), '';
    this.resolution = this.disease.resolution?.toString(), '';
    this.stage = this.disease.diseaseStage?.toString();
    this.finding = this.disease.clinicalTnmFinding?.toString();
    this.laterality = this.disease.laterality?.label, '';
  }

  changeStatus(evt: MatRadioChange) {
    this.selectedStatus = evt.value;
    this.disease.excluded = evt.value === 'Excluded';
    this.updateDiseaseDetails();
    this.onDiseaseChanged.emit(this.disease);
  }

  openEditDialog() {
    this.ref = this.dialogService.open(DiseaseDetailDialogComponent, {
      header: 'Edit Disease',
      width: '70%',
      contentStyle: { 'min-height': '500px', 'overflow': 'auto' },
      baseZIndex: 10000,
      resizable: true,
      draggable: true,
      data: { disease: this.disease }
    });

    this.ref.onClose.subscribe((disease: Disease) => {
      if (disease) {
        this.disease = disease;
        this.updateDiseaseDetails();
        // emit change
        this.onDiseaseChanged.emit(this.disease);
      }
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

}


