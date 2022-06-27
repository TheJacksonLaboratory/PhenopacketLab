import { Component, Inject, Input, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { ExternalReference, OntologyClass, Procedure, TimeElement } from 'src/app/models/base';
import { Disease } from 'src/app/models/disease';
import { Quantity } from 'src/app/models/measurement';
import { DoseInterval, DrugType, MedicalAction, RadiationTherapy, RegimenStatus, TherapeuticRegimen, Treatment } from 'src/app/models/medical-action';

@Component({
  selector: 'app-medical-action-detail-dialog',
  templateUrl: './medical-action-detail-dialog.component.html',
  styleUrls: ['./medical-action-detail-dialog.component.scss']
})

export class MedicalActionDetailDialogComponent {

  action: Procedure | Treatment | RadiationTherapy | TherapeuticRegimen;
  treatmentTarget: OntologyClass;
  treatmentIntent: OntologyClass;
  responseToTreatment: OntologyClass;
  terminationReason: OntologyClass;
  // procedure
  procedureCode: OntologyClass;
  bodySites: OntologyClass[];
  performedOn: TimeElement[];
  // Treatment
  agent: OntologyClass;
  routeOfAdministration: OntologyClass;
  doseIntervals: DoseInterval[];
  drugType: DrugType;
  cumulativeDose: Quantity;
  // radiationtherapy
  modality: OntologyClass;
  bodySite: OntologyClass;
  dosage: number;
  fractions: number;
  // therapeutic regimen
  identifier: OntologyClass | ExternalReference;;
  startTime: TimeElement;
  endTime: TimeElement;
  regimenStatus: RegimenStatus;

  medicalAction: MedicalAction;
  diseases: Disease[];
  selectedDisease: Disease;
  terminationReasonStr: string;
  actionTypeControl = new FormControl('', Validators.required);
  actionTypes = ["Procedure", "Treatment", "Radiation therapy", "Therapeutic regimen"];
  actionType: string;
  // TODO pull data from backend endpoint
  intents = ["Intent 1", "Intent 2", "Intent 3"];
  responses = ["Response 1", "Response 2", "Response 3"];

  constructor(public dialogRef: MatDialogRef<MedicalActionDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.medicalAction = data['medical_action'];
      this.diseases = data['diseases'];
     }

  ngOnInit() {
    this.updateMedicalActionAction();

  }

  updateMedicalActionAction() {
    if (this.medicalAction) {
      this.action = this.medicalAction.action;
      this.treatmentTarget = this.medicalAction.treatmentTarget;
      this.treatmentIntent = this.medicalAction.treatmentIntent;
      this.responseToTreatment = this.medicalAction.responseToTreatment;
      this.terminationReason = this.medicalAction.treatmentTerminationReason;
      if (this.action) {
        if (this.action instanceof Procedure) {
          this.procedureCode = this.action.code;
          this.bodySites = this.action.bodySites;
          this.performedOn = this.action.performedOn;
        } else if (this.action instanceof Treatment) {
          this.agent = this.action.agent;
          this.routeOfAdministration = this.action.routeOfAdministration;
          this.doseIntervals = this.action.doseIntervals;
          this.drugType = this.action.drugType;
          this.cumulativeDose = this.action.cumulativeDose;
        } else if (this.action instanceof RadiationTherapy) {
          this.modality = this.action.modality;
          this.bodySite = this.action.bodySite;
          this.dosage = this.action.dosage;
          this.fractions = this.action.fractions;
        } else if (this.action instanceof TherapeuticRegimen) {
          this.identifier = this.action.identifier;
          this.startTime = this.action.startTime;
          this.endTime = this.action.endTime;
          this.regimenStatus = this.action.regimenStatus;
        }
      }
    } 
  }

  onActionTypeChange(type: string) {
    console.log(type);
  }

  onCancelClick(): void {
    this.dialogRef.close('cancel');
  }

  onOkClick() {
    return { 'medical_action': this.medicalAction };
  }

}