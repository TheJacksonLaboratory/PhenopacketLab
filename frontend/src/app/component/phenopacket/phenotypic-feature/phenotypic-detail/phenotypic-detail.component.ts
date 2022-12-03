import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { DataPresentMatTableDataSource } from 'src/app/component/shared/DataPresentMatTableDataSource';
import { Evidence } from 'src/app/models/base';
import { PhenotypicFeature } from 'src/app/models/phenotypic-feature';
import { PhenotypicDetailDialogComponent } from './phenotypic-detail-dialog/phenotypic-detail-dialog.component';

@Component({
  selector: 'app-phenotypic-detail',
  templateUrl: './phenotypic-detail.component.html',
  styleUrls: ['./phenotypic-detail.component.scss']
})

export class PhenotypicDetailComponent implements OnInit, OnDestroy {

  @Input()
  phenotypicFeature: PhenotypicFeature;
  @Output()
  onPhenotypicFeatureChange = new EventEmitter<PhenotypicFeature>();

  phenotypicDetailName: string;
  termId: string;
  description: string;
  selectedStatus: string;
  status: string;
  onset: string;
  resolution: string;
  severity: string;
  modifiers: string;
  evidences: Evidence[];
  evidenceName: string;
  evidenceCode: string;
  evidenceId: string;
  evidenceReference: string;
  evidenceDescription: string;

  evidenceDatasource = new DataPresentMatTableDataSource<Evidence>();
  evidenceColumns = ['id', 'name', 'refid', 'refname', 'description'];

  ref: DynamicDialogRef;

  constructor(public dialogService: DialogService, public messageService: MessageService) { }

  ngOnInit() {
    if (this.phenotypicFeature) {
      this.phenotypicDetailName = this.phenotypicFeature.type.label;
      this.termId = this.phenotypicFeature.type.id;
      this.description = this.phenotypicFeature.description;
      this.updatePhenotypicDetails();
    }
  }

  updatePhenotypicDetails() {
    this.status = this.phenotypicFeature.excluded ? 'Excluded' : 'Observed';
    this.onset = this.phenotypicFeature.onset?.toString();
    this.resolution = this.phenotypicFeature.resolution?.toString();
    this.severity = this.phenotypicFeature.severity?.toString();
    this.modifiers = this.phenotypicFeature.modifiers?.toString();
    this.evidences = this.phenotypicFeature.evidence;
    this.evidenceDatasource.data = this.evidences;
  }

  getEvidenceName(evidence: Evidence) {
    if (evidence.evidenceCode) {
      return evidence.evidenceCode.label;
    }
    return '';
  }
  getEvidenceId(evidence: Evidence) {
    if (evidence.evidenceCode) {
      return evidence.evidenceCode.id;
    }
    return '';
  }
  getReferenceId(evidence: Evidence) {
    if (evidence.reference) {
      return evidence.reference.id;
    }
    return '';
  }
  getReferenceName(evidence: Evidence) {
    if (evidence.reference) {
      return evidence.reference.reference;
    }
    return '';
  }
  getReferenceDescription(evidence: Evidence) {
    if (evidence.reference) {
      return evidence.reference.description;
    }
    return '';
  }
  openEditDialog() {
    this.ref = this.dialogService.open(PhenotypicDetailDialogComponent, {
      header: 'Edit Phenotypic Feature',
      width: '70%',
      contentStyle: { 'min-height': '500px', 'overflow': 'auto' },
      baseZIndex: 10000,
      resizable: true,
      draggable: true,
      data: { feature: this.phenotypicFeature }
    });

    this.ref.onClose.subscribe((feature: PhenotypicFeature) => {
      if (feature) {
        this.phenotypicFeature = feature;
        this.updatePhenotypicDetails();
        // emit change
        this.onPhenotypicFeatureChange.emit(this.phenotypicFeature);
      }
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
