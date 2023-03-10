import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GeneDescriptor, GenomicInterpretation, InterpretationStatus, VariantInterpretation } from 'src/app/models/interpretation';
import { InterpretationService } from 'src/app/services/interpretation.service';

@Component({
    selector: 'app-genomic-interpretation',
    templateUrl: './genomic-interpretation.component.html',
    styleUrls: ['./genomic-interpretation.component.scss']
})
export class GenomicInterpretationComponent implements OnInit {

    @Input()
    genomicInterpretation: GenomicInterpretation;
    @Output()
    genomicInterpretationChange = new EventEmitter<GenomicInterpretation>();

    selectedInterpretationStatus: InterpretationStatus;

    constructor(public searchService: InterpretationService) {
    }

    ngOnInit() {
    }

    updateInterpretationStatus(event) {
        console.log(event);
        const interpretationStatusValue = event.value;
        for (const status of InterpretationStatus.getStatuses()) {
            if (status.value === interpretationStatusValue.value) {
                this.genomicInterpretation.interpretationStatus = status;
                this.selectedInterpretationStatus = status;
                console.log(this.genomicInterpretation.interpretationStatus);
                break;
            }
        }
        this.genomicInterpretationChange.emit(this.genomicInterpretation);
    }
    getInterpretationStatuses() {
        // return Object.values(InterpretationStatus).filter(x => !(parseInt(x) >= 0));
        return InterpretationStatus.getStatuses();
    }

    addVariantInterpretation(variantInterpretation: VariantInterpretation) {
        this.genomicInterpretation.variantInterpretation = variantInterpretation;
        this.genomicInterpretation.geneDescriptor = undefined;
        this.genomicInterpretationChange.emit(this.genomicInterpretation);
    }

    addGeneDescriptor(geneDescriptor: GeneDescriptor) {
        this.genomicInterpretation.variantInterpretation = undefined;
        this.genomicInterpretation.geneDescriptor = geneDescriptor;
        this.genomicInterpretationChange.emit(this.genomicInterpretation);
    }

}
