import { Component, Input, OnInit } from '@angular/core';
import { MondoDisease } from 'src/app/models/mondo-disease';

@Component({
  selector: 'app-disease-detail',
  templateUrl: './disease-detail.component.html',
  styleUrls: ['./disease-detail.component.scss']
})
export class DiseaseDetailComponent {

  @Input() disease: MondoDisease;

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
      this.diseaseDetailName = this.disease.name;
      this.diseaseId = this.disease.id;
      this.description = this.disease.description;
      this.isA = this.disease.isA;
      this.selectedStatus = this.disease.excluded ? 'Excluded' : 'Included';
    }
  }


}


