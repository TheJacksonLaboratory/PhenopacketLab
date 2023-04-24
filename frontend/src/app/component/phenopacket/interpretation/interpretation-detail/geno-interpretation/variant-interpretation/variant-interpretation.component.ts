import {Component, Input, OnInit} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AcmgPathogenicityClassification, Expression, GeneDescriptor, TherapeuticActionability, VariantInterpretation, VcfRecord } from 'src/app/models/interpretation';
import { InterpretationDetailDialogComponent } from 'src/app/component/phenopacket/interpretation/interpretation-detail/interpretation-detail-dialog/interpretation-detail-dialog.component';
import { OntologyClass } from 'src/app/models/base';
import { DataPresentMatTableDataSource } from 'src/app/component/shared/DataPresentMatTableDataSource';
import { GeneContextDialogComponent } from '../gene-descriptor/gene-context-dialog/gene-context-dialog.component';
import { VcfRecordDialogComponent } from '../vcf-record/vcf-record-dialog/vcf-record-dialog.component';

@Component({
  selector: 'app-variant-interpretation',
  templateUrl: './variant-interpretation.component.html',
  styleUrls: ['./variant-interpretation.component.scss']
})

export class VariantInterpretationComponent implements OnInit {

  @Input()
  call: GeneDescriptor | VariantInterpretation;

  acmgPathogenicityClassification: any;
  therapeuticActionability: any;
  acmgControl = new UntypedFormControl('');
  acmgSubscription: Subscription;
  therapeuticControl = new UntypedFormControl('');
  therapeuticSubscription: Subscription;

  // VariantDescriptor fields
  id: string;
  label: string;
  description: string;
  allelicState: OntologyClass;
  xrefs: string[];
  alternateLabels: string[];
  vrsRefAlleleSeq: string;
  structuralType: OntologyClass;
  expressions: Expression[];
  geneContext: GeneDescriptor;
  vcfRecord: VcfRecord;

