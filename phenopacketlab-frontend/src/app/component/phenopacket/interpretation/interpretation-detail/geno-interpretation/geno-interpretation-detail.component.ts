import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { InterpretationDialogComponent } from 'src/app/component/shared/dialog/interpretation-dialog/interpretation-dialog.component';
import { GeneDescriptor, GenomicInterpretation, InterpretationStatus, VariantInterpretation } from 'src/app/models/interpretation';

@Component({
  selector: 'app-geno-interpretation-detail',
  templateUrl: './geno-interpretation-detail.component.html',
  styleUrls: ['./geno-interpretation-detail.component.scss']
})
export class GenoInterpretationDetailComponent implements OnInit {

  @Input()
  genoInterpretation: GenomicInterpretation;

  subjectOrBiosampleId: string;
  interpretationStatus: any;
  statusControl = new UntypedFormControl('');
  statusSubscription: Subscription;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.updateInterpretation();
    if (this.statusSubscription) {
      this.statusSubscription.unsubscribe();
    }

    this.statusSubscription = this.statusControl.valueChanges.subscribe(value => {
      if (value && value.length > 0) {
        if (this.genoInterpretation) {
          this.genoInterpretation.interpretationStatus = value;
          // this.onInterpretationChanged.emit(this.interpretation);
        }

      }
    });
  }

  updateInterpretation() {
    if (this.genoInterpretation) {
      this.subjectOrBiosampleId = this.genoInterpretation.subjectOrBiosampleId;
      this.interpretationStatus = this.genoInterpretation.interpretationStatus;
      this.statusControl.setValue(this.interpretationStatus);
    }

  }

  openEditDialog() {
    const genoInterpretationDetailData = { 'title': 'Edit Genomic Interpretation' };
    genoInterpretationDetailData['interpretation'] = this.genoInterpretation;
    genoInterpretationDetailData['displayCancelButton'] = true;
    const dialogRef = this.dialog.open(InterpretationDialogComponent, {
      width: '1000px',
      data: genoInterpretationDetailData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        const updatedInterpretation = result.interpretation;
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
  getInterpretationStatus() {
    // tslint:disable-next-line:radix
    return Object.values(InterpretationStatus).filter(x => !(parseInt(x) >= 0));
  }

  isVariantInterpretation() {
    if (this.genoInterpretation && this.genoInterpretation.variantInterpretation) {
      return this.genoInterpretation.variantInterpretation.toString() === VariantInterpretation.className;
    }
  }
  isGeneDescriptor() {
    if (this.genoInterpretation && this.genoInterpretation.geneDescriptor) {
      return this.genoInterpretation.geneDescriptor.toString() === GeneDescriptor.className;
    }
  }
  getCall() {
    if (this.genoInterpretation && this.genoInterpretation.variantInterpretation) {
      return this.genoInterpretation.variantInterpretation;
    } else if (this.genoInterpretation && this.genoInterpretation.geneDescriptor) {
      return this.genoInterpretation.geneDescriptor;
    }
  }
}
