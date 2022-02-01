import { Component } from '@angular/core';

@Component({
  selector: 'app-age-control',
  templateUrl: './age-control.component.html',
  styleUrls: ['./age-control.component.scss']
})

export class AgeControlComponent {
  days: string[] = ['N/A', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
  
  ontologies: string[] = ['class 1', 'class 2', 'class 3', 'class 4', 'class 5', 'class 6', 'class 7', 'class 8'];
}