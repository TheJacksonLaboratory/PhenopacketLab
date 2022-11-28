import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { OntologyClass } from 'src/app/models/base';
import { ClinicalFindings, Disease, Laterality, Severities, Stages } from 'src/app/models/disease';
import { Phenopacket } from 'src/app/models/phenopacket';
import { PhenopacketService } from 'src/app/services/phenopacket.service';
import { PhenotypeSearchService } from 'src/app/services/phenotype-search.service';
import { SpinnerDialogComponent } from '../shared/spinner-dialog/spinner-dialog.component';

@Component({
    providers: [ConfirmationService],
    selector: 'app-disease-form',
    templateUrl: './disease-form.component.html',
    styleUrls: ['./pheno-creator.component.scss']
})
export class DiseaseFormComponent implements OnInit, OnDestroy {

    label = '';
    id = '';
    visible = false;

    disease: Disease;
    diseases: Disease[];
    phenopacket: Phenopacket;
    phenopacketSubscription: Subscription;

    // table contents of diseases
    selectedDisease: Disease;
    // searchparams
    currSearchParams: any = {};
    spinnerDialogRef: any;

    submitted = false;

    diseaseDetailName: string;
    diseaseId: string;
    isA: string;
    description: string;
    observed: boolean;
    laterality: OntologyClass;
    severity: OntologyClass;
    finding: OntologyClass;
    stage: OntologyClass;

    diseaseIndex = 0;

    // TODO - fetch from backend
    // stages: string[] = ['Incubation', 'Prodromal', 'Illness', 'Decline', 'Convalescence'];
    stages: string[] = ['Stage 0 - carcinoma in situ', 'Stage I - localized cancer', 'Stage II - locally advanced cancer, early stages', 'Stage III - locally advanced cancer, later stages', 'Stage IV - metastatic cancer'];

    constructor(public searchService: PhenotypeSearchService,
        public phenopacketService: PhenopacketService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private router: Router, private primengConfig: PrimeNGConfig,
        public dialog: MatDialog) {
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.phenopacket = this.phenopacketService.phenopacket;
        if (this.phenopacket === undefined) {
            // navigate to first page of creator as phenopacket is not created
            this.router.navigate(['pheno-creator/individual']);
        } else {
            this.diseases = this.phenopacket.diseases;
        }
    }
    ngOnDestroy(): void {
        if (this.phenopacketSubscription) {
            this.phenopacketSubscription.unsubscribe();
        }
    }

    // Used for disease search bar
    onSearchCriteriaChange(searchCriteria: any) {
        this.currSearchParams.offset = 0;
        const id = searchCriteria.selectedItems[0].selectedValue.id;

        if ((searchCriteria.selectedItems && searchCriteria.selectedItems.length > 0)) {
            this.currSearchParams = searchCriteria;
            this._queryDiseaseById(id);
        }
    }

    private _queryDiseaseById(id: string) {
        this.openSpinnerDialog();
        this.searchService.queryPhenotypicFeatureById(id).subscribe(data => {
            const disease = new Disease();
            this.diseaseIndex++;
            disease.key = this.diseaseIndex.toString();
            disease.term = new OntologyClass(data.id, data.name);
            disease.excluded = false;
            this.addDisease(disease);
            this.spinnerDialogRef.close();
        },
            (error) => {
                console.log(error);
                this.spinnerDialogRef.close();
            });
    }

    openSpinnerDialog() {
        this.spinnerDialogRef = this.dialog.open(SpinnerDialogComponent, {
            panelClass: 'transparent',
            disableClose: true
        });
    }

    // changeDiseases(diseases: Disease[]) {
    //     if (diseases?.length > 0) {
    //         this.label = diseases[0].term?.label;
    //         this.id = diseases[0].term?.id;
    //         this.disease = new Disease();
    //         this.disease.term = new OntologyClass(this.id, this.label);
    //     }
    // }

    /**
     * Adds a new disease.
     **/
    addDisease(disease?: Disease) {
        if (disease === undefined) {
            disease = new Disease();
            disease.term.id = this.id;
            disease.term.label = this.label;
        }
        this.diseases.push(disease);
        // we copy the array after each update so the ngChange method is triggered on the child component
        this.diseases = this.diseases.slice();
        setTimeout(() => this.visible = true, 0);

        this.phenopacket.diseases = this.diseases;
        this.submitted = true;
        // make table visible
        this.visible = true;
    }

    deleteDisease(disease: Disease) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete \'' + disease.term.label + '\'?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.diseases = this.diseases.filter(val => val.term.id !== disease.term.id);
                this.selectedDisease = null;
                this.phenopacket.diseases = this.diseases;
                if (this.diseases.length === 0) {
                    this.visible = false;
                }
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Disease Deleted', life: 3000 });
            },
            reject: () => {
                this.confirmationService.close();
            }
        });
    }

    getLateralities() {
        return Laterality.VALUES;
    }

    getClinicalFindings() {
        return ClinicalFindings.VALUES;
    }
    getStages() {
        return Stages.VALUES;
    }
    getSeverities() {
        return Severities.VALUES;
    }

    updateExcluded(event) {
        if (this.selectedDisease) {
            this.selectedDisease.excluded = !event.checked;
        }
    }
    /**
     * Called when a row is selected in the left side table
     * @param event
     */
    onRowSelect(event) {
        console.log('selected disease:');
        console.log(event.data);
        this.selectedDisease = event.data;
        this.updateSelection();
    }
    /**
     * Update components on the right side pane with all data from the selected disease
     */
    updateSelection() {
        this.id = this.selectedDisease.term.id;
        this.label = this.selectedDisease.term.label;
        this.observed = !this.selectedDisease.excluded;
        this.laterality = this.selectedDisease.laterality;
        // this.diseaseStage = this.selectedDisease.diseaseStage;
        // TODO add rest of disease details
    }

    nextPage() {

        this.phenopacketService.setPhenopacket(this.phenopacket);

        // this.phenopacketService.phenopacket.diseases = this.diseases;
        this.router.navigate(['pheno-creator/validate']);
        this.submitted = true;

    }
    prevPage() {
        this.router.navigate(['pheno-creator/phenotypic-features']);
    }
}
