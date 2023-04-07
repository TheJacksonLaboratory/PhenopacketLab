import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeneDescriptor } from 'src/app/models/interpretation';
import { InterpretationService } from 'src/app/services/interpretation.service';

@Component({
  selector: 'app-gene-context-dialog',
  templateUrl: './gene-context-dialog.component.html',
  styleUrls: ['./gene-context-dialog.component.scss']
})

export class GeneContextDialogComponent implements OnInit {
  title: String;

  valueId: string;
  symbol: string;
  description: string;
  alternateIds: string[];
  xrefs: string[];
  alternateSymbols: string[];

  geneContext: GeneDescriptor;

  constructor(public dialogRef: MatDialogRef<GeneContextDialogComponent>,
    public searchService: InterpretationService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.geneContext = data['geneContext'];
    this.title = data['title'];
  }

  ngOnInit() {
    this.updateGeneContext();

  }

  updateGeneContext() {
    if (this.geneContext) {

    } else {
      this.geneContext = new GeneDescriptor();
    }
  }

  onValueIdChange(eventObj: any) {
    this.valueId = eventObj.value;
    if (this.geneContext) {
      this.geneContext.valueId = this.valueId;
    }
  }

  onSymbolChange(eventObj: any) {
    this.symbol = eventObj.value;
    if (this.geneContext) {
      this.geneContext.symbol = this.symbol;
    }
  }

  onDescriptionChange(eventObj: any) {
    this.description = eventObj.value;
    if (this.geneContext) {
      this.geneContext.description = this.description;
    }
  }
  onAlternateIdsChange(eventObj: any) {
    this.alternateIds = eventObj.value;
    if (this.geneContext) {
      this.geneContext.alternateIds = this.alternateIds;
    }
  }
  onXrefsChange(eventObj: any) {
    this.xrefs = eventObj.value;
    if (this.geneContext) {
      this.geneContext.xrefs = this.xrefs;
    }
  }

  onAlternateSymbolsChange(eventObj: any) {
    this.alternateSymbols = eventObj.value;
    if (this.geneContext) {
      this.geneContext.alternateSymbols = this.alternateSymbols;
    }
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  onOkClick() {
    return { 'geneContext': this.geneContext };
  }
}
