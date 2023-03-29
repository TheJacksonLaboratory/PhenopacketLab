import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AcmgPathogenicityClassification, GeneDescriptor, TherapeuticActionability, VariantInterpretation, VariationDescriptor } from 'src/app/models/interpretation';

@Component({
    providers: [ConfirmationService, DialogService],
    selector: 'app-variant-search-interpretation',
    templateUrl: './variant-interpretation.component.html',
    styleUrls: ['./variant-interpretation.component.scss']
})
export class VariantInterpretationComponent implements OnInit {

    @Input()
    variantInterpretation: VariantInterpretation;
    @Output()
    variantInterpretationChange = new EventEmitter<VariantInterpretation>();

    visible = false;
    hgvs: string;
    assembly: string;
    transcript: string;
    genotype: string;
    acmgClassifications = Object.keys(AcmgPathogenicityClassification).filter((item) => isNaN(Number(item)));
    therapeuticActionabilities = Object.keys(TherapeuticActionability).filter((item) => isNaN(Number(item)));

    expanded = false;

    splitterWidths = [50, 50];
    splitterLeftWidth = 60;
    splitterRightWidth = 40;
    viewLeftPane = true;

    constructor() {
    }

    ngOnInit() {
    }

    collapseSplitter() {
        this.viewLeftPane = false;
        this.splitterWidths = [0.1, 99.9];
        this.splitterLeftWidth = 0;
        this.splitterRightWidth = 100;
    }
    expandSplitter() {
        this.viewLeftPane = true;
        this.splitterWidths = [50, 50];
        this.splitterLeftWidth = 60;
        this.splitterRightWidth = 40;
    }
    updateAcmgPathogenicity(event) {
        if (this.variantInterpretation) {
            this.variantInterpretation.acmgPathogenicityClassification = event.value;
            this.variantInterpretationChange.emit(this.variantInterpretation);
        }
    }

    updateTherapeuticActionability(event) {
        if (this.variantInterpretation) {
            this.variantInterpretation.therapeuticActionability = event.value;
            this.variantInterpretationChange.emit(this.variantInterpretation);
        }
    }

    updateGeneDescriptor(geneDescriptor: GeneDescriptor) {
        if (this.variantInterpretation) {
            this.variantInterpretation.variationDescriptor.geneContext = geneDescriptor;
            this.variantInterpretationChange.emit(this.variantInterpretation);
        }
    }
    updateVariantInterpretation(variantInterpretation: VariantInterpretation) {
        this.variantInterpretation = variantInterpretation;
        if (this.variantInterpretation) {
            this.splitterLeftWidth = 0;
            this.splitterRightWidth = 100;
        }
        this.variantInterpretationChange.emit(this.variantInterpretation);
    }
    updateVariationDescriptor(variationDescriptor: VariationDescriptor) {
        if (this.variantInterpretation) {
            this.variantInterpretation.variationDescriptor = variationDescriptor;
            this.variantInterpretationChange.emit(this.variantInterpretation);
        }
    }
}
