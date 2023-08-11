import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Utils } from 'src/app/component/shared/utils';
import { OntologyClass, Procedure, TimeElement, TimeInterval } from 'src/app/models/base';
import { Disease } from 'src/app/models/disease';
import { Quantity } from 'src/app/models/measurement';
import { DoseInterval, DrugType, MedicalAction, RadiationTherapy, RegimenStatus, TherapeuticRegimen, Treatment } from 'src/app/models/medical-action';
import { OntologyTreeNode } from 'src/app/models/ontology-treenode';
import { ConstantsService } from 'src/app/services/constants.service';
import { MedicalActionService } from 'src/app/services/medical-action.service';

@Component({
  selector: 'app-medical-action-dialog',
  templateUrl: './medical-action-dialog.component.html',
  styleUrls: ['./medical-action-dialog.component.scss']
})
export class MedicalActionDialogComponent implements OnInit, OnDestroy {

  medicalAction: MedicalAction;
  diseases: Disease[];

  bodySiteSubscription: Subscription;
  bodySiteNodes: OntologyTreeNode[];
  // action: any;
  treatmentTarget: OntologyClass;
  treatmentIntent: OntologyClass;
  responseToTreatment: OntologyClass;
  responseToTreatmentVal: string;
  terminationReason: OntologyClass;
  // * procedure *
  procedureCode: OntologyClass;
  performed: TimeElement;
  procedureBodySite: OntologyClass;
  bodySitesStorageKey = 'body_sites';
  currSearchParams: any = {};
  // * Treatment *
  // Agent = chemical entity
  chemicalEntityItems: OntologyClass[];
  chemicalEntityItemsCount: number;
  chemicalEntitySearchstate = 'inactive';
  chemicalEntityQuery = new Subject();
  chemicalEntityQueryText: string;
  chemicalEntityNotFoundFlag = false;
  loadingChemicalEntitySearchResults = false;
  selectedChemicalEntity: OntologyClass;
  routeOfAdministrationNodes: OntologyTreeNode[];
  routeOfAdministrationSubscription: Subscription;
  routeOfAdministrationSelected: OntologyTreeNode;
  doseIntervals: DoseInterval[];
  scheduleFrequencySubscription: Subscription;
  scheduleFrequencyNodes: OntologyTreeNode[];
  drugType: DrugType;
  drugTypes = Object.values(DrugType);
  cumulativeDose: Quantity;
  // * radiationtherapy *
  modality: OntologyClass;
  radiationTherapyBodySites: OntologyClass[];
  dosage: number;
  radiationTherapyBodySite: OntologyClass;
  fractions: number;
  // * therapeutic regimen *
  identifier: any;
  startTime: TimeElement;
  endTime: TimeElement;
  regimenStatuses = Object.values(RegimenStatus);
  regimenStatus: RegimenStatus;

  actionTypes = [Procedure.actionName, Treatment.actionName, RadiationTherapy.actionName, TherapeuticRegimen.actionName];
  actionType: string;
  // We pull data from backend endpoint
  intents: OntologyClass[];
  intentsSubscription: Subscription;

  responses: OntologyClass[];
  responsesSubscription: Subscription;

  terminationReasonsNodes: OntologyTreeNode[];
  terminationReasonsSubscription: Subscription;
  terminationReasonSelected: OntologyTreeNode;

  adverseEventNodes: OntologyTreeNode[];
  adverseEventsSubscription: Subscription;

  // Dose Intervals table
  doseIntervalVisible = false;
  clonedDoseIntervals: { [s: string]: DoseInterval } = {};

  valid: any = {};

  constructor(private medicalActionService: MedicalActionService,
    private constantsService: ConstantsService,
    private messageService: MessageService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig) {
    this.medicalAction = config.data?.medicalAction;
    this.diseases = config.data?.diseases;
  }

