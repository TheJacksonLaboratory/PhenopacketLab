import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AcmgPathogenicityClassification, GeneDescriptor, TherapeuticActionability, VariantInterpretation, VariationDescriptor } from 'src/app/models/interpretation';
import { ProfileSelection } from 'src/app/models/profile';
import { VariantMetadata } from 'src/app/models/variant-metadata';

@Component({
    providers: [ConfirmationService, DialogService],
    selector: 'app-variant-search-interpretation',
    templateUrl: './variant-interpretation.component.html',
    styleUrls: ['./variant-interpretation.component.scss']
})
export class VariantInterpretationComponent implements OnInit {

    @Input()
    variantInterpretation: VariantInterpretation;
    @Input()
    profile: ProfileSelection;
    @Input()
    submitted: boolean;
    @Output()
    variantInterpretationChange = new EventEmitter<VariantInterpretation>();

    hgvs: string;
    assembly = 'GRCh38';
    transcript: string;
    genotype: string;
    acmgClassifications = Object.keys(AcmgPathogenicityClassification).filter((item) => isNaN(Number(item)));
    therapeuticActionabilities = Object.keys(TherapeuticActionability).filter((item) => isNaN(Number(item)));

    expanded = false;

    variantValidated: VariantMetadata;
    leftSplitVisible = true;
    centerSplitVisible = false;
    rightSplitVisible = false;
    leftSplitWidth = 100;
    centerSplitWidth = 0;
    rightSplitWidth = 0;

    constructor() {
    }

    ngOnInit() {
        if (this.variantInterpretation) {
            this.showRightSplit();
        }
        console.log(this.profile);
    }

    showLeftSplit() {
        this.leftSplitVisible = true;
        this.centerSplitVisible = false;
        this.rightSplitVisible = false;
        this.leftSplitWidth = 100;
        this.centerSplitWidth = 0;
        this.rightSplitWidth = 0;
    }
    showCenterSplit() {
        this.leftSplitVisible = false;
        this.centerSplitVisible = true;
        this.rightSplitVisible = false;
        this.leftSplitWidth = 0;
        this.centerSplitWidth = 100;
        this.rightSplitWidth = 0;
    }
    showRightSplit() {
        this.leftSplitVisible = false;
        this.centerSplitVisible = false;
        this.rightSplitVisible = true;
        this.leftSplitWidth = 0;
        this.centerSplitWidth = 0;
        this.rightSplitWidth = 100;
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
            this.showRightSplit();
        } else {
            this.showLeftSplit();
        }
        this.variantInterpretationChange.emit(this.variantInterpretation);
    }
    resetVariantValidated() {
        this.variantValidated = undefined;
        this.showLeftSplit();
    }
    /**
     * Converts the Variant validated (VariantMetadata) to a variant interpretation
     * and emits the change to the parent component
     * @returns
     */
    addVariantInterpretation() {
        if (this.variantValidated) {
            this.showRightSplit();
        } else {
            this.showLeftSplit();
            return;
        }
        this.variantInterpretation = this.variantValidated.toVariantInterpretation(this.assembly, undefined);
        this.variantInterpretationChange.emit(this.variantInterpretation);
    }

    /**
     * method called from VariationSearchComponent
     * @param variant
     * @returns
     */
    updateVariantValidated(variant: VariantMetadata) {
        if (variant) {
            this.showCenterSplit();
        } else {
            this.showLeftSplit();
            return;
        }
        this.variantValidated = variant;
    }
    updateVariationDescriptor(variationDescriptor: VariationDescriptor) {
        if (this.variantInterpretation) {
            this.variantInterpretation.variationDescriptor = variationDescriptor;
            this.variantInterpretationChange.emit(this.variantInterpretation);
        }
    }
}
