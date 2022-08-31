import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GeneDescriptor } from 'src/app/models/interpretation';
import { GeneContextDialogComponent } from './gene-context-dialog/gene-context-dialog.component';

@Component({
  selector: 'app-gene-descriptor',
  templateUrl: './gene-descriptor.component.html',
  styleUrls: ['./gene-descriptor.component.scss']
})

export class GeneDescriptorComponent {

  valueId: string;
  symbol: string;
  description: string;
  alternateIds: string[];
  xrefs: string[];
  alternateSymbols: string[];


  @Input()
  geneDescriptor: GeneDescriptor;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.updateGeneDescriptor();
  }

  updateGeneDescriptor() {
    if (this.geneDescriptor) {
      this.valueId = this.geneDescriptor.valueId;
      this.symbol = this.geneDescriptor.symbol;
      this.description = this.geneDescriptor.description;
      this.alternateIds = this.geneDescriptor.alternateIds;
      this.xrefs = this.geneDescriptor.xrefs;
      this.alternateSymbols = this.geneDescriptor.alternateSymbols;
    }

  }

  openEditDialog() {
    const geneDescriptorData = { 'title': 'Add/Edit Gene Descriptor' };
    geneDescriptorData['geneContext'] = this.geneDescriptor;
    geneDescriptorData['displayCancelButton'] = true;
    const dialogRef = this.dialog.open(GeneContextDialogComponent, {
      width: '1000px',
      data: geneDescriptorData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        let updatedInterpretation = result.geneDescriptor;
        if (updatedInterpretation) {
          // update interpretation
          this.geneDescriptor = updatedInterpretation;
          this.updateGeneDescriptor();
          // emit change
          // this.onFeatureChanged.emit(this.phenotypicFeature);
        }
      }
    });
    return dialogRef;
  }

  getStringArrayDisplay(array: string[]) {
    let displayResult = '';
    if (array) {
      for(let i = 0; i < array.length; i++) {
        if (i < array.length - 1) {
          displayResult += `${array[i]}, `;
        } else {
          displayResult += `${array[i]}`;
        }
      }
    }
    return displayResult;
  }

}
