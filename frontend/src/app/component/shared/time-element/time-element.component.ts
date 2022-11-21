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
  @Input()
  useOntologyClass = false;

  age: Age;
  ageRange: AgeRange;
  gestationalAge: GestationalAge;

  selectedOntologyClass: OntologyClass;
  ontologyClass: OntologyClass;

  rangeDates: Date[];

  // No need to show the Ontology class UI as anytime an ontology class is shown, we should just show a selection of
  // corresponding ontology classes
  ageTypes: string[];

  constructor() {

  }
  ngOnInit(): void {
    // if ontologyNodes are provided then we add the OntologyClass item in selection
    if (this.useOntologyClass) {
      this.ageTypes = ['Age', 'Age Range', 'Gestational Age', 'Ontology Class'];
    } else {
      this.ageTypes = ['Age', 'Age Range', 'Gestational Age'];
    }
    if (this.timeElement === undefined) {
      this.timeElement = new TimeElement();
    }
    const element = this.timeElement.element;

    if (element instanceof Age) {
      this.selectedAgeType = this.ageTypes[0];
      this.age = element;
    } else if (element instanceof AgeRange) {
      this.selectedAgeType = this.ageTypes[1];
      this.ageRange = element;
    } else if (element instanceof GestationalAge) {
      this.selectedAgeType = this.ageTypes[2];
      this.gestationalAge = element;
    } else if (element instanceof OntologyClass) {
      this.selectedAgeType = this.ageTypes[3];
      this.selectedOntologyClass = element;
    }
  }

  ageTypeChange(event) {
    const type = event.value;
    if (type === this.ageTypes[0]) {
      if (this.age === undefined) {
        this.age = new Age();
      }
    } else if (type === this.ageTypes[1]) {
      if (this.ageRange === undefined) {
        this.ageRange = new AgeRange();
      }
    } else if (type === this.ageTypes[2]) {
      if (this.gestationalAge === undefined) {
        this.gestationalAge = new GestationalAge();
      }
    } else if (type === this.ageTypes[3]) {
      if (this.ontologyClass === undefined) {
        this.ontologyClass = new OntologyClass();
      }
    }
  }
  updateAge(timeElement: any) {
    this.timeElement.element = timeElement;
    this.timeElementEvent.emit(this.timeElement);
  }
  updateRangeStart(start) {
    this.ageRange.start = start;
    this.updateAge(this.ageRange);
  }
  updateRangeEnd(end) {
    this.ageRange.end = end;
    this.updateAge(this.ageRange);
  }
  // Gestational age
  updateWeeks(event) {
    this.updateGestationalAge(event, 'weeks');
  }
  updateDays(event) {
    this.updateGestationalAge(event, 'days');
  }
  private updateGestationalAge(event, type: string) {
    if (this.gestationalAge === undefined) {
      this.gestationalAge = new GestationalAge();
    }
    if (type === 'weeks') {
      this.gestationalAge.weeks = event.value;
    } else if (type === 'days') {
      this.gestationalAge.days = event.value;
    }
    this.timeElement.element = this.gestationalAge;
    this.timeElementEvent.emit(this.timeElement);
  }
}
