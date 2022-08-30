import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Subscription } from 'rxjs';
import { Disease } from 'src/app/models/disease';
import { Individual, KaryotypicSex, Sex } from 'src/app/models/individual';
import { Phenopacket } from 'src/app/models/phenopacket';
import { File } from 'src/app/models/base';
import { MedicalAction } from 'src/app/models/medical-action';
import { Measurement } from 'src/app/models/measurement';
import { PhenotypicFeature } from 'src/app/models/phenotypic-feature';

@Component({
  selector: 'app-phenopacket',
  templateUrl: './phenopacket.component.html',
  styleUrls: ['./phenopacket.component.scss']
})
export class PhenopacketComponent implements OnInit {
  @Input()
  phenopacket: Phenopacket;

  @Output() onIdChanged = new EventEmitter<any>();
  @Output() onSexChanged = new EventEmitter<any>();
  @Output() onDobChanged = new EventEmitter<any>();

  phenoIdControl = new UntypedFormControl('', [Validators.required]);
  phenoSexControl = new UntypedFormControl('');
  phenoDobControl = new UntypedFormControl(new Date());
  lastEncounterDateControl = new UntypedFormControl(new Date());
  phenopacketIdSubscription: Subscription;
  phenopacketSexSubscription: Subscription;
  phenopacketDobSubscription: Subscription;

  summary: string;
  sex: any;
  karyotypicSex: any;
  gender: any;
  dob: Date;
  individual: Individual;
  lastEncounterDate: string;

  status: string;
  timeOfDeath: string;
  causeOfDeath: string;
  survivalTime: number;

  active = 'top';
  viewMode;

  constructor() {
  }
  ngOnInit(): void {

    this.viewMode = "tab1";
    if (this.phenopacket) {
      this.individual = this.phenopacket.subject;
      this.lastEncounterDate = this.individual.timeAtLastEncounter? this.individual.timeAtLastEncounter.toString() : '';
      this.sex = this.individual.sex;
      this.karyotypicSex = this.individual.karyotypicSex;
      this.gender = this.individual.gender;
      // status
      this.status = this.individual?.vitalStatus?.status?.toString();
      this.causeOfDeath = this.individual?.vitalStatus?.causeOfDeath?.toString();
      this.timeOfDeath = this.individual?.vitalStatus?.timeOfDeath?.toString();
      this.survivalTime = this.individual?.vitalStatus?.survivalTimeInDays;

      // id update
      this.phenoIdControl.setValue(this.phenopacket.id);
      if (this.phenopacketIdSubscription) {
        this.phenopacketIdSubscription.unsubscribe();
      }
      this.phenopacketIdSubscription = this.phenoIdControl.valueChanges.subscribe(value => {
        if (value && value.length > 0) {
          this.onIdChanged.emit(value);
        }
      });
      // sex update
      this.phenoSexControl.setValue(this.sex);
      if (this.phenopacketSexSubscription) {
        this.phenopacketSexSubscription.unsubscribe();
      }
      this.phenopacketSexSubscription = this.phenoSexControl.valueChanges.subscribe(value => {
        if (value && value.length > 0) {
          this.onSexChanged.emit(value);
        }
      });
      // Dob update
      this.dob = this.individual.dateOfBirth? new Date(this.individual.dateOfBirth) : new Date();
      this.phenoDobControl.setValue(this.dob);
      if (this.phenopacketDobSubscription) {
        this.phenopacketDobSubscription.unsubscribe();
      }
      this.phenopacketDobSubscription = this.phenoDobControl.valueChanges.subscribe(value => {
        this.onDobChanged.emit(value);
      });
    }
  }


  getKaryotypicSexes() {
    return Object.values(KaryotypicSex).filter(x => !(parseInt(x) >= 0));
  }

  getPhenotypicFeatures() {
    if (this.phenopacket) {
      return this.phenopacket.phenotypicFeatures? this.phenopacket.phenotypicFeatures : [];
    }
    return [];
  }
  getPhenopacketDiseases() {
    if (this.phenopacket) {
      return this.phenopacket.diseases;
    }
    return [];
  }

  getPhenopacketMeasurements() {
    if (this.phenopacket) {
      return this.phenopacket.measurements;
    }
    return [];
  }

  getInterpretations() {
    if (this.phenopacket) {
      return this.phenopacket.interpretations;
    }
    return [];
  }
  getPhenopacketMedicalActions() {
    if (this.phenopacket) {
      return this.phenopacket.medicalActions;
    }
    return [];
  }

  getPhenopacketFiles() {
    if (this.phenopacket) {
      return this.phenopacket.files;
    }
    return [];
  }

  getSexes() {
    return Object.values(Sex).filter(x => !(parseInt(x) >= 0));
  }
  deletePhenopacket() {

  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    
  }

  changePhenotypicFeatures(phenotypicFeatures: PhenotypicFeature[]) {
    this.phenopacket.phenotypicFeatures = phenotypicFeatures;
  }
  changeDiseases(diseases: Disease[]) {
    this.phenopacket.diseases = diseases;
  }

  changeMeasurements(measurements: Measurement[]) {
    this.phenopacket.measurements = measurements;
  }

  changeMedicalActions(medicalActions: MedicalAction[]) {
    this.phenopacket.medicalActions = medicalActions;
  }

  changeFiles(files: File[]) {
    this.phenopacket.files = files;
  }
 
  editStatus() {
    // TODO
  }
  editTimeOfLastEncounter() {
    // TODO
  }
  // accordion
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}