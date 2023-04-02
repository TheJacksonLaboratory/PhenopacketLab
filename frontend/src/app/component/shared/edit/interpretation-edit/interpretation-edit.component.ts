import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { OntologyClass } from 'src/app/models/base';
import { Diagnosis, GenomicInterpretation, Interpretation, ProgressStatus } from 'src/app/models/interpretation';
import { Phenopacket } from 'src/app/models/phenopacket';
import { DiseaseSearchService } from 'src/app/services/disease-search.service';
import { InterpretationService } from 'src/app/services/interpretation.service';
import { Utils } from 'src/app/component/shared/utils';
import { ProfileSelection } from 'src/app/models/profile';

@Component({
    providers: [ConfirmationService],
    selector: 'app-interpretation-edit',
    templateUrl: './interpretation-edit.component.html',
    styleUrls: ['./interpretation-edit.component.scss']
})
export class InterpretationEditComponent implements OnInit, OnDestroy {

    @Input()
    phenopacket: Phenopacket;
    @Input()
    interpretation: Interpretation;
    @Input()
    profile: ProfileSelection;
    @Output()
    interpretationChange = new EventEmitter<Interpretation>();

    visible = false;
    genomicInterpretationVisible = false;
    id: string;

    selectedDisease: OntologyClass;
    // progress status
    selectedProgressStatus: ProgressStatus;
    progressStatuses: ProgressStatus[];
    // diseases
    diseases: OntologyClass[];
    diseaseSubscription: Subscription;
    // genomic interpretations
    genomicInterpretations: GenomicInterpretation[];

    constructor(public searchService: InterpretationService,
        public diseaseService: DiseaseSearchService,
        private messageService: MessageService,
        private primengConfig: PrimeNGConfig) {
    }

    ngOnInit() {
        this.primengConfig.ripple = true;

        // get diseases
        this.diseaseSubscription = this.diseaseService.getAll().subscribe(diseases => {
            this.diseases = diseases;
        });
        // statuses
        this.progressStatuses = this.getProgressStatuses();
        // initialize
        if (this.interpretation) {
            this.id = this.interpretation.id;
            this.selectedProgressStatus = this.interpretation.progressStatus;
            this.selectedDisease = this.interpretation.diagnosis?.disease;
            this.genomicInterpretations = this.interpretation.diagnosis?.genomicInterpretations ;
            if (this.genomicInterpretations && this.genomicInterpretations.length > 0) {
                this.genomicInterpretationVisible = true;
            }
        }
    }

    ngOnDestroy(): void {
        if (this.diseaseSubscription) {
            this.diseaseSubscription.unsubscribe();
        }
    }

    onIdChange(event) {
        this.id = event;
    }

    addGenomicInterpretation() {
        if (this.genomicInterpretations === undefined || this.genomicInterpretations === null) {
            this.genomicInterpretations = [];
        }
        const genomicInterpretation = new GenomicInterpretation();
        genomicInterpretation.subjectOrBiosampleId = this.phenopacket.subject.id;
        genomicInterpretation.key = Utils.getBiggestKey(this.genomicInterpretations) + 1;
        this.genomicInterpretations.push(genomicInterpretation);
        this.genomicInterpretationVisible = true;
    }
    deleteGenomicInterpretation(genomicInterpretation: GenomicInterpretation) {
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

    updateInterpretation() {
        if (this.id === undefined) {
            this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: 'Please fill in the interpretation ID.' });
            return;
        }
        if (this.selectedProgressStatus === undefined || this.selectedProgressStatus === null) {
            this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: 'Please select the interpretation progress status.' });
            return;
        }
        if (this.selectedDisease === undefined || this.selectedDisease === null) {
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
        interpretation.diagnosis.disease = new OntologyClass(this.selectedDisease.id, this.selectedDisease.label);
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
