import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GenomicInterpretation } from 'src/app/models/interpretation';
import { InterpretationDetailDialogComponent } from './interpretation-detail-dialog/interpretation-detail-dialog.component';

@Component({
  selector: 'app-geno-interpretation-detail',
  templateUrl: './geno-interpretation-detail.component.html',
  styleUrls: ['./geno-interpretation-detail.component.scss']
})

export class GenoInterpretationDetailComponent {

  @Input()
  genoInterpretation: GenomicInterpretation;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.updateInterpretation();
  }

  updateInterpretation() {
    if (this.genoInterpretation) {
      
    }

  }

  openEditDialog() {
    const genoInterpretationDetailData = { 'title': 'Edit Genomic Interpretation' };
    genoInterpretationDetailData['interpretation'] = this.genoInterpretation;
    genoInterpretationDetailData['displayCancelButton'] = true;
    const dialogRef = this.dialog.open(InterpretationDetailDialogComponent, {
      width: '1000px',
      data: genoInterpretationDetailData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        let updatedInterpretation = result.interpretation;
        if (updatedInterpretation) {
          // update interpretation
          this.genoInterpretation = updatedInterpretation;
          this.updateInterpretation();
          // emit change
          // this.onFeatureChanged.emit(this.phenotypicFeature);
        }
      }
    });
    return dialogRef;
  }

}
