import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataPresentMatTableDataSource } from 'src/app/component/shared/DataPresentMatTableDataSource';
import { Evidence } from 'src/app/models/base';
import { PhenotypicFeature } from 'src/app/models/phenotypic-feature';
import { PhenotypicDetailDialogComponent } from './phenotypic-detail-dialog/phenotypic-detail-dialog.component';

@Component({
  selector: 'app-phenotypic-detail',
  templateUrl: './phenotypic-detail.component.html',
  styleUrls: ['./phenotypic-detail.component.scss']
})

export class PhenotypicDetailComponent {

  phenotypicDetailName: string;
  termId: string;
  description: string;
  selectedStatus: string;
  statuses: string[] = ['Included', 'Excluded'];
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

  // TODO - fetch from backend
  severities: string[] = ['Borderline', 'Mild', 'Moderate', 'Severe', 'Profound'];

  // TODO - fetch from backend
  modifierValues: string[] = ['modifier 1', 'modifier 2'];

  // TODO - fetch from backend
  evidenceValues: string[] = ['evidence 1', 'evidence 2'];

  @Input()
  phenotypicFeature: PhenotypicFeature;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    if (this.phenotypicFeature) {
      this.phenotypicDetailName = this.phenotypicFeature.type.label;
      this.termId = this.phenotypicFeature.type.id;
      this.description = this.phenotypicFeature.description;
      this.updatePhenotypicDetails();
    }
  }

  updatePhenotypicDetails() {
    this.status = this.phenotypicFeature.excluded ? 'Excluded' : 'Included';
    this.onset = this.phenotypicFeature.onset?.toString(), '';
    this.resolution = this.phenotypicFeature.resolution?.toString(), '';
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
    const phenotypicDetailData = { 'title': 'Edit phenotypic feature' };
    phenotypicDetailData['feature'] = this.phenotypicFeature;
    phenotypicDetailData['displayCancelButton'] = true;
    const dialogRef = this.dialog.open(PhenotypicDetailDialogComponent, {
      width: '750px',
      data: phenotypicDetailData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        let updatedFeature = result.feature;
        if (updatedFeature !== undefined) {
          // update feature
          this.phenotypicFeature = updatedFeature;
          this.updatePhenotypicDetails();
          // emit change
          // this.onFeatureChanged.emit(this.phenotypicFeature);
        }
      }
    });
    return dialogRef;
  }

}