  ngOnInit() {
    this.intentsSubscription = this.medicalActionService.getTreatmentIntents().subscribe(intents => {
      this.intents = intents;
    });
    this.responsesSubscription = this.medicalActionService.getTreatmentResponses().subscribe(responses => {
      this.responses = responses;
    });
    this.terminationReasonsSubscription = this.constantsService.getTerminationReasons().subscribe(nodes => {
      if (nodes) {
        this.terminationReasonsNodes = <OntologyTreeNode[]>nodes.children;
        if (this.medicalAction && this.medicalAction.treatmentTerminationReason) {
          this.terminationReasonSelected = this.initializeTerminationReason(this.medicalAction.treatmentTerminationReason);
        }
      }
    });
    this.adverseEventsSubscription = this.constantsService.getAdverseEvents().subscribe(nodes => {
      // we get the children from the root node sent in response
      if (nodes) {
        this.adverseEventNodes = <OntologyTreeNode[]>nodes.children;
      }
    });
    // get chemical entities
    this.chemicalEntityQuery.pipe(debounceTime(425),
      distinctUntilChanged()).subscribe((val: string) => {
        if (this.hasValidChemicalEntityInput(val)) {
          this.loadingChemicalEntitySearchResults = true;
          this.chemicalEntityQueryText = val;
          this.medicalActionService.searchChemicalEntities(val).subscribe((data) => {
            this.chemicalEntityItems = [];
            for (const concept of data.foundConcepts) {
              this.chemicalEntityItems.push(new OntologyClass(concept.id, concept.lbl, concept.id));
            }
            this.chemicalEntityItemsCount = data.numberOfTerms;
            this.chemicalEntityNotFoundFlag = (this.chemicalEntityItemsCount === 0);
            this.chemicalEntitySearchstate = 'active';
          }, (error) => {
            console.log(error);
            this.loadingChemicalEntitySearchResults = false;
          }, () => {
            this.loadingChemicalEntitySearchResults = false;
          });

        } else {
          this.chemicalEntitySearchstate = 'inactive';
        }
      });
    this.routeOfAdministrationSubscription = this.constantsService.getRoutesOfAdministration().subscribe(nodes => {
      if (nodes) {
        this.routeOfAdministrationNodes = <OntologyTreeNode[]>nodes.children;
      }
    });
    this.scheduleFrequencySubscription = this.constantsService.getScheduleFrequencies().subscribe(nodes => {
      if (nodes) {
        this.scheduleFrequencyNodes = <OntologyTreeNode[]>nodes.children;
      }
    });
    this.bodySiteSubscription = this.constantsService.getBodySites().subscribe(nodes => {
      if (nodes) {
        this.bodySiteNodes = <OntologyTreeNode[]>nodes.children;
      }
    });

    this.updateMedicalAction();

    // bodySite filter for RadiationTherapy
    this.radiationTherapyBodySites = this.medicalActionService.getAllFromLocalStorage(this.bodySitesStorageKey);


  }

  ngOnDestroy() {
    if (this.intentsSubscription) {
      this.intentsSubscription.unsubscribe();
    }
    if (this.responsesSubscription) {
      this.responsesSubscription.unsubscribe();
    }
    if (this.terminationReasonsSubscription) {
      this.terminationReasonsSubscription.unsubscribe();
    }
    if (this.adverseEventsSubscription) {
      this.adverseEventsSubscription.unsubscribe();
    }
    if (this.routeOfAdministrationSubscription) {
      this.routeOfAdministrationSubscription.unsubscribe();
    }
    if (this.scheduleFrequencySubscription) {
      this.scheduleFrequencySubscription.unsubscribe();
    }
    if (this.bodySiteSubscription) {
      this.bodySiteSubscription.unsubscribe();
    }
  }

  updateMedicalAction() {
    if (this.medicalAction) {
      this.treatmentTarget = this.medicalAction.treatmentTarget;
      this.treatmentIntent = this.medicalAction.treatmentIntent;
      this.responseToTreatment = this.medicalAction.responseToTreatment;
      this.responseToTreatmentVal = this.responseToTreatment?.label;
      if (this.medicalAction.procedure) {
        this.procedureCode = this.medicalAction.procedure.code;
        this.procedureBodySite = this.medicalAction.procedure.bodySite;
        this.performed = this.medicalAction.procedure.performed;
        this.actionType = Procedure.actionName;
      } else if (this.medicalAction.treatment) {
        this.selectedChemicalEntity = this.medicalAction.treatment.agent;
        this.chemicalEntityItems = [this.selectedChemicalEntity];
        this.routeOfAdministrationSelected = this.initializeRouteOfAdministrationSelected(
            this.medicalAction.treatment.routeOfAdministration);
        this.doseIntervals = this.medicalAction.treatment.doseIntervals;
        this.drugType = this.medicalAction.treatment.drugType;
        this.cumulativeDose = this.medicalAction.treatment.cumulativeDose;
        this.actionType = Treatment.actionName;
        if (this.doseIntervals && this.doseIntervals.length > 0) {
          this.doseIntervalVisible = true;
        }
      } else if (this.medicalAction.radiationTherapy) {
        this.modality = this.medicalAction.radiationTherapy.modality;
        this.radiationTherapyBodySite = this.medicalAction.radiationTherapy.bodySite;
        this.dosage = this.medicalAction.radiationTherapy.dosage;
        this.fractions = this.medicalAction.radiationTherapy.fractions;
        this.actionType = RadiationTherapy.actionName;
      } else if (this.medicalAction.therapeuticRegimen) {
        this.identifier = this.medicalAction.therapeuticRegimen.identifier;
        this.startTime = this.medicalAction.therapeuticRegimen.startTime;
        this.endTime = this.medicalAction.therapeuticRegimen.endTime;
        this.regimenStatus = this.medicalAction.therapeuticRegimen.regimenStatus;
        this.actionType = TherapeuticRegimen.actionName;
      }
    } else {
      this.medicalAction = new MedicalAction();
    }
  }

