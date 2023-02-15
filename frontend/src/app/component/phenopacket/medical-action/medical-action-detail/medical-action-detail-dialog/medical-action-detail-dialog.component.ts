import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
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

export class MedicalActionDetailDialogComponent implements OnInit {

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
  bodySiteControl = new UntypedFormControl('');
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

  actionTypes = ['Procedure', 'Treatment', 'Radiation therapy', 'Therapeutic regimen'];
  actionType: string;
  // TODO pull data from backend endpoint
  intents = [{ id: 'intent-1', label: 'Intent 1' },
  { id: 'intent-2', label: 'Intent 2' },
  { id: 'intent-3', label: 'Intent 3' }];
  responses = [{ id: 'resp-1', label: 'Response 1' },
  { id: 'resp-2', label: 'Response 2' },
  { id: 'resp-3', label: 'Response 3' }];

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
      this.treatmentTarget = this.medicalAction.treatmentTarget;
      this.treatmentIntent = this.medicalAction.treatmentIntent;
      this.responseToTreatment = this.medicalAction.responseToTreatment;
      this.terminationReason = this.medicalAction.treatmentTerminationReason;
      this.responseToTreatmentVal = this.responseToTreatment?.label;
      if (this.medicalAction.procedure) {
        this.procedureCode = this.medicalAction.procedure.code;
        this.bodySite = this.medicalAction.procedure.bodySite;
        this.performed = this.medicalAction.procedure.performed;
        this.actionType = this.medicalAction.procedure.toString();
      } else if (this.medicalAction.treatment) {
        this.agent = this.medicalAction.treatment.agent;
        this.routeOfAdministration = this.medicalAction.treatment.routeOfAdministration;
        this.doseIntervals = this.medicalAction.treatment.doseIntervals;
        this.drugType = this.medicalAction.treatment.drugType;
        this.cumulativeDose = this.medicalAction.treatment.cumulativeDose;
        this.actionType = this.medicalAction.treatment.toString();
      } else if (this.medicalAction.radiationTherapy) {
        this.modality = this.medicalAction.radiationTherapy.modality;
        this.bodySite = this.medicalAction.radiationTherapy.bodySite;
        this.dosage = this.medicalAction.radiationTherapy.dosage;
        this.fractions = this.medicalAction.radiationTherapy.fractions;
        this.bodySiteControl.setValue(this.getBodySiteDisplay(this.bodySite));
        this.actionType = this.medicalAction.radiationTherapy.toString();
      } else if (this.medicalAction.therapeuticRegimen) {
        this.identifier = this.medicalAction.therapeuticRegimen.identifier;
        this.startTime = this.medicalAction.therapeuticRegimen.startTime;
        this.endTime = this.medicalAction.therapeuticRegimen.endTime;
        this.regimenStatus = this.medicalAction.therapeuticRegimen.regimenStatus;
        this.actionType = this.medicalAction.therapeuticRegimen.toString();
      }

    } else {
      this.medicalAction = new MedicalAction();
    }
  }

  onActionTypeChange(obj: any) {
    this.actionType = obj.value;
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
    this.dialogRef.close(false);
  }

  onOkClick() {
    return { 'medical_action': this.medicalAction };
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
