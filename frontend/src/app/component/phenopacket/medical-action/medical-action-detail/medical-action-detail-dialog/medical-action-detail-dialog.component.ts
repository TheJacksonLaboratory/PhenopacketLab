import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MessageDialogComponent } from 'src/app/component/shared/message-dialog/message-dialog.component';
import { SpinnerDialogComponent } from 'src/app/component/shared/spinner-dialog/spinner-dialog.component';
import { ExternalReference, OntologyClass, Procedure, TimeElement } from 'src/app/models/base';
import { Disease } from 'src/app/models/disease';
import { Quantity } from 'src/app/models/measurement';
import { DoseInterval, DrugType, MedicalAction, RadiationTherapy, RegimenStatus, TherapeuticRegimen, Treatment } from 'src/app/models/medical-action';
import { MedicalActionService } from 'src/app/services/medical-action.search.service';

@Component({
  selector: 'app-medical-action-detail-dialog',
  templateUrl: './medical-action-detail-dialog.component.html',
  styleUrls: ['./medical-action-detail-dialog.component.scss']
})

export class MedicalActionDetailDialogComponent {

  action: any;
  treatmentTarget: OntologyClass;
  treatmentIntent: OntologyClass;
  responseToTreatment: OntologyClass;
  terminationReason: OntologyClass;
  // procedure
  procedureCode: OntologyClass;
  bodySites: OntologyClass[];
  performedOn: TimeElement[];
  bodySitesStorageKey = "body_sites";
  currSearchParams: any = {}
  spinnerDialogRef: any;
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
  // actionTypeControl = new FormControl('', Validators.required);
  // actionTypeSubscription: Subscription;

  actionTypes = ["Procedure", "Treatment", "Radiation therapy", "Therapeutic regimen"];
  actionType: string;
  // TODO pull data from backend endpoint
  intents = ["Intent 1", "Intent 2", "Intent 3"];
  responses = ["Response 1", "Response 2", "Response 3"];

  constructor(public dialogRef: MatDialogRef<MedicalActionDetailDialogComponent>,
    public searchService: MedicalActionService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.medicalAction = data['medical_action'];
    this.diseases = data['diseases'];
  }

  ngOnInit() {
    this.updateMedicalAction();


  }

  updateMedicalAction() {
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

  onActionTypeChange(obj: any) {
    this.actionType = obj.value;
    if (this.actionType === 'Procedure') {
      this.action = new Procedure();
    } else if (this.actionType === 'Treatment') {
      this.action = new Treatment();
    } else if (this.actionType === 'Radiation therapy') {
      this.action = new RadiationTherapy();
    } else if (this.actionType === 'Therapeutic regimen') {
      this.action = new TherapeuticRegimen();
    }
    if (this.medicalAction === undefined) {
      this.medicalAction = new MedicalAction(this.action);
    }
    this.medicalAction.action = this.action;
  }

  onCancelClick(): void {
    this.dialogRef.close('cancel');
  }

  onOkClick() {
    return { 'medical_action': this.medicalAction };
  }

  changeProcedureCode(eventObj: OntologyClass) {
    this.procedureCode = eventObj;
    // update medicalAction
    console.log(`change procedure code : ${eventObj}`);
    this.medicalAction.action.code = this.procedureCode;
  }
  // TODO check if this is required
  getIdentifier() {
    if (this.identifier instanceof OntologyClass) {
      return `${this.identifier.label} [${this.identifier.id}]`;
    } else if (this.identifier instanceof ExternalReference) {
      return `${this.identifier.reference} [${this.identifier.id}]`;
    }
    return '';
  }

  /** Body site search/add */
  onSearchBodySiteChange(searchBodySite: any) {
    const params: any = {};
    this.currSearchParams.offset = 0;
    let id = searchBodySite.selectedItems[0].selectedValue.id;
    let label = searchBodySite.selectedItems[0].selectedValue.name;
    let bodySite = new OntologyClass(id, label);
    if (this.bodySites === undefined) {
      this.bodySites = [];
    }
    this.bodySites.push(bodySite);
    // push changes to medicalAction
    this.medicalAction.action.bodySites = this.action.bodySites;
  }

  removeBodySite(bodySite: OntologyClass) {
    this.bodySites.forEach((element, index) => {
      if (element == bodySite) {
        this.bodySites.splice(index, 1);
        // push changes to medicalAction
        this.medicalAction.action.bodySites = this.bodySites;
      }
    });
  }
  /**
     * Add a new body site with default values or no values
     */
  // addBodySite(bodySite?: OntologyClass) {
  //   if (bodySite === undefined) {
  //     let bodySite = new OntologyClass('id ', 'Name');
  //     this.bodySites.push(bodySite);
  //   } else {
  //     this.bodySites.push(bodySite);
  //   }
  //   // this.phenotypicDataSource.data = this.phenotypicFeatures;
  //   // TODO push changes to api
  // }

  /** end body site search */

}