import { Component, Input, OnInit } from '@angular/core';
import { ExternalReference, OntologyClass, Procedure, TimeElement } from 'src/app/models/base';
import { Disease } from 'src/app/models/disease';
import { Quantity } from 'src/app/models/measurement';
import { DoseInterval, DrugType, MedicalAction, RadiationTherapy, RegimenStatus, TherapeuticRegimen, Treatment } from 'src/app/models/medical-action';

@Component({
  selector: 'app-medical-action-detail',
  templateUrl: './medical-action-detail.component.html',
  styleUrls: ['./medical-action-detail.component.scss']
})

export class MedicalActionDetailComponent implements OnInit {

  @Input()
  medicalAction: MedicalAction;
  @Input()
  diseases: Disease[];

  treatmentTarget: OntologyClass;
  treatmentIntent: OntologyClass;
  responseToTreatment: OntologyClass;
  terminationReason: OntologyClass;
  // procedure
  procedureCode: OntologyClass;
  performed: TimeElement;
  // Treatment
  agent: OntologyClass;
  routeOfAdministration: OntologyClass;
  doseIntervals: DoseInterval[] = [];
  drugType: DrugType;
  cumulativeDose: Quantity;
  // radiationtherapy
  modality: OntologyClass;
  bodySite: OntologyClass;
  dosage: number;
  fractions: number;
  // therapeutic regimen
  identifier: OntologyClass | ExternalReference;
  startTime: TimeElement;
  endTime: TimeElement;
  regimenStatus: RegimenStatus;

  actionType: string;

  constructor() { }

  ngOnInit() {
    this.updateMedicalActionAction();
  }

  updateMedicalActionAction() {
    if (this.medicalAction) {

      this.treatmentTarget = this.medicalAction.treatmentTarget;
      this.treatmentIntent = this.medicalAction.treatmentIntent;
      this.responseToTreatment = this.medicalAction.responseToTreatment;
      this.terminationReason = this.medicalAction.treatmentTerminationReason;
      if (this.medicalAction.procedure) {
        this.actionType = Procedure.actionName;
        this.procedureCode = this.medicalAction.procedure.code;
        this.bodySite = this.medicalAction.procedure.bodySite;
        this.performed = this.medicalAction.procedure.performed;
      } else if (this.medicalAction.treatment) {
        this.actionType = Treatment.actionName;
        this.agent = this.medicalAction.treatment.agent;
        this.routeOfAdministration = this.medicalAction.treatment.routeOfAdministration;
        this.doseIntervals = this.medicalAction.treatment.doseIntervals;
        this.drugType = this.medicalAction.treatment.drugType;
        this.cumulativeDose = this.medicalAction.treatment.cumulativeDose;
      } else if (this.medicalAction.radiationTherapy) {
        this.actionType = RadiationTherapy.actionName;
        this.modality = this.medicalAction.radiationTherapy.modality;
        this.bodySite = this.medicalAction.radiationTherapy.bodySite;
        this.dosage = this.medicalAction.radiationTherapy.dosage;
        this.fractions = this.medicalAction.radiationTherapy.fractions;
      } else if (this.medicalAction.therapeuticRegimen) {
        this.actionType = TherapeuticRegimen.actionName;
        this.identifier = this.medicalAction.therapeuticRegimen.identifier;
        this.startTime = this.medicalAction.therapeuticRegimen.startTime;
        this.endTime = this.medicalAction.therapeuticRegimen.endTime;
        this.regimenStatus = this.medicalAction.therapeuticRegimen.regimenStatus;
      }

    }

  }

  getIdentifier() {
    if (this.identifier) {
      if ((this.identifier as OntologyClass).label) {
        return `${(this.identifier as OntologyClass).label} [${this.identifier.id}]`;
      } else if ((this.identifier as ExternalReference).reference) {
        return `${(this.identifier as ExternalReference).reference} [${this.identifier.id}]`;
      }
    }
    return '';
  }


}
