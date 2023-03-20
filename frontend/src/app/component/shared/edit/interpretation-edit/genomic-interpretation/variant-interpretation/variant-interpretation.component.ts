import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

    @Output()
    variantInterpretationChange = new EventEmitter<VariantInterpretation>();

    variantInterpretation: VariantInterpretation;
    visible = false;
    hgvs: string;
    assembly: string;
    transcript: string;
    genotype: string;
    acmgClassifications = Object.keys(AcmgPathogenicityClassification).filter((item) => isNaN(Number(item)));
    therapeuticActionabilities = Object.keys(TherapeuticActionability).filter((item) => isNaN(Number(item)));

    expanded = false;

    constructor() {
    }

    ngOnInit() {
    }

    updateAcmgPathogenicity(acmgPathogenicity: AcmgPathogenicityClassification) {
        if (this.variantInterpretation) {
            console.log(acmgPathogenicity);
            this.variantInterpretation.acmgPathogenicityClassification = acmgPathogenicity;
            this.variantInterpretationChange.emit(this.variantInterpretation);
        }
    }

    updateTherapeuticActionability(therapeuticActionability: TherapeuticActionability) {
        if (this.variantInterpretation) {
            console.log(therapeuticActionability);
            this.variantInterpretation.therapeuticActionability = therapeuticActionability;
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
        this.variantInterpretationChange.emit(this.variantInterpretation);
    }
    updateVariationDescriptor(variationDescriptor: VariationDescriptor) {
        if (this.variantInterpretation) {
            this.variantInterpretation.variationDescriptor = variationDescriptor;
            this.variantInterpretationChange.emit(this.variantInterpretation);
        }
    }
}
