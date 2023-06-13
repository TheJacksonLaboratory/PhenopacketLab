import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { OntologyClass, Procedure, TimeElement, TimeInterval } from 'src/app/models/base';
import { Disease } from 'src/app/models/disease';
import { Quantity } from 'src/app/models/measurement';
import { DoseInterval, DrugType, MedicalAction, RadiationTherapy, RegimenStatus, TherapeuticRegimen, Treatment } from 'src/app/models/medical-action';
import { OntologyTreeNode } from 'src/app/models/ontology-treenode';
import { MedicalActionService } from 'src/app/services/medical-action.search.service';
import { Utils } from '../../utils';

@Component({
  selector: 'app-medical-action-edit',
  templateUrl: './medical-action-edit.component.html',
  styleUrls: ['./medical-action-edit.component.scss']
})

export class MedicalActionEditComponent implements OnInit, OnDestroy {

  @Input()
  medicalAction: MedicalAction;
  @Input()
  diseases: Disease[];
  @Output()
  medicalActionChange = new EventEmitter<MedicalAction>();

  // action: any;
  treatmentTarget: OntologyClass;
  treatmentIntent: OntologyClass;
  responseToTreatment: OntologyClass;
  responseToTreatmentVal: string;
  terminationReason: OntologyClass;
  // procedure
  procedureCode: OntologyClass;
  performed: TimeElement;
  bodySite: OntologyClass;
  bodySitesStorageKey = 'body_sites';
  currSearchParams: any = {};
  // Treatment
  agent: OntologyClass;
  routeOfAdministration: OntologyClass;
  doseIntervals: DoseInterval[];
  drugType: DrugType;
  drugTypes = Object.values(DrugType);
  cumulativeDose: Quantity;
  // radiationtherapy
  modality: OntologyClass;
  radiationTherapyBodySites: OntologyClass[];
  dosage: number;
  fractions: number;
  // therapeutic regimen
  identifier: any;
  startTime: TimeElement;
  endTime: TimeElement;
  regimenStatuses = Object.values(RegimenStatus);
  regimenStatus: RegimenStatus;

  terminationReasonStr: string;

  actionTypes = [Procedure.actionName, Treatment.actionName, RadiationTherapy.actionName, TherapeuticRegimen.actionName];
  actionType: string;
  // We pull data from backend endpoint
  intents: OntologyClass[];
  intentsSubscription: Subscription;

  responses: OntologyClass[];
  responsesSubscription: Subscription;

  terminationReasons: OntologyClass[];
  terminationReasonsSubscription: Subscription;

  adverseEventNodes: OntologyTreeNode[];
  adverseEventsSubscription: Subscription;

  // Dose Intervals table
  doseIntervalVisible = false;
  clonedDoseIntervals: { [s: string]: DoseInterval } = {};

  valid: any = {};

  constructor(public medicalActionService: MedicalActionService, private messageService: MessageService) {
  }

