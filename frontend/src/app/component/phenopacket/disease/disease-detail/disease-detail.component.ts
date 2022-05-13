import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { Disease } from 'src/app/models/disease';

@Component({
  selector: 'app-disease-detail',
  templateUrl: './disease-detail.component.html',
  styleUrls: ['./disease-detail.component.scss']
})
export class DiseaseDetailComponent {

  @Input() disease: Disease;
  @Output() onDiseaseChanged = new EventEmitter<Disease>();

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

  constructor() { }

  ngOnInit(): void {
    if(this.disease) {
      console.log(this.disease);
      this.diseaseDetailName = this.disease.term.label;
      this.diseaseId = this.disease.term.id;
      this.description = this.disease.description;
      this.isA = this.disease.isA;
      this.selectedStatus = this.disease.excluded ? 'Excluded' : 'Included';
      console.log(this.selectedStatus);
    }
  }

  changeStatus(evt: MatRadioChange) {
    this.selectedStatus = evt.value;
    this.disease.excluded = evt.value === 'Excluded';
    this.onDiseaseChanged.emit(this.disease);
  }



}


