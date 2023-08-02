import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { catchError, map } from 'rxjs/operators';

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
import { EMPTY, Subscription } from 'rxjs';
import { Utils } from '../shared/utils';
import { PhenopacketService } from 'src/app/services/phenopacket.service';

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
  phenopacketListSubscription: Subscription;

  constructor(private phenopacketService: PhenopacketService,
    private dialogService: DialogService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    // retrieve phenopacket to edit
    this.phenopacketListSubscription = this.phenopacketService.getPhenopacketList()
      .pipe(
        map(phenopackets => phenopackets.find(pheno => pheno.id === this.phenopacketId)),
        catchError((error, caught) => { 
          console.error(`Error caught: ${error}`);
          return EMPTY; 
        }))
      .subscribe(phenopacket => {
        // deep copy of object so we do not modify by reference
        this.phenopacket = Utils.clone(phenopacket);
      });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
    if (this.phenopacketListSubscription) {
      this.phenopacketListSubscription.unsubscribe();
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
        this.phenopacketService.updatePhenopacket(this.phenopacket);
      }
    });
  }

  changePhenotypicFeatures(phenotypicFeatures: PhenotypicFeature[]) {
    if (this.phenopacket) {
      this.phenopacket.phenotypicFeatures = phenotypicFeatures;
      this.phenopacketService.updatePhenopacket(this.phenopacket);
    }
  }
  changeDiseases(diseases: Disease[]) {
    if (this.phenopacket) {
      this.phenopacket.diseases = diseases;
      this.phenopacketService.updatePhenopacket(this.phenopacket);
    }
  }

  changeBiosamples(biosamples: BioSample[]) {
    if (this.phenopacket) {
      this.phenopacket.biosamples = biosamples;
      this.phenopacketService.updatePhenopacket(this.phenopacket);
    }
  }
  changeInterpretations(interpretations: Interpretation[]) {
    if (this.phenopacket) {
      this.phenopacket.interpretations = interpretations;
      this.phenopacketService.updatePhenopacket(this.phenopacket);
    }
  }
  changeMeasurements(measurements: Measurement[]) {
    if (this.phenopacket) {
      this.phenopacket.measurements = measurements;
      this.phenopacketService.updatePhenopacket(this.phenopacket);
    }
  }

  changeMedicalActions(medicalActions: MedicalAction[]) {
    if (this.phenopacket) {
      this.phenopacket.medicalActions = medicalActions;
      this.phenopacketService.updatePhenopacket(this.phenopacket);
    }
  }

  changeFiles(files: File[]) {
    if (this.phenopacket) {
      this.phenopacket.files = files;
      this.phenopacketService.updatePhenopacket(this.phenopacket);
    }
  }

}
