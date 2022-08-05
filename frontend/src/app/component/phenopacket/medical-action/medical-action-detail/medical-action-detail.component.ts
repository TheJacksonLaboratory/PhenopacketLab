import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataPresentMatTableDataSource } from 'src/app/component/shared/DataPresentMatTableDataSource';
import { ExternalReference, OntologyClass, Procedure, TimeElement } from 'src/app/models/base';
import { Disease } from 'src/app/models/disease';
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
  performed: TimeElement;
  // Treatment
  agent: OntologyClass;
  routeOfAdministration: OntologyClass;
  doseIntervals: DoseInterval[] = [];
  doseIntervalDatasource = new DataPresentMatTableDataSource<DoseInterval>();
  doseIntervalColumns = ['unit', 'value', 'frequency', 'interval'];
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
  
  @Input()
  medicalAction: MedicalAction;
  @Input()
  diseases: Disease[];
  
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
          this.actionType = Procedure.actionName;
          this.procedureCode = this.action.code;
          this.bodySite = this.action.bodySite;
          this.performed = this.action.performed;
        } else if (this.action instanceof Treatment) {
          this.actionType = Treatment.actionName;
          this.agent = this.action.agent;
          this.routeOfAdministration = this.action.routeOfAdministration;
          this.doseIntervals = this.action.doseIntervals;
          if (this.doseIntervals) {
            this.doseIntervalDatasource.data = this.doseIntervals;
          }
          this.drugType = this.action.drugType;
          this.cumulativeDose = this.action.cumulativeDose;
        } else if (this.action instanceof RadiationTherapy) {
          this.actionType = RadiationTherapy.actionName;
          this.modality = this.action.modality;
          this.bodySite = this.action.bodySite;
          this.dosage = this.action.dosage;
          this.fractions = this.action.fractions;
        } else if (this.action instanceof TherapeuticRegimen) {
          this.actionType = TherapeuticRegimen.actionName;
          this.identifier = this.action.identifier;
          this.startTime = this.action.startTime;
          this.endTime = this.action.endTime;
          this.regimenStatus = this.action.regimenStatus;
        }
        
      }
    }

  }

  openEditDialog() {
    const phenotypicDetailData = { 'title': 'Edit medical action' };
    phenotypicDetailData['medical_action'] = this.medicalAction;
    phenotypicDetailData['diseases'] = this.diseases;
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

  // treatment
  getAgentDisplay() {
    if (this.agent) {
      return `${this.agent.label} [${this.agent.id}]`;
    }
    return '';
  }
  getRouteOfAdministrationDisplay() {
    if (this.routeOfAdministration) {
      return `${this.routeOfAdministration.label} [${this.routeOfAdministration.id}]`;
    }
    return '';
  }

  getCumulativeDoseDisplay() {
    if (this.cumulativeDose) {
      return `${this.cumulativeDose.value} ${this.cumulativeDose.unit?.label} [${this.cumulativeDose.unit?.id}]`;
    }
    return '';
  }

  getQuantityUnitDisplay(element) {
    if (element) {
      return `${element.quantity?.unit?.label}`;
    }
    return '';
  }

  getQuantityValueDisplay(element) {
    if (element) {
      return `${element.quantity?.value}`;
    }
    return '';
  }
  getScheduleFrequencyDisplay(element) {
    if (element.scheduleFrequency) {
      return element.scheduleFrequency.label;
    }
    return '';
  }

  getIntervalDisplay(element) {
    if (element) {
      return `${element.interval.start} - ${element.interval.end}`;
    }
    return '';
  }

  // radiation therapy
  getModalityDisplay() {
    if (this.modality) {
      return `${this.modality.label} [${this.modality.id}]`;
    }
    return '';
  }


}