  ngOnInit() {
    this.intentsSubscription = this.medicalActionService.getTreatmentIntents().subscribe(intents => {
      this.intents = intents;
    });
    this.responsesSubscription = this.medicalActionService.getTreatmentResponses().subscribe(responses => {
      this.responses = responses;
    });
    this.terminationReasonsSubscription = this.medicalActionService.getTerminationReasons().subscribe(reasons => {
      this.terminationReasons = reasons;
    });
    this.adverseEventsSubscription = this.medicalActionService.getAdverseEvents().subscribe(nodes => {
      // we get the children from the root node sent in response
      this.adverseEventNodes = <OntologyTreeNode[]>nodes.children;
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
  }

  updateMedicalAction() {
    if (this.medicalAction) {
      this.treatmentTarget = this.medicalAction.treatmentTarget;
      this.treatmentIntent = this.medicalAction.treatmentIntent;
      this.responseToTreatment = this.medicalAction.responseToTreatment;
      this.terminationReason = this.medicalAction.treatmentTerminationReason;
      this.responseToTreatmentVal = this.responseToTreatment?.label;
      if (this.medicalAction.procedure) {
        this.procedureCode = this.medicalAction.procedure.code;
        this.bodySite = this.medicalAction.procedure.bodySite;
        this.performed = this.medicalAction.procedure.performed;
        this.actionType = Procedure.actionName;
      } else if (this.medicalAction.treatment) {
        this.agent = this.medicalAction.treatment.agent;
        this.routeOfAdministration = this.medicalAction.treatment.routeOfAdministration;
        this.doseIntervals = this.medicalAction.treatment.doseIntervals;
        this.drugType = this.medicalAction.treatment.drugType;
        this.cumulativeDose = this.medicalAction.treatment.cumulativeDose;
        this.actionType = Treatment.actionName;
        if (this.doseIntervals && this.doseIntervals.length > 0) {
          this.doseIntervalVisible = true;
        }
      } else if (this.medicalAction.radiationTherapy) {
        this.modality = this.medicalAction.radiationTherapy.modality;
        this.bodySite = this.medicalAction.radiationTherapy.bodySite;
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

  updateTreatmentTarget(eventObj: any) {
    if (this.medicalAction) {
      // retrieve disease term from event obj
      this.medicalAction.treatmentTarget = eventObj.value?.term;
      this.medicalActionChange.emit(this.medicalAction);
    }
  }

  updateTreatmentIntent(eventObj: any) {
    if (this.medicalAction) {
      // retrieve intent from object
      this.medicalAction.treatmentIntent = eventObj.value;
      this.medicalActionChange.emit(this.medicalAction);
    }
  }

  updateTreatmentResponse(eventObj: any) {
    if (this.medicalAction) {
      this.medicalAction.responseToTreatment = eventObj.value;
      this.medicalActionChange.emit(this.medicalAction);
    }
  }

  updateTreatmentTerminationReason(eventObj: any) {
    if (this.medicalAction) {
      this.medicalAction.treatmentTerminationReason = eventObj.value;
      this.medicalActionChange.emit(this.medicalAction);
    }
  }

  updateAdverseEvents(event) {

  }

  onCancelClick(): void {
  }

  onOkClick() {
    return { 'medical_action': this.medicalAction };
  }

  changeProcedureCode(eventObj: OntologyClass) {
    this.procedureCode = eventObj;
    // update medicalAction
    if (this.medicalAction && this.medicalAction.procedure) {
      this.medicalAction.procedure.code = this.procedureCode;
      this.medicalActionChange.emit(this.medicalAction);
    }
  }
  changeAgent(eventObj: OntologyClass) {
    this.agent = eventObj;
    // update medicalAction
    if (this.medicalAction && this.medicalAction.treatment) {
      this.medicalAction.treatment.agent = this.agent;
      this.medicalActionChange.emit(this.medicalAction);
    }
  }
  changeRouteOfAdministration(eventObj: OntologyClass) {
    this.routeOfAdministration = eventObj;
    // update medicalAction
    if (this.medicalAction && this.medicalAction.treatment) {
      this.medicalAction.treatment.routeOfAdministration = this.routeOfAdministration;
      this.medicalActionChange.emit(this.medicalAction);
    }
  }

  /** Body site search/add */
  onSearchBodySiteChange(searchBodySite: any) {
    this.currSearchParams.offset = 0;
    const id = searchBodySite.selectedItems[0].selectedValue.id;
    const label = searchBodySite.selectedItems[0].selectedValue.name;
    this.bodySite = new OntologyClass(id, label);
    // push changes to medicalAction
    if (this.medicalAction && this.medicalAction.procedure) {
      this.medicalAction.procedure.bodySite = this.bodySite;
      this.medicalActionChange.emit(this.medicalAction);
    } else if (this.medicalAction.radiationTherapy) {
      this.medicalAction.radiationTherapy.bodySite = this.bodySite;
      this.medicalActionChange.emit(this.medicalAction);
    }
  }

  removeBodySite() {
    this.bodySite = undefined;
    if (this.medicalAction && this.medicalAction.procedure) {
      this.medicalAction.procedure.bodySite = this.bodySite;
      this.medicalActionChange.emit(this.medicalAction);
    } else if (this.medicalAction && this.medicalAction.radiationTherapy) {
      this.medicalAction.radiationTherapy.bodySite = this.bodySite;
      this.medicalActionChange.emit(this.medicalAction);
    }
  }

  /** end body site search */
  onDrugTypeChange(eventObj: any) {
    this.drugType = eventObj.value;
    // update medicalAction
    if (this.medicalAction && this.medicalAction.treatment) {
      this.medicalAction.treatment.drugType = this.drugType;
      this.medicalActionChange.emit(this.medicalAction);
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
  onDoseIntervalEditInit(doseInterval: DoseInterval) {
    this.clonedDoseIntervals[doseInterval.key] = { ...doseInterval };
}

onDoseIntervalEditSave(doseInterval: DoseInterval) {
    delete this.clonedDoseIntervals[doseInterval.key];
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Dose Interval is updated' });
}

onDoseIntervalEditCancel(doseInterval: DoseInterval, index: number) {
    this.medicalAction.treatment.doseIntervals[index] = this.clonedDoseIntervals[doseInterval.key];
    delete this.clonedDoseIntervals[doseInterval.key];
    this.medicalActionChange.emit(this.medicalAction);
}

  inputHandler(e: any, id: number, key: string) {
    if (!this.valid[id]) {
      this.valid[id] = {};
    }
    this.valid[id][key] = e.target.validity.valid;
  }

  disableSubmit(id: number) {
    if (this.valid[id]) {
      return Object.values(this.valid[id]).some((item) => item === false);
    }
    return false;
  }

  // RadiationTherapy
  changeModality(eventObj: OntologyClass) {
    this.modality = eventObj;
    // update medicalAction
    if (this.medicalAction && this.medicalAction.radiationTherapy) {
      this.medicalAction.radiationTherapy.modality = this.modality;
      this.medicalActionChange.emit(this.medicalAction);
    }
  }
  changeBodySite(eventObj: any) {
    this.bodySite = eventObj;
    // update medicalAction
    if (this.medicalAction && this.medicalAction.procedure) {
      this.medicalAction.procedure.bodySite = this.bodySite;
      this.medicalActionChange.emit(this.medicalAction);
    } else if (this.medicalAction.radiationTherapy) {
      this.medicalAction.radiationTherapy.bodySite = this.bodySite;
      this.medicalActionChange.emit(this.medicalAction);
    }
  }
  getBodySiteDisplay(bodySite: any) {
    if (bodySite) {
      return `${bodySite.name} [${bodySite.id}]`;
    }
    return '';
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
      this.medicalActionChange.emit(this.medicalAction);
    }
  }
  changeFractions(eventObj: number) {
    this.fractions = eventObj;
    // update medicalAction
    if (this.medicalAction && this.medicalAction.radiationTherapy) {
      this.medicalAction.radiationTherapy.fractions = this.fractions;
      this.medicalActionChange.emit(this.medicalAction);
    }
  }

  // Therapeutic regimen
  changeIdentifier(eventObj: any) {
    this.identifier = eventObj;
    // update medicalAction
    if (this.medicalAction && this.medicalAction.therapeuticRegimen) {
      this.medicalAction.therapeuticRegimen.identifier = this.identifier;
      this.medicalActionChange.emit(this.medicalAction);
    }
  }
  onRegimenStatusChange(eventObj: any) {
    this.regimenStatus = eventObj.value;
    // update medicalAction
    if (this.medicalAction && this.medicalAction.therapeuticRegimen) {
      this.medicalAction.therapeuticRegimen.regimenStatus = this.regimenStatus;
      this.medicalActionChange.emit(this.medicalAction);
    }
  }
}

