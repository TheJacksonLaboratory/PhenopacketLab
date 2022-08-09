import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { Disease } from 'src/app/models/disease';

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

  statuses: string[] = ['Included', 'Excluded'];
  selectedStatus: string;

  // TODO - fetch from backend
  // stages: string[] = ['Incubation', 'Prodromal', 'Illness', 'Decline', 'Convalescence'];
  stages: string[] = ['Stage 0 - carcinoma in situ', 'Stage I - localized cancer', 'Stage II - locally advanced cancer, early stages', 'Stage III - locally advanced cancer, later stages', 'Stage IV - metastatic cancer'];
  clinicalFindings: string[] = ['Tumor', 'Nodes', 'Metastasis'];
  severities: string[] = ['Borderline', 'Mild', 'Moderate', 'Severe', 'Profound'];
  lateralities: string[] = ['Right', 'Left'];

  constructor(public dialogRef: MatDialogRef<DiseaseDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.disease = data['disease'];
     }

  ngOnInit(): void {
    if(this.disease) {
      this.diseaseDetailName = this.disease.term.label;
      this.diseaseId = this.disease.term.id;
      this.description = this.disease.description;
      this.isA = this.disease.isA;
      this.selectedStatus = this.disease.excluded ? 'Excluded' : 'Included';
    }
  }

  changeStatus(evt: MatRadioChange) {
    this.selectedStatus = evt.value;
    this.disease.excluded = evt.value === 'Excluded';
  }

  onCancelClick(): void {
    this.dialogRef.close('cancel');
  }

  onOkClick() {
    return { 'disease': this.disease };
  }

}


