import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  evidenceName: string;
  evidenceCode: string;
  evidenceId: string;
  evidenceReference: string;
  evidenceDescription: string;


  // TODO - fetch from backend
  severities: string[] = ['Borderline', 'Mild', 'Moderate', 'Severe', 'Profound'];

  // TODO - fetch from backend
  modifierValues: string[] = ['modifier 1', 'modifier 2'];

  // TODO - fetch from backend
  evidenceValues: string[] = ['evidence 1', 'evidence 2'];

  // @ViewChild('phenotypicFeaturePaginator', { static: true }) phenotypicFeaturePaginator: MatPaginator;
  // @ViewChild(MatSort, { static: true }) phenotypicFeatureSort: MatSort;

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
    this.onset = this.phenotypicFeature.onset?.element, '';
    this.resolution = this.phenotypicFeature.resolution?.element, '';
    this.severity = this.phenotypicFeature.severity?.toString();
    this.modifiers = this.phenotypicFeature.modifiers?.toString();
    this.evidenceName = this.phenotypicFeature.evidence?.evidenceCode?.label, '';
    this.evidenceId = this.phenotypicFeature.evidence?.evidenceCode?.id, '';
    this.evidenceReference = this.phenotypicFeature.evidence?.reference?.reference, '';
    this.evidenceDescription = this.phenotypicFeature.evidence?.reference?.description, '';
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
          console.log(this.phenotypicFeature);
          this.updatePhenotypicDetails();
          // emit change
          // this.onFeatureChanged.emit(this.phenotypicFeature);
        }
      }
    });
    return dialogRef;
  }

}