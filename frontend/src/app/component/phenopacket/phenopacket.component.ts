import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { Disease } from 'src/app/models/disease';
import { Individual, KaryotypicSex, Sex, } from 'src/app/models/individual';
import { Phenopacket } from 'src/app/models/phenopacket';
import { File } from 'src/app/models/base';
import { MedicalAction } from 'src/app/models/medical-action';
import { Measurement } from 'src/app/models/measurement';
import { PhenotypicFeature } from 'src/app/models/phenotypic-feature';
import { BioSample } from 'src/app/models/biosample';
import { IndividualDialogComponent } from './individual-dialog/individual-dialog.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-phenopacket',
  templateUrl: './phenopacket.component.html',
  styleUrls: ['./phenopacket.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PhenopacketComponent implements OnInit, OnDestroy {

  @Input()
  phenopacket: Phenopacket;

  @Output() onIdChanged = new EventEmitter<any>();
  @Output() onSexChanged = new EventEmitter<any>();
  @Output() onDobChanged = new EventEmitter<any>();
  @Output() onIndividualChange = new EventEmitter<Individual>();

  summary = '';
  sex: any = Sex.UNKNOWN_SEX;
  karyotypicSex: any = KaryotypicSex.UNKNOWN_KARYOTYPE;
  gender: any;
  // dob: Date;
  individual: Individual;
  lastEncounterDate = '';

  status = '';
  timeOfDeath = '';
  causeOfDeath = '';
  survivalTime: number;

  active = 'top';
  viewMode;
  // accordion
  step: number;

  ref: DynamicDialogRef;

  constructor(public dialogService: DialogService, public messageService: MessageService) { }

  ngOnInit(): void {
    this.viewMode = 'tab1';
    if (this.phenopacket) {
      this.individual = this.phenopacket.subject;
      this.lastEncounterDate = this.individual.timeAtLastEncounter ? this.individual.timeAtLastEncounter.toString() : '';
      this.sex = this.individual.sex;
      this.karyotypicSex = this.individual.karyotypicSex;
      this.gender = this.individual.gender;
      // status
      this.status = this.individual?.vitalStatus?.status?.toString();
      this.causeOfDeath = this.individual?.vitalStatus?.causeOfDeath?.toString();
      this.timeOfDeath = this.individual?.vitalStatus?.timeOfDeath?.toString();
      this.survivalTime = this.individual?.vitalStatus?.survivalTimeInDays;
    }
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  getPhenotypicFeatures() {
    if (this.phenopacket) {
      return this.phenopacket.phenotypicFeatures ? this.phenopacket.phenotypicFeatures : [];
    }
    return [];
  }
  getPhenopacketDiseases() {
    if (this.phenopacket) {
      return this.phenopacket.diseases;
    }
    return [];
  }
  getBiosamples() {
    if (this.phenopacket) {
      return this.phenopacket.biosamples;
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

  openEditDialog() {
    this.ref = this.dialogService.open(IndividualDialogComponent, {
      header: 'Edit Individual',
      width: '70%',
      contentStyle: { 'min-height': '500px', 'overflow': 'auto' },
      baseZIndex: 10000,
      resizable: true,
      draggable: true,
      data: { subject: this.individual }
    });

    this.ref.onClose.subscribe((subject: Individual) => {
      if (subject) {
        this.individual = subject;
        this.updateIndividual();
        // emit change
        this.onIndividualChange.emit(this.individual);
      }
    });
  }
  updateIndividual() {
    this.sex = this.individual.sex;
    this.karyotypicSex = this.individual.karyotypicSex;
    this.causeOfDeath = this.individual.vitalStatus?.causeOfDeath?.toString();
    this.gender = this.individual.gender?.toString();
    this.lastEncounterDate = this.individual.timeAtLastEncounter?.toString();
    this.status = this.individual.vitalStatus?.status;
    this.survivalTime = this.individual.vitalStatus?.survivalTimeInDays;
    this.timeOfDeath = this.individual.vitalStatus?.timeOfDeath?.toString();
  }

  changePhenotypicFeatures(phenotypicFeatures: PhenotypicFeature[]) {
    if (this.phenopacket) {
      this.phenopacket.phenotypicFeatures = phenotypicFeatures;
    }
  }
  changeDiseases(diseases: Disease[]) {
    if (this.phenopacket) {
      this.phenopacket.diseases = diseases;
    }
  }

  changeBiosamples(biosamples: BioSample[]) {
    if (this.phenopacket) {
      this.phenopacket.biosamples = biosamples;
    }
  }
  changeMeasurements(measurements: Measurement[]) {
    if (this.phenopacket) {
      this.phenopacket.measurements = measurements;
    }
  }

  changeMedicalActions(medicalActions: MedicalAction[]) {
    if (this.phenopacket) {
      this.phenopacket.medicalActions = medicalActions;
    }
  }

  changeFiles(files: File[]) {
    if (this.phenopacket) {
      this.phenopacket.files = files;
    }
  }

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
