import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { OntologyClass } from 'src/app/models/base';
import { Diagnosis, GenomicInterpretation, Interpretation, ProgressStatus } from 'src/app/models/interpretation';
import { Phenopacket } from 'src/app/models/phenopacket';
import { DiseaseSearchService } from 'src/app/services/disease-search.service';
import { InterpretationService } from 'src/app/services/interpretation.service';
import { PhenopacketService } from 'src/app/services/phenopacket.service';

@Component({
    providers: [ConfirmationService],
    selector: 'app-interpretation-edit',
    templateUrl: './interpretation-edit.component.html',
    styleUrls: ['./interpretation-edit.component.scss']
})
export class InterpretationEditComponent implements OnInit, OnDestroy {

    @Input()
    interpretation: Interpretation;
    @Output()
    interpretationChange = new EventEmitter<Interpretation>();

    visible = false;
    genomicInterpretationVisible = false;
    phenopacket: Phenopacket;
    id: string;

    selectedDisease: OntologyClass;
    // progress status
    selectedProgressStatus: ProgressStatus;
    progressStatuses: ProgressStatus[];
    // diseases
    diseases: any[];
    diseaseSubscription: Subscription;
    // genomic interpretations
    genomicInterpretations: GenomicInterpretation[];


    constructor(public searchService: InterpretationService,
        public phenopacketService: PhenopacketService,
        public diseaseService: DiseaseSearchService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private primengConfig: PrimeNGConfig) {
    }


    ngOnInit() {
        this.primengConfig.ripple = true;
        this.phenopacket = this.phenopacketService.phenopacket;

        // get diseases
        this.diseaseSubscription = this.diseaseService.getAll().subscribe(diseases => {
            this.diseases = diseases;
        });
        // statuses
        this.progressStatuses = this.getProgressStatuses();
    }

    ngOnDestroy(): void {
        if (this.diseaseSubscription) {
            this.diseaseSubscription.unsubscribe();
        }
    }

    /**
     *
     * @param array of item with key parameters
     * @returns Returns the biggest key
     */
    getBiggestKey(array: any[]) {
        let key = 0;
        for (const item of array) {
            if ((item.key) >= key) {
                key = item.key;
            }
        }
        return key;
    }

    onIdChange(event) {
        this.id = event;
    }
    updateDisease(event) {
        if (event.value) {
            this.selectedDisease = new OntologyClass(event.value.id, event.value.name);
        }
    }

    addGenomicInterpretation() {
        if (this.genomicInterpretations === undefined || this.genomicInterpretations === null) {
            this.genomicInterpretations = [];
        }
        const genomicInterpretation = new GenomicInterpretation();
        genomicInterpretation.subjectOrBiosampleId = this.phenopacket.subject.id;
        genomicInterpretation.key = this.getBiggestKey(this.genomicInterpretations) + 1;
        this.genomicInterpretations.push(genomicInterpretation);
        this.genomicInterpretationVisible = true;
    }
    deleteGenomicInterpretation(genomicInterpretation: GenomicInterpretation) {
        console.log(genomicInterpretation);
        this.genomicInterpretations = this.genomicInterpretations.filter(val => val.key !== genomicInterpretation.key);
        if (this.genomicInterpretations.length === 0) {
            this.genomicInterpretationVisible = false;
        }
    }
    updateGenomicInterpretation(updatedGenomicInterpretation: GenomicInterpretation, genomicInterpretation: GenomicInterpretation) {
        for (let genoInterpret of this.genomicInterpretations) {
            if (genoInterpret.key === genomicInterpretation.key) {
                genoInterpret = updatedGenomicInterpretation;
            }
        }
    }
    updateProgressStatus(event) {
        this.selectedProgressStatus = event.value;
    }

    addInterpretation() {
        if (this.id === undefined) {
            this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: 'Please fill in the interpretation ID.' });
            return;
        }
        if (this.selectedProgressStatus === undefined) {
            this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: 'Please select the interpretation progress status.' });
            return;
        }
        if (this.selectedDisease === undefined) {
            this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: 'Please select a disease term for the interpretation diagnosis.' });
            return;
        }
        if (this.genomicInterpretations) {
            for (const genomicInterpretation of this.genomicInterpretations) {
                if (genomicInterpretation.interpretationStatus === undefined) {
                    this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: 'Please select interpretation status for genomic interpretation.' });
                    return;
                }
                if (genomicInterpretation.variantInterpretation) {
                    if (genomicInterpretation.variantInterpretation.acmgPathogenicityClassification === undefined) {
                        this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: 'Please select acmgPathogenicityClassification in genomic interpretation.' });
                        return;
                    }
                    if (genomicInterpretation.variantInterpretation.therapeuticActionability === undefined) {
                        this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: 'Please select therapeuticActionability in genomic interpretation.' });
                        return;
                    }
                    if (genomicInterpretation.variantInterpretation.variationDescriptor === undefined) {
                        this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: 'Please add a variationDescriptor to the genomic interpretation.' });
                        return;
                    }
                } else {
                    this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: 'Please add a variant interpretation to the genomic interpretation.' });
                    return;
                }
            }
        }

        // initialize new interpretation object
        const interpretation = new Interpretation();
        interpretation.diagnosis = new Diagnosis();
        interpretation.id = this.id;
        interpretation.diagnosis.genomicInterpretations = this.genomicInterpretations;
        interpretation.progressStatus = this.selectedProgressStatus;
        interpretation.diagnosis.disease = this.selectedDisease;
        // emit change
        this.interpretationChange.emit(interpretation);
        this.messageService.add({ key: 'cen', severity: 'info', summary: 'Success', detail: `The interpretation with ID \'${interpretation.id}\' has been added to the phenopacket.` });
    }

    getCall(genomicInterpretation: GenomicInterpretation) {
        if (genomicInterpretation.geneDescriptor === undefined && genomicInterpretation.variantInterpretation) {
            return 'VariantInterpretation';
        } else if (genomicInterpretation.geneDescriptor && genomicInterpretation.variantInterpretation === undefined) {
            return 'GeneDescriptor';
        }
    }

    onSummaryChange(event) {
        if (this.interpretation === undefined) {
            this.interpretation = new Interpretation();
        }
        this.interpretation.summary = event;
    }

    getProgressStatuses() {
        // tslint:disable-next-line:radix
        return Object.values(ProgressStatus).filter(x => !(parseInt(x) >= 0));
    }

}