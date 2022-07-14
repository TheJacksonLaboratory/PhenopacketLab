import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/component/shared/message-dialog/message-dialog.component';
import { ExternalReference, OntologyClass, Procedure, TimeElement } from 'src/app/models/base';
import { Quantity } from 'src/app/models/measurement';
import { DoseInterval, DrugType, MedicalAction, RadiationTherapy, RegimenStatus, TherapeuticRegimen, Treatment } from 'src/app/models/medical-action';
import { MedicalActionDetailDialogComponent } from './medical-action-detail-dialog/medical-action-detail-dialog.component';

@Component({
  selector: 'app-medical-action-detail',
  templateUrl: './medical-action-detail.component.html',
  styleUrls: ['./medical-action-detail.component.scss']
})

export class MedicalActionDetailComponent {
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

  actionType: string;
  doseIntervalColumns = ['unit', 'value', 'frquency', 'interval', 'remove'];
  
  @Input()
  medicalAction: MedicalAction;

  constructor(public dialog: MatDialog) { }

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
        // set actionType 
        this.actionType = this.action.toString();
      }
    }

  }

  openEditDialog() {
    const phenotypicDetailData = { 'title': 'Edit medical action' };
    phenotypicDetailData['medical_action'] = this.medicalAction;
    phenotypicDetailData['displayCancelButton'] = true;
    const dialogRef = this.dialog.open(MedicalActionDetailDialogComponent, {
      width: '1000px',
      data: phenotypicDetailData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        let updatedMedicalAction = result.medical_action;
        if (updatedMedicalAction) {
          // update medical action
          this.medicalAction = updatedMedicalAction;
          this.updateMedicalActionAction();
          // emit change
          // this.onFeatureChanged.emit(this.phenotypicFeature);
        }
      }
    });
    return dialogRef;
  }

  deleteDoseInterval(element: DoseInterval) {
    const msgData = { 'title': 'Delete Dose Interval' };
    msgData['displayCancelButton'] = true;
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '400px',
      data: msgData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'ok') {
        this.doseIntervals.forEach((val, index) => {
          if (val == element) {
              this.doseIntervals.splice(index, 1);
          }
      });
      }
    });
    return dialogRef;
  }

  getIdentifier() {
    if ((this.identifier as OntologyClass).label) {
      return `${(this.identifier as OntologyClass).label} [${this.identifier.id}]`;
    } else if ((this.identifier as ExternalReference).reference) {
      return `${(this.identifier as ExternalReference).reference} [${this.identifier.id}]`;
    }
    return '';
  }
}