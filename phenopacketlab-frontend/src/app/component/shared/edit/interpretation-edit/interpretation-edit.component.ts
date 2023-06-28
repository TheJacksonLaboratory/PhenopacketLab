import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { OntologyClass } from 'src/app/models/base';
import { Diagnosis, GenomicInterpretation, Interpretation, InterpretationStatus, ProgressStatus } from 'src/app/models/interpretation';
import { Phenopacket } from 'src/app/models/phenopacket';
import { DiseaseSearchService } from 'src/app/services/disease-search.service';
import { InterpretationService } from 'src/app/services/interpretation.service';
import { Utils } from 'src/app/component/shared/utils';
import { ProfileSelection } from 'src/app/models/profile';
import { PhenopacketService } from 'src/app/services/phenopacket.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GenomicInterpretationDialogComponent } from './genomic-interpretation/genomic-interpretation-dialog.component';

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

    submitted = false;
    isPrivateInfoWarnSelected: boolean;

    visible = false;
    id: string;

    // progress status
    selectedProgressStatus: ProgressStatus;
    progressStatuses: ProgressStatus[];
    // diseases
    diseaseItems: OntologyClass[] = [];
    selectedDisease: OntologyClass;
    diseaseItemsCount: number;
    diseaseItemsSearchstate = 'inactive';
    diseaseQuery = new Subject();
    diseaseQueryText: string;
    diseaseItemsNotFoundFlag = false;
    loadingDiseaseItemsSearchResults = false;

    genomicInterpretations: GenomicInterpretation[];

    ref: DynamicDialogRef;

    constructor(public phenopacketService: PhenopacketService,
        public searchService: InterpretationService,
        public diseaseService: DiseaseSearchService,
        private messageService: MessageService,
        public dialogService: DialogService,
        private primengConfig: PrimeNGConfig) {
    }

    ngOnInit() {
        this.primengConfig.ripple = true;

        // get diseases
        this.diseaseQuery.pipe(debounceTime(425),
            distinctUntilChanged()).subscribe((val: string) => {
                if (this.hasValidDiseaseInput(val)) {
                    this.loadingDiseaseItemsSearchResults = true;
                    this.diseaseQueryText = val;
                    this.diseaseService.searchDiseases(val).subscribe((data) => {
                        this.diseaseItems = [];
                        for (const concept of data.foundConcepts) {
                            this.diseaseItems.push(new OntologyClass(concept.id, concept.lbl, concept.id));
                        }
                        this.diseaseItemsCount = data.numberOfTerms;
                        this.diseaseItemsNotFoundFlag = (this.diseaseItemsCount === 0);
                        this.diseaseItemsSearchstate = 'active';
                    }, (error) => {
                        console.log(error);
                        this.loadingDiseaseItemsSearchResults = false;
                    }, () => {
                        this.loadingDiseaseItemsSearchResults = false;
                    });

                } else {
                    this.diseaseItemsSearchstate = 'inactive';
                }
            }); // End debounce subscribe

        // statuses
        this.progressStatuses = this.getProgressStatuses();

        // initialize
        if (this.interpretation) {
            this.id = this.interpretation.id;
            this.isPrivateInfoWarnSelected = this.interpretation.isPrivateInfoWarnSelected;
            this.selectedProgressStatus = this.interpretation.progressStatus;
            this.selectedDisease = this.interpretation.diagnosis?.disease;
            this.diseaseItems = [this.selectedDisease];
            this.genomicInterpretations = this.interpretation.diagnosis?.genomicInterpretations;
        }
    }

    ngOnDestroy(): void {
    }

    onIdChange(event) {
        this.id = event;
    }

    addGenomicInterpretation() {
        if (this.genomicInterpretations === undefined || this.genomicInterpretations === null) {
            this.genomicInterpretations = [];
        }
        const genomicInterpretation = new GenomicInterpretation();
        // check that subject id has been created beforehand
        if (this.phenopacket.subject.id) {
            genomicInterpretation.subjectOrBiosampleId = this.phenopacket.subject.id;
        } else {
            this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: `A subject ID needs to be added to the Individual before creating a Genomic Interpretation.` });
            return;
        }
        // default to UNKNOWN
        genomicInterpretation.interpretationStatus = InterpretationStatus.UNKNOWN_STATUS;
        genomicInterpretation.key = Utils.getBiggestKey(this.genomicInterpretations) + 1;
        // open edit dialog
        this.editGenomicInterpretation(genomicInterpretation);
    }
    deleteGenomicInterpretation(genomicInterpretation: GenomicInterpretation) {
        this.genomicInterpretations = this.genomicInterpretations.filter(val => val.key !== genomicInterpretation.key);
    }
    editGenomicInterpretation(genomicInterpretation: GenomicInterpretation) {
        // open genomic interpretation dialog
        this.ref = this.dialogService.open(GenomicInterpretationDialogComponent, {
            header: 'Enter Genomic Interpretation',
            width: '70%',
            contentStyle: { 'overflow': 'auto' },
            baseZIndex: 10000,
            resizable: true,
            draggable: true,
            data: { genomicInterpretation: genomicInterpretation,
                    profile: this.profile,
                    submitted: this.submitted }
        });

        this.ref.onClose.subscribe((genomicInterpret: GenomicInterpretation) => {
            if (genomicInterpret) {
                const indexToUpdate = this.genomicInterpretations.findIndex(item => item.key === genomicInterpret.key);
                if (indexToUpdate === -1) {
                    this.genomicInterpretations.push(genomicInterpret);
                } else {
                    this.genomicInterpretations[indexToUpdate] = genomicInterpret;
                    this.genomicInterpretations = Object.assign([], this.genomicInterpretations);
                }
                // emit change
                // this.onPhenotypicFeaturesChanged.emit(this.phenotypicFeatures);
            }
        });
    }

    updateProgressStatus(event) {
        this.selectedProgressStatus = event.value;
    }
    diseaseContentChanging(input: string) {
        this.diseaseQuery.next(input);
    }
    hasValidDiseaseInput(qString: string) {
        return (qString && qString.length >= 3);
    }
    updateDiseaseItemSelection(diseaseItem: OntologyClass) {
        diseaseItem.termUrl = Utils.getUrlForId(diseaseItem.id);
        this.selectedDisease = diseaseItem;
    }

    updateIsPrivateInfoWarn(isPrivateInfoWarnSelected: boolean) {
        if (this.interpretation) {
            console.log('updated isPrivateInfoWarnSelected: ');
            this.interpretation.isPrivateInfoWarnSelected = isPrivateInfoWarnSelected;
        }
    }
    generateNewID() {
        this.id = uuidv4();
    }
    updateInterpretation() {
        this.submitted = true;
        if (this.id === undefined) {
            this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: 'Please fill in the interpretation ID.' });
            return;
        }
        // check if personal info has been checked
        if (!this.isPrivateInfoWarnSelected) {
            this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: `Please, confirm that the ID used is not a MRN, DOB, initials, location, email, name, address, or any other personal identifying information.` });
            return;
        }
        if (this.selectedProgressStatus === undefined || this.selectedProgressStatus === null) {
            this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: 'Please select the progress status.' });
            return;
        }
        if (this.selectedDisease === undefined || this.selectedDisease === null) {
            this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: 'Please select a disease term for the disease diagnosis.' });
            return;
        } else {
            this.saveInterpretation();
        }
    }

    saveInterpretation() {
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
