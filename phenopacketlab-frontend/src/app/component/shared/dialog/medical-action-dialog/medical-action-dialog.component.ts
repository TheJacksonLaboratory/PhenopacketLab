import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Utils } from 'src/app/component/shared/utils';
import { OntologyClass, Procedure, TimeElement } from 'src/app/models/base';
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

  bodySiteSubscription: Subscription;
  bodySiteNodes: OntologyTreeNode[];
  // action: any;
  treatmentTargetSelected: OntologyClass;
  treatmentTargets: OntologyClass[];
  treatmentIntentSelected: any;
  responsesToTreatmentNodes: OntologyTreeNode[];
  responseToTreatmentSelected: OntologyTreeNode;
  // * procedure *
  proceduresNodes: OntologyTreeNode[];
  procedureSelected: OntologyTreeNode;
  proceduresSubscription: Subscription;
  ontologyClassTimeNodes: OntologyTreeNode[];
  ontologyClassTimeSubscription: Subscription;
  procedureBodySite: OntologyClass;
  bodySitesStorageKey = 'body_sites';
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
  radiationTherapyModalityNodes: OntologyTreeNode[];
  radiationTherapyModalitySelected: OntologyTreeNode;
  radiationTherapySubscription: Subscription;
  radiationTherapyBodySites: OntologyClass[];
  dosage: number;
  radiationTherapyBodySite: OntologyClass;
  fractions: number;
  // * therapeutic regimen *
  therapeuticRegimenIdentifiersNodes: OntologyTreeNode[];
  therapeuticRegimenIdentifierSelected: OntologyTreeNode;
  therapeuticRegimenIdentifierSubscription: Subscription;
  startTime: TimeElement;
  endTime: TimeElement;
  regimenStatuses = Object.values(RegimenStatus);
  regimenStatus: RegimenStatus;

  actionTypes = [Procedure.actionName, Treatment.actionName, RadiationTherapy.actionName, TherapeuticRegimen.actionName];
  actionType: string;

  treatmentIntents: any[];
  treatmentIntentsSubscription: Subscription;

  responses: OntologyClass[];
  responsesSubscription: Subscription;

  terminationReasonsNodes: OntologyTreeNode[];
  terminationReasonsSubscription: Subscription;
  terminationReasonSelected: OntologyTreeNode;

  adverseEventNodes: OntologyTreeNode[];
  adverseEventsSubscription: Subscription;

  valid: any = {};

  constructor(private medicalActionService: MedicalActionService,
    private constantsService: ConstantsService,
    private messageService: MessageService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig) {
    this.medicalAction = Utils.clone(config.data?.medicalAction);
    this.treatmentTargets = [];
    if (config.data?.diseases) {
      for (const disease of config.data?.diseases) {
        this.treatmentTargets.push(disease.term);
        // initialize selected target
        if (this.medicalAction.treatmentTarget?.id === disease.term.id) {
          this.treatmentTargetSelected = disease.term.id;
        }
      }
    }
  }

  ngOnInit() {
    this.treatmentIntentsSubscription = this.constantsService.getTreatmentIntents().subscribe(intents => {
      this.treatmentIntents = intents;
      // initialize selected intent
      if (intents) {
        for (const intent of intents) {
          if (this.medicalAction && this.medicalAction.treatmentIntent) {
            if (this.medicalAction.treatmentIntent.id === intent.id) {
              this.treatmentIntentSelected = intent;
            }
          }
        }
      }
    });
    this.responsesSubscription = this.constantsService.getResponsesToTreatment().subscribe(nodes => {
      if (nodes) {
        this.responsesToTreatmentNodes = <OntologyTreeNode[]>nodes.children;
        if (this.medicalAction && this.medicalAction.responseToTreatment) {
          this.responseToTreatmentSelected = OntologyTreeNode.getNodeWithKey(this.medicalAction.responseToTreatment.id,
            this.responsesToTreatmentNodes);
        }
      }
    });
    this.terminationReasonsSubscription = this.constantsService.getTerminationReasons().subscribe(nodes => {
      if (nodes) {
        this.terminationReasonsNodes = <OntologyTreeNode[]>nodes.children;
        if (this.medicalAction && this.medicalAction.treatmentTerminationReason) {
          this.terminationReasonSelected = OntologyTreeNode.getNodeWithKey(this.medicalAction.treatmentTerminationReason.id,
            this.terminationReasonsNodes);
        }
      }
    });
    this.proceduresSubscription = this.constantsService.getProcedures().subscribe(nodes => {
      if (nodes) {
        this.proceduresNodes = <OntologyTreeNode[]>nodes.children;
        if (this.medicalAction && this.medicalAction.procedure?.code) {
          this.procedureSelected = OntologyTreeNode.getNodeWithKey(this.medicalAction.procedure.code.id,
            this.proceduresNodes);
        }
      }
    });
    // get onsets
    this.ontologyClassTimeSubscription = this.constantsService.getOnsets().subscribe(nodes => {
      // we get the children from the root node sent in response
      if (nodes) {
        this.ontologyClassTimeNodes = <OntologyTreeNode[]>nodes.children;
      }
    });
    this.radiationTherapySubscription = this.constantsService.getRadiationTherapies().subscribe(nodes => {
      if (nodes) {
        this.radiationTherapyModalityNodes = <OntologyTreeNode[]>nodes.children;
        if (this.medicalAction && this.medicalAction.radiationTherapy?.modality) {
          this.radiationTherapyModalitySelected = OntologyTreeNode.getNodeWithKey(this.medicalAction.radiationTherapy.modality.id,
            this.radiationTherapyModalityNodes);
        }
      }
    });
    this.therapeuticRegimenIdentifierSubscription = this.constantsService.getTherapeuticRegimens().subscribe(nodes => {
      if (nodes) {
        this.therapeuticRegimenIdentifiersNodes = <OntologyTreeNode[]>nodes.children;
        if (this.medicalAction && this.medicalAction.therapeuticRegimen?.identifier) {
          this.therapeuticRegimenIdentifierSelected = OntologyTreeNode.getNodeWithKey(this.medicalAction.therapeuticRegimen.identifier.id,
            this.therapeuticRegimenIdentifiersNodes);
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
        if (this.medicalAction && this.medicalAction.treatment?.routeOfAdministration) {
          this.routeOfAdministrationSelected = OntologyTreeNode.getNodeWithKey(this.medicalAction.treatment.routeOfAdministration.id,
            this.routeOfAdministrationNodes);
        }
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
    if (this.treatmentIntentsSubscription) {
      this.treatmentIntentsSubscription.unsubscribe();
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
    if (this.proceduresSubscription) {
      this.proceduresSubscription.unsubscribe();
    }
    if (this.ontologyClassTimeSubscription) {
      this.ontologyClassTimeSubscription.unsubscribe();
    }
    if (this.radiationTherapySubscription) {
      this.radiationTherapySubscription.unsubscribe();
    }
    if (this.therapeuticRegimenIdentifierSubscription) {
      this.therapeuticRegimenIdentifierSubscription.unsubscribe();
    }
  }

  updateMedicalAction() {
    if (this.medicalAction) {
      this.treatmentTargetSelected = this.medicalAction.treatmentTarget;
      if (this.medicalAction.procedure) {
        this.procedureBodySite = this.medicalAction.procedure.bodySite;
        this.actionType = Procedure.actionName;
      } else if (this.medicalAction.treatment) {
        this.selectedChemicalEntity = this.medicalAction.treatment.agent;
        this.chemicalEntityItems = [this.selectedChemicalEntity];
        this.doseIntervals = this.medicalAction.treatment.doseIntervals;
        this.drugType = this.medicalAction.treatment.drugType;
        this.cumulativeDose = this.medicalAction.treatment.cumulativeDose;
        this.actionType = Treatment.actionName;
      } else if (this.medicalAction.radiationTherapy) {
        this.radiationTherapyBodySite = this.medicalAction.radiationTherapy.bodySite;
        this.dosage = this.medicalAction.radiationTherapy.dosage;
        this.fractions = this.medicalAction.radiationTherapy.fractions;
        this.actionType = RadiationTherapy.actionName;
      } else if (this.medicalAction.therapeuticRegimen) {
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
    } else if (this.actionType === undefined || this.actionType === null) {
      this.medicalAction.procedure = undefined;
      this.medicalAction.treatment = undefined;
      this.medicalAction.radiationTherapy = undefined;
      this.medicalAction.therapeuticRegimen = undefined;
    }
  }

  updateTreatmentTarget(treatmentTarget: OntologyClass) {
    if (this.medicalAction) {
      this.medicalAction.treatmentTarget = treatmentTarget;
    }
  }

  updateTreatmentIntent(treatmentIntent: any) {
    if (this.medicalAction) {
      if (treatmentIntent) {
        // retrieve intent from object
        this.medicalAction.treatmentIntent = new OntologyClass(treatmentIntent.id, treatmentIntent.lbl);
      } else {
        this.medicalAction.treatmentIntent = undefined;
      }
    }
  }

  updateTreatmentResponse(eventObj: any) {
    // treatment response is an OntologyTreeNode
    if (eventObj) {
      if (this.medicalAction && eventObj.node) {
        this.medicalAction.responseToTreatment = new OntologyClass(eventObj.node.key, eventObj.node.label);
      }
    } else {
      this.medicalAction.responseToTreatment = undefined;
    }
  }

  updateTreatmentTerminationReason(eventObj: any) {
    // treatment termination reason is an OntologyTreeNode
    if (eventObj) {
      if (this.medicalAction && eventObj.node) {
        this.medicalAction.treatmentTerminationReason = new OntologyClass(eventObj.node.key, eventObj.node.label);
      }
    } else {
      this.medicalAction.treatmentTerminationReason = undefined;
    }
  }

  updateAdverseEvents(nodeAdverseEvents: OntologyTreeNode[]) {
    if (this.medicalAction) {
      this.medicalAction.adverseEvents = OntologyTreeNode.toOntologyClass(nodeAdverseEvents);
      this.medicalAction.adverseEventNodes = [];
      for (const nodAdverse of nodeAdverseEvents) {
        this.medicalAction.adverseEventNodes.push(nodAdverse);
      }
    }
  }

  updateProcedureCode(eventObj) {
    // procedure code is an OntologyTreeNode
    if (eventObj) {
      if (this.medicalAction && this.medicalAction.procedure && eventObj.node) {
        this.medicalAction.procedure.code = new OntologyClass(eventObj.node.key, eventObj.node.label);
      }
    } else {
      this.medicalAction.procedure.code = undefined;
    }
  }
  updateProcedurePerformedOn(timeElement) {
    if (this.medicalAction && this.medicalAction.procedure) {
      this.medicalAction.procedure.performed = timeElement;
    }
  }
  // chemical entity
  updateChemicalEntity(chemicalEntity: OntologyClass) {
    if (this.medicalAction?.treatment) {
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

  hasValidChemicalEntityInput(qString: string) {
    return (qString && qString.length >= 3);
  }

  updateRouteOfAdministration(eventObj) {
    if (this.medicalAction?.treatment) {
      if (eventObj) {
        this.medicalAction.treatment.routeOfAdministration = new OntologyClass(eventObj.node.key,
                                                                              eventObj.node.label,
                                                                              eventObj.node.key,
                                                                              Utils.getUrlForId(eventObj.node.key));
      } else {
        this.medicalAction.treatment.routeOfAdministration = undefined;
      }
    }
  }

  updateProcedureBodySite(eventObj) {
    if (this.medicalAction?.procedure) {
      if (eventObj) {
        this.medicalAction.procedure.bodySite = new OntologyClass(eventObj.node.key,
                                                                  eventObj.node.label,
                                                                  eventObj.node.key,
                                                                  Utils.getUrlForId(eventObj.node.key));
      } else {
        this.medicalAction.procedure.bodySite = undefined;
      }
    }
  }

  updateRadiationTherapyBodySite(eventObj) {
    if (this.medicalAction?.radiationTherapy) {
      if (eventObj) {
        this.medicalAction.radiationTherapy.bodySite = new OntologyClass(eventObj.node.key,
                                                                         eventObj.node.label,
                                                                         eventObj.node.key,
                                                                         Utils.getUrlForId(eventObj.node.key));
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
    if (this.doseIntervals === undefined) {
      this.doseIntervals = [];
    }
    doseInterval.key = Utils.getBiggestKey(this.doseIntervals) + 1;
    this.doseIntervals.push(doseInterval);
    if (this.medicalAction.treatment) {
      this.medicalAction.treatment.doseIntervals = this.doseIntervals;
    }
  }

  deleteDoseInterval(doseInterval: DoseInterval) {
    this.doseIntervals = this.doseIntervals.filter(val => val.key !== doseInterval.key);
  }
  updateScheduleFrequency(eventObj, doseInterval: DoseInterval) {
    if (this.medicalAction?.treatment) {
      if (eventObj) {
        doseInterval.scheduleFrequency = new OntologyClass(eventObj.node.key, eventObj.node.label, eventObj.node.key, Utils.getUrlForId(eventObj.node.key));
      } else {
        doseInterval.scheduleFrequency = undefined;
      }
    }
  }

  updateDoseIntervalQuantity(quantity: Quantity, doseInterval: DoseInterval) {
    if (doseInterval) {
      doseInterval.quantity = quantity;
    }
  }
  updateDoseIntervalTimeInterval(interval, doseInterval: DoseInterval) {
    doseInterval.interval = interval;
  }
  updateCumulativeDoseQuantity(quantity: Quantity) {
    if (this.medicalAction.treatment) {
      console.log(quantity);
      this.medicalAction.treatment.cumulativeDose = quantity;
    }
  }

  // RadiationTherapy
  updateRadiationTherapyModality(eventObj) {
    if (eventObj) {
      this.radiationTherapyModalitySelected = eventObj.node;
      if (this.medicalAction && this.medicalAction.radiationTherapy && eventObj.node) {
        this.medicalAction.radiationTherapy.modality = new OntologyClass(eventObj.node.key, eventObj.node.label);
      }
    } else {
      this.medicalAction.radiationTherapy.modality = undefined;
    }
  }

  updateDosage(dosage) {
    this.dosage = dosage;
    // update medicalAction
    if (this.medicalAction && this.medicalAction.radiationTherapy) {
      this.medicalAction.radiationTherapy.dosage = this.dosage;
    }
  }
  updateFractions(fractions) {
    this.fractions = fractions;
    // update medicalAction
    if (this.medicalAction && this.medicalAction.radiationTherapy) {
      this.medicalAction.radiationTherapy.fractions = this.fractions;
    }
  }

  // Therapeutic regimen
  updateTherapeuticRegimenIdentifier(eventObj) {
    if (eventObj) {
      this.therapeuticRegimenIdentifierSelected = eventObj.node;
      if (this.medicalAction && this.medicalAction.therapeuticRegimen && eventObj.node) {
        this.medicalAction.therapeuticRegimen.identifier = new OntologyClass(eventObj.node.key, eventObj.node.label);
      }
    } else {
      this.medicalAction.therapeuticRegimen.identifier = undefined;
    }
  }
  onRegimenStatusChange(eventObj: any) {
    this.regimenStatus = eventObj.value;
    // update medicalAction
    if (this.medicalAction && this.medicalAction.therapeuticRegimen) {
      this.medicalAction.therapeuticRegimen.regimenStatus = this.regimenStatus;
    }
  }
  updateStartTime(startTime) {
    if (this.medicalAction && this.medicalAction.therapeuticRegimen) {
      this.medicalAction.therapeuticRegimen.startTime = startTime;
    }
  }
  updateEndTime(endTime) {
    if (this.medicalAction && this.medicalAction.therapeuticRegimen) {
      this.medicalAction.therapeuticRegimen.endTime = endTime;
    }
  }

  onCancelClick(): void {
    this.ref.close();
  }

  onOkClick() {
    if (this.medicalAction) {
      // procedure
      if (this.medicalAction.procedure) {
        if (this.medicalAction.procedure.code === undefined || this.medicalAction.procedure.code === null) {
          this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: `Please select a code for the procedure.` });
          return;
        }
      }
      // treatment
      if (this.medicalAction.treatment) {
        if (this.medicalAction.treatment.agent === undefined || this.medicalAction.treatment.agent === null) {
          this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: `Please select an agent for the treatment.` });
          return;
        }
        if (this.medicalAction.treatment.doseIntervals) {
          for (const interval of this.medicalAction.treatment.doseIntervals) {
            if (interval.quantity === undefined || interval.quantity === null) {
              this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: `Please select a quantity for the dose interval.` });
              return;
            }
            if (interval.quantity) {
              if (interval.quantity.unit === undefined || interval.quantity.unit === null) {
                this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: `Please select a unit for the quantity.` });
                return;
              }
              if (interval.quantity.value === undefined || interval.quantity.value === null) {
                this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: `Please set a value for quantity.` });
                return;
              }
            }
            if (interval.scheduleFrequency === undefined || interval.scheduleFrequency === null) {
              this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: `Please select a schedule frequency for the dose interval.` });
              return;
            }
            if (interval.interval === undefined || interval.interval === null) {
              this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: `Please set an interval for the dose interval.` });
              return;
            }
            if (interval.interval) {
              if (interval.interval.start === undefined || interval.interval.start === null) {
                this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: `Please set a start timestamp for the interval.` });
                return;
              }
              if (interval.interval.end === undefined || interval.interval.end === null) {
                this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: `Please set an end timestamp for the interval.` });
                return;
              }
            }
          }
        }
      }
      // radiation therapy
      if (this.medicalAction.radiationTherapy) {
        if (this.medicalAction.radiationTherapy.modality === undefined || this.medicalAction.radiationTherapy.modality === null) {
          this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: `Please select a modality for the radiation therapy.` });
          return;
        }
        if (this.medicalAction.radiationTherapy.bodySite === undefined || this.medicalAction.radiationTherapy.bodySite === null) {
          this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: `Please select a body site for the radiation therapy.` });
          return;
        }
        if (this.medicalAction.radiationTherapy.dosage === undefined || this.medicalAction.radiationTherapy.dosage === null) {
          this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: `Please select a dosage for the radiation therapy.` });
          return;
        }
        if (this.medicalAction.radiationTherapy.fractions === undefined || this.medicalAction.radiationTherapy.fractions === null) {
          this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: `Please select a fraction for dosage of the radiation therapy.` });
          return;
        }
      }
      // therapeutic regimen
      if (this.medicalAction.therapeuticRegimen) {
        if (this.medicalAction.therapeuticRegimen.identifier === undefined || this.medicalAction.therapeuticRegimen.identifier === null) {
          this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: `Please select an identifier for the therapeutic regimen.` });
          return;
        }
        if (this.medicalAction.therapeuticRegimen.regimenStatus === undefined || this.medicalAction.therapeuticRegimen.regimenStatus === null) {
          this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: `Please select a status for the therapeutic regimen.` });
          return;
        }
      }
      if (this.medicalAction.treatment === undefined
        && this.medicalAction.procedure === undefined
        && this.medicalAction.radiationTherapy === undefined
        && this.medicalAction.therapeuticRegimen === undefined) {
        this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: `Please select an action type.` });
        return;
      }
    }

    this.ref.close(this.medicalAction);
  }
}
