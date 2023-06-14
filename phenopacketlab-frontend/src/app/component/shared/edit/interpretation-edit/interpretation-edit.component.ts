import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { OntologyClass } from 'src/app/models/base';
import { Diagnosis, GenomicInterpretation, Interpretation, InterpretationStatus, ProgressStatus } from 'src/app/models/interpretation';
import { Phenopacket } from 'src/app/models/phenopacket';
import { DiseaseSearchService } from 'src/app/services/disease-search.service';
import { InterpretationService } from 'src/app/services/interpretation.service';
import { Utils } from 'src/app/component/shared/utils';
import { ProfileSelection } from 'src/app/models/profile';
import { PhenopacketService } from 'src/app/services/phenopacket.service';

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
    genomicInterpretationVisible = false;
    id: string;

    selectedDisease: OntologyClass;
    // progress status
    selectedProgressStatus: ProgressStatus;
    progressStatuses: ProgressStatus[];
    // diseases
    diseases: OntologyClass[];
    diseaseItems: any[] = [];
    selectedDiseaseItem: any;
    diseaseSubscription: Subscription;
    // genomic interpretations
    genomicInterpretations: GenomicInterpretation[];

    constructor(public phenopacketService: PhenopacketService,
        public searchService: InterpretationService,
        public diseaseService: DiseaseSearchService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private primengConfig: PrimeNGConfig) {
    }

    ngOnInit() {
        this.primengConfig.ripple = true;

        // get diseases
        this.diseaseSubscription = this.diseaseService.getAll().subscribe(diseases => {
            this.diseaseItems = diseases;
            if (this.interpretation) {
                this.selectedDisease = this.interpretation.diagnosis?.disease;
                this.selectedDiseaseItem = this.getSelectedDiseaseItem(this.selectedDisease);
            }
        });
        // statuses
        this.progressStatuses = this.getProgressStatuses();
        // if edit dialog then we assume that the isPrivateInfoWarnSelected has already been selected
        if (this.profile === undefined) {
            this.isPrivateInfoWarnSelected = true;
        }
        // initialize
        if (this.interpretation) {
            this.id = this.interpretation.id;
            this.selectedProgressStatus = this.interpretation.progressStatus;
            this.selectedDisease = this.interpretation.diagnosis?.disease;
            this.genomicInterpretations = this.interpretation.diagnosis?.genomicInterpretations;
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
        // default to UNKNOWN
        genomicInterpretation.interpretationStatus = InterpretationStatus.UNKNOWN_STATUS;
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

    getSelectedDiseaseItem(diseaseTerm: OntologyClass) {
        for (const item of this.diseaseItems) {
            if (item.id === diseaseTerm.id) {
                return item;
            }
        }
    }

    updateDiseaseItemSelection(event) {
        const diseaseItem = event.value;
        this.selectedDisease = new OntologyClass(diseaseItem.id, diseaseItem.lbl);
    }

    updateInterpretation() {
        this.submitted = true;
        if (this.id === undefined) {
            this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: 'Please fill in the interpretation ID.' });
            return;
        }
        // check if id already exist
        const phenopacket = this.phenopacketService.phenopacket;
        if (phenopacket) {
            for (const interpret of phenopacket.interpretations) {
                if (interpret.id === this.id) {
                    this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: `Interpretation with ID '${this.id}' already exists. Please create a new ID.` });
                    return;
                }
            }
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
                if (genomicInterpretation.interpretationStatus === InterpretationStatus.UNKNOWN_STATUS) {
                    this.confirmationService.confirm({
                        message: `The \'Interpretation Status\' of the genomic interpretation with the variation id \'${genomicInterpretation.variantInterpretation.variationDescriptor.id}\' is set to \'UNKNOWN\' for. Do you want to change it to another status or carry on with the saving of this interpretation?`,
                        header: 'Confirmation',
                        icon: 'pi pi-exclamation-triangle',
                        accept: () => {
                            // continue saving
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
                        },
                        reject: () => {
                            return;
                        }
                    });
                }
            }
        }

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
