import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Age, AgeRange, GestationalAge, OntologyClass, TimeElement } from 'src/app/models/base';

@Component({
  selector: 'app-time-element',
  templateUrl: './time-element.component.html',
  styleUrls: ['./time-element.component.scss']
})

export class TimeElementComponent implements OnInit {

  selectedAgeType: string;

  @Output() timeElementEvent = new EventEmitter<TimeElement>();

  @Input()
  timeElement: TimeElement;
  @Input()
  ontologyNodes: any[];

  age: Age;
  ageRange: AgeRange;
  gestationalAge: GestationalAge = new GestationalAge();

  selectedOntologyClass: OntologyClass;
  ontologyClass: OntologyClass;

  rangeDates: Date[];

  // No need to show the Ontology class UI as anytime an ontology class is shown, we should just show a selection of
  // corresponding ontology classes
  // ageTypes: string[] = ['Age', 'Age Range', 'Gestational Age'];
  ageTypes: string[] = ['Age', 'Age Range', 'Gestational Age', 'Ontology Class'];
  // days: string[] = ['0', '1', '2', '3', '4', '5', '6'];

  // TODO - fetch from backend
  ontologies: string[] = ['Adult onset', 'Pediatric onset', 'Antenatal onset', 'Neonatal onset', 'Puerpural onset', 'Congenital onset'];

  constructor() {

  }
  ngOnInit(): void {
    console.log('ontology nodes:');
    console.log(this.ontologyNodes);

  }

  updateTimeElement(timeElement: any) {
    this.timeElement = timeElement;
    this.timeElementEvent.emit(this.timeElement);
  }
}
