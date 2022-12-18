import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Age, AgeRange, GestationalAge, OntologyClass, TimeElement, TimeElementId, TimeElementType } from 'src/app/models/base';
import { PhenopacketService } from 'src/app/services/phenopacket.service';
import { PhenotypeSearchService } from 'src/app/services/phenotype-search.service';
import { AgeComponent } from './age/age.component';

@Component({
  selector: 'app-time-element',
  templateUrl: './time-element.component.html',
  styleUrls: ['./time-element.component.scss']
})
export class TimeElementComponent implements OnInit, OnDestroy {

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

  // No need to show the Ontology class UI as anytime an ontology class is shown, we should just show a selection of
  // corresponding ontology classes
  timeElementTypes: string[];

  phenotypicOnsetSubscription: Subscription;
  phenotypicResolutionSubscription: Subscription;

  @ViewChild(AgeComponent) ageChild: AgeComponent;


  constructor(private phenotypeSearchService: PhenotypeSearchService, public phenopacketService: PhenopacketService) {

  }

  ngOnInit(): void {
    // if ontologyNodes are provided then we add the OntologyClass item in selection
    if (this.useOntologyClass) {
      this.timeElementTypes = ['Age', 'Age range', 'Gestational age', 'Ontology class'];
    } else {
      this.timeElementTypes = ['Age', 'Age range', 'Gestational age'];
    }
    console.log('time element ngInit');
    this.initialize();
    this.phenotypicOnsetSubscription = this.phenotypeSearchService.getPhenotypicOnset().subscribe(onset => {
      if (this.timeElementId === TimeElementId.PHENOTYPIC_ONSET) {
        console.log(onset);
        this.timeElement = onset;
        console.log('getPhenotypicOnset');
        this.initialize();
      }
    });
    this.phenotypicResolutionSubscription = this.phenotypeSearchService.getPhenotypicResolution().subscribe(resolution => {
      if (this.timeElementId === TimeElementId.PHENOTYPIC_RESOLUTION) {
        this.timeElement = resolution;
        console.log('getPhenotypicResolution');
        this.initialize();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.phenotypicOnsetSubscription) {
      this.phenotypicOnsetSubscription.unsubscribe();
    }
    if (this.phenotypicResolutionSubscription) {
      this.phenotypicResolutionSubscription.unsubscribe();
    }
  }

  onTimeElementChange(timeElementUpdate: TimeElement): void {
    this.timeElement = timeElementUpdate;
  }

  private initialize() {
    console.log('initialize');
    console.log(this.timeElement);
    if (this.timeElement === undefined) {
      this.timeElement = new TimeElement();
    }
    const element = this.timeElement?.element;

    if (element === undefined) {
      this.selectedAgeType = null;
    }
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
      this.ontologyClass = element;
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
    console.log('ageTypeChanged');
    console.log(this.timeElement);
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
    }
  }
  updateTimeElement(timeElement: any) {
    if (this.timeElement === undefined || this.timeElement === null) {
      this.timeElement = new TimeElement();
    }
    this.timeElement.element = timeElement;
    this.timeElementEvent.emit(this.timeElement);
  }
}