  updateActionType(event: any) {
    this.actionType = event.value;
    if (this.actionType === Procedure.actionName) {
      this.medicalAction.procedure = new Procedure();
      this.medicalAction.treatment = undefined;
      this.medicalAction.radiationTherapy = undefined;
      this.medicalAction.therapeuticRegimen = undefined;
    } else if (this.actionType === Treatment.actionName) {
      this.medicalAction.procedure = undefined;
      this.medicalAction.treatment = new Treatment();
      this.medicalAction.radiationTherapy = undefined;
      this.medicalAction.therapeuticRegimen = undefined;
    } else if (this.actionType === RadiationTherapy.actionName) {
      this.medicalAction.procedure = undefined;
      this.medicalAction.treatment = undefined;
      this.medicalAction.radiationTherapy = new RadiationTherapy();
      this.medicalAction.therapeuticRegimen = undefined;
    } else if (this.actionType === TherapeuticRegimen.actionName) {
      this.medicalAction.procedure = undefined;
      this.medicalAction.treatment = undefined;
      this.medicalAction.radiationTherapy = undefined;
      this.medicalAction.therapeuticRegimen = new TherapeuticRegimen();
    }
  }

  initializeTerminationReason(terminationReason: OntologyClass) {
    for (const reason of this.terminationReasonsNodes) {
      if (reason.key === terminationReason.id) {
        return reason;
      }
    }
  }

  updateTreatmentTarget(eventObj: any) {
    if (this.medicalAction) {
      // retrieve disease term from event obj
      this.medicalAction.treatmentTarget = eventObj.value?.term;
    }
  }

  updateTreatmentIntent(eventObj: any) {
    if (this.medicalAction) {
      // retrieve intent from object
      this.medicalAction.treatmentIntent = eventObj.value;
    }
  }

  updateTreatmentResponse(eventObj: any) {
    if (this.medicalAction) {
      this.medicalAction.responseToTreatment = eventObj.value;
    }
  }

  updateTreatmentTerminationReason(eventObj: any) {
    if (eventObj) {
      if (this.medicalAction && eventObj.node) {
        this.medicalAction.treatmentTerminationReason = new OntologyClass(eventObj.node.key, eventObj.node.label);
      }
    } else {
      this.medicalAction.treatmentTerminationReason = undefined;
    } 
  }

  updateAdverseEvents(event) {

  }

  changeProcedureCode(eventObj: OntologyClass) {
    this.procedureCode = eventObj;
    // update medicalAction
    if (this.medicalAction && this.medicalAction.procedure) {
      this.medicalAction.procedure.code = this.procedureCode;
    }
  }
  // chemical entity
  updateChemicalEntity(chemicalEntity: any) {
    if (this.medicalAction?.treatment?.agent) {
      if (chemicalEntity) {
        if (this.chemicalEntitySearchstate === 'active') {
          this.chemicalEntitySearchstate = 'inactive';
        }
        this.selectedChemicalEntity = chemicalEntity;
        chemicalEntity.termUrl = Utils.getUrlForId(chemicalEntity.id);
        this.medicalAction.treatment.agent = chemicalEntity;
      } else {
        this.medicalAction.treatment.agent = undefined;
      }
    }
  }
  chemicalEntityContentChanging(input: string) {
    this.chemicalEntityQuery.next(input);
  }
  chemicalEntityItemSelected(item: any) {
    if (item) {
      if (this.medicalAction && this.medicalAction.treatment) {
        this.medicalAction.treatment.agent = new OntologyClass(item.id, item.lbl);
      }
    }
  }
  hasValidChemicalEntityInput(qString: string) {
    return (qString && qString.length >= 3);
  }

  initializeRouteOfAdministrationSelected(route: OntologyClass) {
    // update when a route is selected
    if (route === undefined) {
      return;
    }
    const treeNode = new OntologyTreeNode();
    treeNode.key = route.id;
    treeNode.label = route.label;
    return treeNode;
  }
  updateRouteOfAdministration(eventObj) {
    if (this.medicalAction?.treatment) {
      if (eventObj) {
        const route = new OntologyClass(eventObj.node.key, eventObj.node.label);
        const id = eventObj.node.key.split(':')[1];
        route.termUrl = `http://purl.obolibrary.org/obo/NCIT_${id}`;
        this.medicalAction.treatment.routeOfAdministration = route;
      } else {
        this.medicalAction.treatment.routeOfAdministration = undefined;
      }
    }
  }