  // alternate labels table
  labelsDisplayedColumns: string[] = LabelStringColumns.map((col) => col.key);
  labelsColumnsSchema: any = LabelStringColumns;
  labelsDatasource = new DataPresentMatTableDataSource<StringTableModel>();
  validLabels: any = {};
  // cross references table
  xrefsDisplayedColumns: string[] = XrefsStringColumns.map((col) => col.key);
  xrefsColumnsSchema: any = XrefsStringColumns;
  xrefsDatasource = new DataPresentMatTableDataSource<StringTableModel>();
  validXrefs: any = {};

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.updateCall();
    if (this.acmgSubscription) {
      this.acmgSubscription.unsubscribe();
    }
    this.acmgSubscription = this.acmgControl.valueChanges.subscribe(value => {
      if (value && value.length > 0) {
        if (this.call) {
          if (this.call instanceof VariantInterpretation) {
            this.call.acmgPathogenicityClassification = value;
          }
          // this.onInterpretationChanged.emit(this.interpretation);
        }
      }
    });
    if (this.therapeuticSubscription) {
      this.therapeuticSubscription.unsubscribe();
    }
    this.therapeuticSubscription = this.therapeuticControl.valueChanges.subscribe(value => {
      if (value && value.length > 0) {
        if (this.call) {
          if (this.call instanceof VariantInterpretation) {
            this.call.therapeuticActionability = value;
          }
          // this.onInterpretationChanged.emit(this.interpretation);
        }
      }
    });
  }

  updateCall() {
    if (this.call) {
      if (this.call instanceof VariantInterpretation) {
        this.acmgPathogenicityClassification = this.call.acmgPathogenicityClassification;
        this.acmgControl.setValue(this.acmgPathogenicityClassification);
        this.therapeuticActionability = this.call.therapeuticActionability;
        this.therapeuticControl.setValue(this.therapeuticActionability);
        this.id = this.call.variationDescriptor?.id;
        this.label = this.call.variationDescriptor?.label;
        this.description = this.call.variationDescriptor?.description;
        this.allelicState = this.call.variationDescriptor?.allelicState;
        this.expressions = this.call.variationDescriptor?.expressions;
        this.xrefs = this.call.variationDescriptor?.xrefs;
        this.alternateLabels = this.call.variationDescriptor?.alternateLabels;
        this.vrsRefAlleleSeq = this.call.variationDescriptor?.vrsRefAlleleSeq;
        this.structuralType = this.call.variationDescriptor?.structuralType;
        this.geneContext = this.call.variationDescriptor?.geneContext;
        this.vcfRecord = this.call.variationDescriptor?.vcfRecord;
      }
    }
  }

  openEditDialog() {
    const genoInterpretationDetailData = { 'title': 'Edit Genomic Interpretation' };
    // genoInterpretationDetailData['interpretation'] = this.genoInterpretation;
    genoInterpretationDetailData['displayCancelButton'] = true;
    const dialogRef = this.dialog.open(InterpretationDetailDialogComponent, {
      width: '1000px',
      data: genoInterpretationDetailData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        const updatedInterpretation = result.interpretation;
        if (updatedInterpretation) {
          // update interpretation
          // this.genoInterpretation = updatedInterpretation;
          this.updateCall();
          // emit change
          // this.onFeatureChanged.emit(this.phenotypicFeature);
        }
      }
    });
    return dialogRef;
  }
  openAddGeneContextDialog() {
    const geneContextData = { 'title': 'Add Gene Context' };
    geneContextData['displayCancelButton'] = true;
    const dialogRef = this.dialog.open(GeneContextDialogComponent, {
      width: '1000px',
      data: geneContextData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        const updatedGeneContext = result.geneContext;
        if (updatedGeneContext) {
          // update interpretation
          this.geneContext = updatedGeneContext;
          this.updateCall();
          // emit change
          // this.onFeatureChanged.emit(this.phenotypicFeature);
        }
      }
    });
    return dialogRef;
  }

  openAddVcfRecordDialog() {
    const vcfRecordData = { 'title': 'Add VCF Record' };
    vcfRecordData['displayCancelButton'] = true;
    const dialogRef = this.dialog.open(VcfRecordDialogComponent, {
      width: '1000px',
      data: vcfRecordData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        const updatedVcfRecord = result.vcfRecord;
        if (updatedVcfRecord) {
          // update interpretation
          this.vcfRecord = updatedVcfRecord;
          this.updateCall();
          // emit change
          // this.onFeatureChanged.emit(this.phenotypicFeature);
        }
      }
    });
    return dialogRef;
  }

  getAcmgPathogenicityClassification() {
    // tslint:disable-next-line:radix
    return Object.values(AcmgPathogenicityClassification).filter(x => !(parseInt(x) >= 0));
  }
  getTherapeuticActionability() {
    // tslint:disable-next-line:radix
    return Object.values(TherapeuticActionability).filter(x => !(parseInt(x) >= 0));
  }
  // alternate labels
  editRow(row: StringTableModel) {
    row.isEdit = false;
  }

  addLabelsRow() {
    const newRow: StringTableModel = {
      id: 0,
      name: '',
      isEdit: true
    };
    this.labelsDatasource.data = [newRow, ...this.labelsDatasource.data];
  }

  removeLabelsRow(id: number) {
    this.labelsDatasource.data = this.labelsDatasource.data.filter(
      (u: StringTableModel) => u.id !== id
    );
  }
  inputLabelsHandler(e: any, id: number, key: string) {
    if (!this.validLabels[id]) {
      this.validLabels[id] = {};
    }
    this.validLabels[id][key] = e.target.validity.valid;
  }

  disableLabelsSubmit(id: number) {
    if (this.validLabels[id]) {
      return Object.values(this.validLabels[id]).some((item) => item === false);
    }
    return false;
  }
  // cross-references
  addXrefsRow() {
    const newRow: StringTableModel = {
      id: 0,
      name: '',
      isEdit: true
    };
    this.xrefsDatasource.data = [newRow, ...this.xrefsDatasource.data];
  }

  removeXrefsRow(id: number) {
    this.xrefsDatasource.data = this.xrefsDatasource.data.filter(
      (u: StringTableModel) => u.id !== id
    );
  }
  inputXrefsHandler(e: any, id: number, key: string) {
    if (!this.validXrefs[id]) {
      this.validXrefs[id] = {};
    }
    this.validXrefs[id][key] = e.target.validity.valid;
  }

  disableXrefsSubmit(id: number) {
    if (this.validXrefs[id]) {
      return Object.values(this.validXrefs[id]).some((item) => item === false);
    }
    return false;
  }

  // vcf records
  changeVcfRecord(vcfRecord: VcfRecord) {
    this.vcfRecord = vcfRecord;
    if (this.call instanceof VariantInterpretation) {
      if (this.call.variationDescriptor) {
        this.call.variationDescriptor.vcfRecord = vcfRecord;
      }
    }
  }

}

export interface StringTableModel {
  id: number;
  name: string;
  isEdit: boolean;
}

export const LabelStringColumns = [
  {
    key: 'name',
    type: 'text',
    label: 'Alternate labels',
    required: true,
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];
export const XrefsStringColumns = [
  {
    key: 'name',
    type: 'text',
    label: 'Cross-references',
    required: true,
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];
