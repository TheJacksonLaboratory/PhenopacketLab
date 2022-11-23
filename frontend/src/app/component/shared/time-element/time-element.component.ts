import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Age, AgeRange, GestationalAge, OntologyClass, TimeElement, TimeElementType } from 'src/app/models/base';

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
  timeElementTypes: string[];

  constructor() {

  }
  ngOnInit(): void {
    // if ontologyNodes are provided then we add the OntologyClass item in selection
    if (this.useOntologyClass) {
      this.timeElementTypes = ['Age', 'Age range', 'Gestational age', 'Ontology class'];
    } else {
      this.timeElementTypes = ['Age', 'Age range', 'Gestational age'];
    }
    if (this.timeElement === undefined) {
      this.timeElement = new TimeElement();
    }
    const element = this.timeElement.element;

    if (element instanceof Age) {
      this.selectedAgeType = TimeElementType.AGE;
      this.age = element;
    } else if (element instanceof AgeRange) {
      this.selectedAgeType = TimeElementType.AGE_RANGE;
      this.ageRange = element;
    } else if (element instanceof GestationalAge) {
      this.selectedAgeType = TimeElementType.GESTATIONAL_AGE;
      this.gestationalAge = element;
    } else if (element instanceof OntologyClass) {
      this.selectedAgeType = TimeElementType.ONTOLOGY_CLASS;
      this.selectedOntologyClass = element;
    }
  }

  // getter for TimeElement enum
  get ageType() {
    return TimeElementType.AGE;
  }
  get ageRangeType() {
    return TimeElementType.AGE_RANGE;
  }
  get gestationalAgeType() {
    return TimeElementType.GESTATIONAL_AGE;
  }
  get ontologyClassType() {
    return TimeElementType.ONTOLOGY_CLASS;
  }

  ageTypeChange(event) {
    const type = event.value;
    if (type === TimeElementType.AGE) {
      if (this.age === undefined) {
        this.age = new Age();
      }
    } else if (type === TimeElementType.AGE_RANGE) {
      if (this.ageRange === undefined) {
        this.ageRange = new AgeRange();
      }
    } else if (type === TimeElementType.GESTATIONAL_AGE) {
      if (this.gestationalAge === undefined) {
        this.gestationalAge = new GestationalAge();
      }
    } else if (type === TimeElementType.ONTOLOGY_CLASS) {
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
  // update ontology class
  updateOntologyClass(event) {
    // event is a TreeNode (as the ontologyClass is shown as TreeSelect component)
    const ontologyClass = new OntologyClass(event.node.key, event.node.label);
    this.timeElement.element = new TimeElement(ontologyClass);
    this.timeElementEvent.emit(this.timeElement);
  }
}
