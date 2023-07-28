import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Age, AgeRange, GestationalAge, OntologyClass, TimeElement, TimeElementId, TimeElementType } from 'src/app/models/base';
import { AgeComponent } from './age/age.component';

@Component({
  selector: 'app-time-element',
  templateUrl: './time-element.component.html',
  styleUrls: ['./time-element.component.scss']
})
export class TimeElementComponent implements OnInit {

  @Output() timeElementEvent = new EventEmitter<TimeElement>();

  @Input()
  timeElement: TimeElement;
  @Input()
  ontologyNodes: any[];
  @Input()
  useOntologyClass = false;

  // Used to identify which time element it is
  @Input()
  timeElementId: TimeElementId;

  selectedAgeType: string;

  age: Age;
  ageRange: AgeRange;
  gestationalAge: GestationalAge;
  ontologyClass: OntologyClass;
  timestamp: string;

  // No need to show the Ontology class UI as anytime an ontology class is shown, we should just show a selection of
  // corresponding ontology classes
  timeElementTypes: string[];

  @ViewChild(AgeComponent) ageChild: AgeComponent;


  constructor() {

  }

  ngOnInit(): void {
    // if ontologyNodes are provided then we add the OntologyClass item in selection
    if (this.useOntologyClass) {
      // this.timeElementTypes = ['Age', 'Age range', 'Gestational age', 'Ontology class', 'Timestamp'];
      this.timeElementTypes = ['Age', 'Gestational age', 'Ontology class', 'Timestamp'];
    } else {
      // this.timeElementTypes = ['Age', 'Age range', 'Gestational age', 'Timestamp'];
      this.timeElementTypes = ['Age', 'Gestational age', 'Timestamp'];
    }
    this.initialize();
  }

  onTimeElementChange(timeElementUpdate: TimeElement): void {
    this.timeElement = timeElementUpdate;
  }

  private initialize() {
    console.log(this.timeElement);
    if (this.timeElement === undefined) {
      this.timeElement = new TimeElement();
    }
    if (this.timeElement?.age) {
      this.selectedAgeType = TimeElementType.AGE;
      this.age = this.timeElement?.age;
    } else if (this.timeElement?.ageRange) {
      this.selectedAgeType = TimeElementType.AGE_RANGE;
      this.ageRange = this.timeElement?.ageRange;
    } else if (this.timeElement?.gestationalAge) {
      this.selectedAgeType = TimeElementType.GESTATIONAL_AGE;
      this.gestationalAge = this.timeElement?.gestationalAge;
    } else if (this.timeElement?.ontologyClass) {
      this.selectedAgeType = TimeElementType.ONTOLOGY_CLASS;
      this.ontologyClass = this.timeElement?.ontologyClass;
    } else if (this.timeElement?.timestamp) {
      this.selectedAgeType = TimeElementType.TIMESTAMP;
      this.timestamp = this.timeElement?.timestamp;
    } else {
      this.selectedAgeType = null;
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
  get timestampType() {
    return TimeElementType.TIMESTAMP;
  }

  ageTypeChange(event) {
    const type = event.value;
    if (this.timeElement === undefined) {
      this.timeElement = new TimeElement();
    }
    if (type === TimeElementType.AGE) {
      this.updateTimeElement(new Age());
    } else if (type === TimeElementType.AGE_RANGE) {
      this.updateTimeElement(new AgeRange(new Age(), new Age()));
    } else if (type === TimeElementType.GESTATIONAL_AGE) {
      this.updateTimeElement(new GestationalAge());
    } else if (type === TimeElementType.ONTOLOGY_CLASS) {
      this.updateTimeElement(new OntologyClass());
    } else if (type === TimeElementType.TIMESTAMP) {
      this.updateTimeElement('');
    } else if (type === null) {
      this.updateTimeElement(null);
    }
  }
  updateTimeElement(timeElement: any) {
    if (this.timeElement === undefined || this.timeElement === null) {
      this.timeElement = new TimeElement();
    }
    if (timeElement instanceof Age) {
      this.timeElement.age = timeElement;
      this.timeElement.ageRange = undefined;
      this.timeElement.gestationalAge = undefined;
      this.timeElement.ontologyClass = undefined;
      this.timeElement.timestamp = undefined;
    } else if (timeElement instanceof AgeRange) {
      this.timeElement.age = undefined;
      this.timeElement.ageRange = timeElement;
      this.timeElement.gestationalAge = undefined;
      this.timeElement.ontologyClass = undefined;
      this.timeElement.timestamp = undefined;
    } else if (timeElement instanceof GestationalAge) {
      this.timeElement.age = undefined;
      this.timeElement.ageRange = undefined;
      this.timeElement.gestationalAge = timeElement;
      this.timeElement.ontologyClass = undefined;
      this.timeElement.timestamp = undefined;
    } else if (timeElement instanceof OntologyClass) {
      this.timeElement.age = undefined;
      this.timeElement.ageRange = undefined;
      this.timeElement.gestationalAge = undefined;
      this.timeElement.ontologyClass = timeElement;
      this.timeElement.timestamp = undefined;
    } else if (typeof timeElement === 'string') {
      this.timeElement.age = undefined;
      this.timeElement.ageRange = undefined;
      this.timeElement.gestationalAge = undefined;
      this.timeElement.ontologyClass = undefined;
      // TODO check that timestamp is correct
      this.timeElement.timestamp = timeElement;
    } else {
      this.timeElement.age = undefined;
      this.timeElement.ageRange = undefined;
      this.timeElement.gestationalAge = undefined;
      this.timeElement.ontologyClass = undefined;
      this.timeElement.timestamp = undefined;
    }
    this.timeElementEvent.emit(this.timeElement);
  }
}
