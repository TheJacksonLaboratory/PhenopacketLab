import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { OntologyClass, Procedure, TimeElement } from 'src/app/models/base';
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
  responseToTreatmentVal: string;
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
  drugTypes = Object.values(DrugType);
  cumulativeDose: Quantity;
  // radiationtherapy
  modality: OntologyClass;
  bodySite: OntologyClass;
  bodySiteControl = new FormControl('');
  radiationTherapyBodySites: OntologyClass[];
  filteredBodySites: Observable<OntologyClass[]>;
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
  intents = [{id: "intent-1", label: "Intent 1"},
            {id: "intent-2", label: "Intent 2"},
            {id: "intent-3", label: "Intent 3"}];
  responses = [{id: "resp-1", label: "Response 1"},
              {id: "resp-2", label: "Response 2"},
              {id: "resp-3", label: "Response 3"}];

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

    // bodySite filter for RadiationTherapy
    this.radiationTherapyBodySites = this.searchService.getAllFromLocalStorage(this.bodySitesStorageKey);
    this.filteredBodySites = this.bodySiteControl.valueChanges.pipe(
        startWith(''),
        map(bodySite => (bodySite ? this._filter(bodySite) : this.radiationTherapyBodySites.slice())),
      );
    
  }

  updateMedicalAction() {
    if (this.medicalAction) {
      this.action = this.medicalAction.action;
      this.treatmentTarget = this.medicalAction.treatmentTarget;
      this.treatmentIntent = this.medicalAction.treatmentIntent;
      this.responseToTreatment = this.medicalAction.responseToTreatment;
      this.terminationReason = this.medicalAction.treatmentTerminationReason;
      this.responseToTreatmentVal = this.responseToTreatment?.label;
      this.actionType = this.action.toString();
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
          this.bodySiteControl.setValue(this.getBodySiteDisplay(this.bodySite));
        } else if (this.action instanceof TherapeuticRegimen) {
          this.identifier = this.action.identifier;
          this.startTime = this.action.startTime;
          this.endTime = this.action.endTime;
          this.regimenStatus = this.action.regimenStatus;
        }
      }
    } else {
      this.medicalAction = new MedicalAction();
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
    this.medicalAction.action = this.action;
  }

  onDiseaseChange(eventObj: any) {
    if (this.medicalAction) {
      // retrieve disease term from event obj
      this.medicalAction.treatmentTarget = eventObj.value?.term;
    }
  }

  onIntentChange(eventObj: any) {
    if (this.medicalAction) {
      // retrieve intent from object
      this.medicalAction.treatmentIntent = eventObj.value;
    }
  }

  onResponseChange(eventObj: any) {
    if (this.medicalAction) {
      this.medicalAction.responseToTreatment = eventObj.value;
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
    let bodySite = {id: id, label: label};
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
  onDrugTypeChange(eventObj: any) {
    this.drugType = eventObj.value;
    // update medicalAction
    if (this.medicalAction) {
      this.medicalAction.action.drugType = this.drugType;
    }
  }

  // Doseinterval table
  editRow(row: DoseIntervalTableModel) {
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
    this.doseIntervalDatasource.data = this.doseIntervalDatasource.data.filter(
      (u: DoseIntervalTableModel) => u.id !== id
    );
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
  changeBodySite(eventObj: any) {
    this.bodySite = eventObj;
    // update medicalAction
    if (this.medicalAction) {
      this.medicalAction.action.bodySite = this.bodySite;
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
      return (option as any).name.toLowerCase().includes(filterValue)
    });
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
  onRegimenStatusChange(eventObj: any) {
    this.regimenStatus = eventObj.value;
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