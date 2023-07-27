import {Component, OnDestroy, OnInit} from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { Utils } from 'src/app/component/shared/utils';
import { OntologyClass, Procedure, TimeElement, TimeInterval } from 'src/app/models/base';
import { Disease } from 'src/app/models/disease';
import { Quantity } from 'src/app/models/measurement';
import { DoseInterval, DrugType, MedicalAction, RadiationTherapy, RegimenStatus, TherapeuticRegimen, Treatment } from 'src/app/models/medical-action';
import { OntologyTreeNode } from 'src/app/models/ontology-treenode';
import { MedicalActionService } from 'src/app/services/medical-action.service';

@Component({
  selector: 'app-medical-action-dialog',
  templateUrl: './medical-action-dialog.component.html',
  styleUrls: ['./medical-action-dialog.component.scss']
})
export class MedicalActionDialogComponent implements OnInit, OnDestroy {

  medicalAction: MedicalAction;
  diseases: Disease[];

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

  constructor(public medicalActionService: MedicalActionService,
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
    this.terminationReasonsSubscription = this.medicalActionService.getTerminationReasons().subscribe(reasons => {
      this.terminationReasons = reasons;
    });
    this.adverseEventsSubscription = this.medicalActionService.getAdverseEvents().subscribe(nodes => {
      // we get the children from the root node sent in response
      if (nodes) {
        this.adverseEventNodes = <OntologyTreeNode[]>nodes.children;
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
    if (this.medicalAction) {
      this.medicalAction.treatmentTerminationReason = eventObj.value;
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
  changeAgent(eventObj: OntologyClass) {
    this.agent = eventObj;
    // update medicalAction
    if (this.medicalAction && this.medicalAction.treatment) {
      this.medicalAction.treatment.agent = this.agent;
    }
  }
  changeRouteOfAdministration(eventObj: OntologyClass) {
    this.routeOfAdministration = eventObj;
    // update medicalAction
    if (this.medicalAction && this.medicalAction.treatment) {
      this.medicalAction.treatment.routeOfAdministration = this.routeOfAdministration;
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
    } else if (this.medicalAction.radiationTherapy) {
      this.medicalAction.radiationTherapy.bodySite = this.bodySite;
    }
  }

  removeBodySite() {
    this.bodySite = undefined;
    if (this.medicalAction && this.medicalAction.procedure) {
      this.medicalAction.procedure.bodySite = this.bodySite;
    } else if (this.medicalAction && this.medicalAction.radiationTherapy) {
      this.medicalAction.radiationTherapy.bodySite = this.bodySite;
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
    }
  }
  changeBodySite(eventObj: any) {
    this.bodySite = eventObj;
    // update medicalAction
    if (this.medicalAction && this.medicalAction.procedure) {
      this.medicalAction.procedure.bodySite = this.bodySite;
    } else if (this.medicalAction.radiationTherapy) {
      this.medicalAction.radiationTherapy.bodySite = this.bodySite;
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