  updateProcedureBodySite(eventObj) {
    if (this.medicalAction?.procedure) {
      if (eventObj) {
        const bodySite = new OntologyClass(eventObj.node.key, eventObj.node.label);
        const id = eventObj.node.key.split(':')[1];
        bodySite.termUrl = `http://purl.obolibrary.org/obo/NCIT_${id}`;
        this.medicalAction.procedure.bodySite = bodySite;
      } else {
        this.medicalAction.procedure.bodySite = undefined;
      }
    }
  }

  updateRadiationTherapyBodySite(eventObj) {
    if (this.medicalAction?.radiationTherapy) {
      if (eventObj) {
        const bodySite = new OntologyClass(eventObj.node.key, eventObj.node.label);
        const id = eventObj.node.key.split(':')[1];
        bodySite.termUrl = `http://purl.obolibrary.org/obo/NCIT_${id}`;
        this.medicalAction.radiationTherapy.bodySite = bodySite;
      } else {
        this.medicalAction.radiationTherapy.bodySite = undefined;
      }
    }
  }

  /** end body site search */
  onDrugTypeChange(eventObj: any) {
    this.drugType = eventObj.value;
    // update medicalAction
    if (this.medicalAction && this.medicalAction.treatment) {
      this.medicalAction.treatment.drugType = this.drugType;
    }
  }

  addDoseInterval() {
    const doseInterval = new DoseInterval();
    doseInterval.key = Utils.getBiggestKey(this.doseIntervals) + 1;
    doseInterval.interval = new TimeInterval();
    doseInterval.quantity = new Quantity();
    doseInterval.scheduleFrequency = new OntologyClass();
    this.doseIntervals.push(doseInterval);
    this.doseIntervalVisible = true;
  }

  deleteDoseInterval(doseInterval: DoseInterval) {
    this.doseIntervals = this.doseIntervals.filter(val => val.key !== doseInterval.key);
    if (this.doseIntervals.length === 0) {
      this.doseIntervalVisible = false;
    }
  }
  updateScheduleFrequency(eventObj, doseInterval: DoseInterval) {
    if (this.medicalAction?.treatment) {
      if (eventObj) {
        const id = eventObj.node.key.split(':')[1];
        doseInterval.scheduleFrequency = new OntologyClass(eventObj.node.key, eventObj.node.label, eventObj.node.key, `http://purl.obolibrary.org/obo/NCIT_${id}`);
      } else {
        doseInterval.scheduleFrequency = undefined;
      }
    }
  }

  updateQuantity(quantity: Quantity, doseInterval: DoseInterval) {
    if (doseInterval) {
      doseInterval.quantity = quantity;
    }
  }

  // RadiationTherapy
  changeModality(eventObj: OntologyClass) {
    this.modality = eventObj;
    // update medicalAction
    if (this.medicalAction && this.medicalAction.radiationTherapy) {
      this.medicalAction.radiationTherapy.modality = this.modality;
    }
  }

  private _filter(value: any): OntologyClass[] {
    const filterValue = value.toLowerCase();

    return this.radiationTherapyBodySites.filter(option => {
      return (option as any).name.toLowerCase().includes(filterValue);
    });
  }

  changeDosage(eventObj: number) {
    this.dosage = eventObj;
    // update medicalAction
    if (this.medicalAction && this.medicalAction.radiationTherapy) {
      this.medicalAction.radiationTherapy.dosage = this.dosage;
    }
  }
  changeFractions(eventObj: number) {
    this.fractions = eventObj;
    // update medicalAction
    if (this.medicalAction && this.medicalAction.radiationTherapy) {
      this.medicalAction.radiationTherapy.fractions = this.fractions;
    }
  }

  // Therapeutic regimen
  changeIdentifier(eventObj: any) {
    this.identifier = eventObj;
    // update medicalAction
    if (this.medicalAction && this.medicalAction.therapeuticRegimen) {
      this.medicalAction.therapeuticRegimen.identifier = this.identifier;
    }
  }
  onRegimenStatusChange(eventObj: any) {
    this.regimenStatus = eventObj.value;
    // update medicalAction
    if (this.medicalAction && this.medicalAction.therapeuticRegimen) {
      this.medicalAction.therapeuticRegimen.regimenStatus = this.regimenStatus;
    }
  }

  onCancelClick(): void {
    this.ref.close();
  }

  onOkClick() {
    this.ref.close(this.medicalAction);
  }
}
