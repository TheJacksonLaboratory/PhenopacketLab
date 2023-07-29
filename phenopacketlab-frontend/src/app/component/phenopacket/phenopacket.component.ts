import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { Disease } from 'src/app/models/disease';
import { Individual } from 'src/app/models/individual';
import { Phenopacket } from 'src/app/models/phenopacket';
import { File } from 'src/app/models/base';
import { MedicalAction } from 'src/app/models/medical-action';
import { Measurement } from 'src/app/models/measurement';
import { PhenotypicFeature } from 'src/app/models/phenotypic-feature';
import { BioSample } from 'src/app/models/biosample';
import { IndividualDialogComponent } from './individual-dialog/individual-dialog.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { Interpretation } from 'src/app/models/interpretation';
import { CohortService } from 'src/app/services/cohort.service';
import { Subscription } from 'rxjs';
import { Utils } from '../shared/utils';

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
  phenopacketId: string;

  phenopacket: Phenopacket;

  ref: DynamicDialogRef;
  cohortSubscription: Subscription;

  constructor(private cohortService: CohortService,
    private dialogService: DialogService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    // retrieve phenopacket to edit
    this.cohortSubscription = this.cohortService.getCohort().subscribe(cohort => {
      if (cohort?.members) {
        for (const pheno of cohort.members) {
          if (pheno.id === this.phenopacketId) {
            // deep copy of object so we do not modify by reference
            this.phenopacket = Utils.clone(pheno);
          }
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
    if (this.cohortSubscription) {
      this.cohortSubscription.unsubscribe();
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
      contentStyle: { 'overflow': 'auto' },
      baseZIndex: 10000,
      resizable: true,
      draggable: true,
      data: { subject: this.phenopacket?.subject }
    });

    this.ref.onClose.subscribe((subject: Individual) => {
      if (subject && this.phenopacket) {
        this.phenopacket.subject = subject;
      }
    });
  }

  /**
   * This is where we update the cohort whenever there is a phenopacket change
   * If logged in, then phenopacket is modified/updated in the DB
   */
  updateCohort() {
    this.cohortService.removeCohortMember(this.phenopacket);
    this.cohortService.addCohortMember(this.phenopacket);
  }
  changePhenotypicFeatures(phenotypicFeatures: PhenotypicFeature[]) {
    if (this.phenopacket) {
      this.phenopacket.phenotypicFeatures = phenotypicFeatures;
      this.updateCohort();
    }
  }
  changeDiseases(diseases: Disease[]) {
    if (this.phenopacket) {
      this.phenopacket.diseases = diseases;
      this.updateCohort();
    }
  }

  changeBiosamples(biosamples: BioSample[]) {
    if (this.phenopacket) {
      this.phenopacket.biosamples = biosamples;
      this.updateCohort();
    }
  }
  changeInterpretations(interpretations: Interpretation[]) {
    if (this.phenopacket) {
      this.phenopacket.interpretations = interpretations;
      this.updateCohort();
    }
  }
  changeMeasurements(measurements: Measurement[]) {
    if (this.phenopacket) {
      this.phenopacket.measurements = measurements;
      this.updateCohort();
    }
  }

  changeMedicalActions(medicalActions: MedicalAction[]) {
    if (this.phenopacket) {
      this.phenopacket.medicalActions = medicalActions;
      this.updateCohort();
    }
  }

  changeFiles(files: File[]) {
    if (this.phenopacket) {
      this.phenopacket.files = files;
      this.updateCohort();
    }
  }

}
