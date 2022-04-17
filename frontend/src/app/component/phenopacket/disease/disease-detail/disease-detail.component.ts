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

  constructor() { }

  ngOnInit(): void {
    if(this.disease) {
      this.diseaseDetailName = this.disease.name;
      this.diseaseId = this.disease.id;
      this.description = this.disease.description;
      this.isA = this.disease.isA;
      this.selectedStatus = this.disease.excluded ? 'Excluded' : 'Included';
      console.log(this.selectedStatus);
    }
  }


}


