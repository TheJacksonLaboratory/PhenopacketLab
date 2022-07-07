import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
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
  identifier: any;
  startTime: TimeElement;
  endTime: TimeElement;
  regimenStatuses = Object.values(RegimenStatus);
  regimenStatus: RegimenStatus;

  medicalAction: MedicalAction;
  diseases: Disease[];
  terminationReasonStr: string;

  actionTypes = ["Procedure", "Treatment", "Radiation therapy", "Therapeutic regimen"];
  actionType: string;
  // TODO pull data from backend endpoint
  intents = [new OntologyClass("intent-1", "Intent 1"),
  new OntologyClass("intent-2", "Intent 2"),
  new OntologyClass("intent-3", "Intent 3")];
  responses = [new OntologyClass("resp-1", "Response 1"),
  new OntologyClass("resp-2", "Response 2"),
  new OntologyClass("resp-3", "Response 3")];

  // Dose Intervals table
  doseIntervalDisplayedColumns: string[] = DoseIntervalColumns.map((col) => col.key);
  doseIntervalColumnsSchema: any = DoseIntervalColumns;
  doseIntervalDatasource = new MatTableDataSource<DoseIntervalTableModel>();
  valid: any = {};

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
    } else {
      // default to Procedure and initialize medical action
      this.action = new Procedure();
      this.medicalAction = new MedicalAction(this.action);
      this.actionType = this.actionTypes[0];
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

  onDiseaseChange(disease: Disease) {
    console.log(disease);
    if (this.medicalAction) {
      this.medicalAction.treatmentTarget = disease.term;
    }
  }

  onIntentChange(intent: OntologyClass) {
    if (this.medicalAction) {
      this.medicalAction.treatmentIntent = intent;
    }
  }

  onResponseChange(response: OntologyClass) {
    if (this.medicalAction) {
      this.medicalAction.responseToTreatment = response;
    }
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
    if (this.medicalAction) {
      this.medicalAction.action.code = this.procedureCode;
    }
  }
  changeAgent(eventObj: OntologyClass) {
    this.agent = eventObj;
    // update medicalAction
    if (this.medicalAction) {
      this.medicalAction.action.agent = this.agent;
    }
  }
  changeRouteOfAdministration(eventObj: OntologyClass) {
    this.routeOfAdministration = eventObj;
    // update medicalAction
    if (this.medicalAction) {
      this.medicalAction.action.routeOfAdministration = this.routeOfAdministration;
    }
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

  // Doseinterval table
  editRow(row: DoseIntervalTableModel) {
    // if (row.id === 0) {
    //   this.userService.addUser(row).subscribe((newUser: DoseIntervalTableModel) => {
    //     row.id = newUser.id;
    //     row.isEdit = false;
    //   });
    // } else {
    //   this.userService.updateUser(row).subscribe(() => (row.isEdit = false));

    // }
    row.isEdit = false;
  }

  addRow() {
    const newRow: DoseIntervalTableModel = {
      id: 0,
      unit: '',
      value: '',
      frequency: '',
      interval: '',
      isEdit: true
    };
    this.doseIntervalDatasource.data = [newRow, ...this.doseIntervalDatasource.data];
  }

  removeRow(id: number) {
    // this.userService.deleteUser(id).subscribe(() => {
    this.doseIntervalDatasource.data = this.doseIntervalDatasource.data.filter(
      (u: DoseIntervalTableModel) => u.id !== id
    );
    // });
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
    if (this.medicalAction) {
      this.medicalAction.action.modality = this.modality;
    }
  }
  changeBodySite(eventObj: OntologyClass) {
    this.bodySite = eventObj;
    // update medicalAction
    if (this.medicalAction) {
      this.medicalAction.action.bodySite = this.bodySite;
    }
  }
  changeDosage(eventObj: number) {
    this.dosage = eventObj;
    // update medicalAction
    if (this.medicalAction) {
      this.medicalAction.action.dosage = this.dosage;
    }
  }
  changeFractions(eventObj: number) {
    this.fractions = eventObj;
    // update medicalAction
    if (this.medicalAction) {
      this.medicalAction.action.fractions = this.fractions;
    }
  }

  // Therapeutic regimen
  changeIdentifier(eventObj: any) {
    this.identifier = eventObj;
    // update medicalAction
    if (this.medicalAction) {
      this.medicalAction.action.identifier = this.identifier;
    }
  }
  onRegimenStatusChange(eventObj: RegimenStatus) {
    this.regimenStatus = eventObj;
    // update medicalAction
    if (this.medicalAction) {
      this.medicalAction.action.regimenStatus = this.regimenStatus;
    }
  }
}

export interface DoseIntervalTableModel {
  id: number;
  unit: string;
  value: string;
  frequency: string;
  interval: string;
  isEdit: boolean;
}

export const DoseIntervalColumns = [
  {
    key: 'unit',
    type: 'text',
    label: 'Unit',
    required: true,
  },
  {
    key: 'value',
    type: 'number',
    label: 'Value',
  },
  {
    key: 'frequency',
    type: 'text',
    label: 'Schedule frequency',
    required: true,
  },
  {
    key: 'interval',
    type: 'text',
    label: 'Interval',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];