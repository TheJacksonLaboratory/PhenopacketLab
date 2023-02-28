import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { OntologyClass } from 'src/app/models/base';
import {Diagnosis, Interpretation, ProgressStatus, VariantInterpretation} from 'src/app/models/interpretation';
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
    phenopacket: Phenopacket;
    id: string;

    // progress status
    progressStatus: ProgressStatus;
    statuses: ProgressStatus[];
    // diseases
    diseases: any[];
    diseaseSubscription: Subscription;


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
        this.statuses = this.getStatuses();
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
        if (this.interpretation === undefined) {
            this.interpretation = new Interpretation();
        }
        this.interpretation.id = event;
    }
    updateDisease(event) {
        if (event.value) {
            if (this.interpretation === undefined) {
                this.interpretation = new Interpretation();
            }
            const disease = new OntologyClass(event.value.id, event.value.name);
            if (this.interpretation.diagnosis) {
                this.interpretation.diagnosis.disease = disease;
            } else {
                const diagnosis = new Diagnosis();
                diagnosis.disease = disease;
                this.interpretation.diagnosis = diagnosis;
            }
        }
    }

    updateProgressStatus(event) {
        if (this.interpretation === undefined) {
            this.interpretation = new Interpretation();
        }
        this.interpretation.progressStatus = event.value;
    }

    addInterpretation() {
        if (this.interpretation === undefined) {
            this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: 'Please fill in the appropriate interpretation properties.' });
            return;
        }
        if (this.interpretation.id === undefined) {
            this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: 'The interpretation ID needs to be set.' });
            return;
        }
        if (this.interpretation.diagnosis) {
            if (this.interpretation.diagnosis.disease === undefined) {
                this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: 'Please select a disease term for the interpretation diagnosis.' });
                return;
            }
        }
        this.interpretationChange.emit(this.interpretation);
        this.messageService.add({ key: 'cen', severity: 'info', summary: 'Success', detail: `The interpretation with ID \'${this.interpretation.id}\' has been added to the phenopacket.` });
    }

    onSummaryChange(event) {
        if (this.interpretation === undefined) {
            this.interpretation = new Interpretation();
        }
        this.interpretation.summary = event;
    }

    addVariantInterpretation(variants: VariantInterpretation[]) {
        // todo
    }
    getStatuses() {
        // tslint:disable-next-line:radix
        return Object.values(ProgressStatus).filter(x => !(parseInt(x) >= 0));
    }

}
