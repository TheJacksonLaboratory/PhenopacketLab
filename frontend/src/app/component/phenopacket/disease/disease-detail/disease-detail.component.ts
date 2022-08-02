import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { Disease } from 'src/app/models/disease';
import { DiseaseDetailDialogComponent } from './disease-detail-dialog/disease-detail-dialog.component';

@Component({
  selector: 'app-disease-detail',
  templateUrl: './disease-detail.component.html',
  styleUrls: ['./disease-detail.component.scss']
})
export class DiseaseDetailComponent implements OnInit {

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


  statuses: string[] = ['Included', 'Excluded'];
  selectedStatus: string;

  // TODO - fetch from backend
  // stages: string[] = ['Incubation', 'Prodromal', 'Illness', 'Decline', 'Convalescence'];
  stages: string[] = ['Stage 0 - carcinoma in situ', 'Stage I - localized cancer', 'Stage II - locally advanced cancer, early stages', 'Stage III - locally advanced cancer, later stages', 'Stage IV - metastatic cancer'];
  clinicalFindings: string[] = ['Tumor', 'Nodes', 'Metastasis'];
  severities: string[] = ['Borderline', 'Mild', 'Moderate', 'Severe', 'Profound'];
  lateralities: string[] = ['Right', 'Left'];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    if(this.disease) {
      console.log(this.disease);
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
    const diseaseDetailData = { 'title': 'Edit disease' };
    diseaseDetailData['disease'] = this.disease;
    diseaseDetailData['displayCancelButton'] = true;
    const dialogRef = this.dialog.open(DiseaseDetailDialogComponent, {
      width: '750px',
      data: diseaseDetailData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        let updatedDisease = result.disease;
        if (updatedDisease !== undefined) {
          // update disease
          this.disease = updatedDisease;
          console.log(this.disease);
          this.updateDiseaseDetails();
          // emit change
          this.onDiseaseChanged.emit(this.disease);
        }
      }
    });
    return dialogRef;
  }


}


