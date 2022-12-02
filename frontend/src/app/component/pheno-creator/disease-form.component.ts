import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { OntologyClass } from 'src/app/models/base';
import { Disease, Laterality, Severities, Stages } from 'src/app/models/disease';
import { OntologyTreeNode } from 'src/app/models/ontology-treenode';
import { Phenopacket } from 'src/app/models/phenopacket';
import { DiseaseSearchService } from 'src/app/services/disease-search.service';
import { PhenopacketService } from 'src/app/services/phenopacket.service';
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
    // tnm Findings
    findings: OntologyClass[];
    findingsNodes: OntologyTreeNode[];
    findingsSubscription: Subscription;
    // disease Stage
    stages: OntologyClass[];
    stagesNodes: OntologyTreeNode[];

    // onset
    onset: any;
    onsetsNodes: OntologyTreeNode[];
    onsetsSubscription: Subscription;

    constructor(public searchService: DiseaseSearchService,
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
            if (this.diseases) {
                if (this.diseases.length > 0) {
                    this.visible = true;
                }
            }
        }
        // get onsets
        this.onsetsSubscription = this.phenopacketService.getOnsets().subscribe(nodes => {
            this.onsetsNodes = <OntologyTreeNode[]>nodes.data;
        });
        // stages
        this.stagesNodes = this.getStages();
        this.findingsSubscription = this.phenopacketService.getTnmFindings().subscribe(nodes => {
            this.findingsNodes = <OntologyTreeNode[]>nodes.data;
        });
    }
    ngOnDestroy(): void {
        if (this.phenopacketSubscription) {
            this.phenopacketSubscription.unsubscribe();
        }
        if (this.onsetsSubscription) {
            this.onsetsSubscription.unsubscribe();
        }
        if (this.findingsSubscription) {
            this.findingsSubscription.unsubscribe();
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
        this.searchService.queryDiseasesById(id).subscribe(data => {
            const disease = new Disease();
            disease.key = this.getBiggestKey() + 1;
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

    /**
     *
     * @returns Returns the biggest key
     */
    getBiggestKey() {
        let key = 0;
        for (const disease of this.diseases) {
            if ((disease.key) >= key) {
                key = disease.key;
            }
        }
        return key;
    }

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

    getStages() {
        const nodes = [];
        for (const stage of Stages.VALUES) {
            nodes.push({label: stage.label, key: stage.id, leaf: true, parent: undefined});
        }
        return nodes;
    }
    getSeverities() {
        return Severities.VALUES;
    }

    updateOnset(timeElement: any) {
        if (this.selectedDisease) {
            this.selectedDisease.onset = timeElement;
        }
    }
    updateExcluded(event) {
        if (this.selectedDisease) {
            this.selectedDisease.excluded = !event.checked;
        }
    }
    updateDiseaseStages(diseaseStages) {
        if (this.selectedDisease) {
            this.selectedDisease.diseaseStage = diseaseStages;
        }
    }
    updateFindingStages(findings) {
        if (this.selectedDisease) {
            this.selectedDisease.clinicalTnmFinding = findings;
        }
    }
    /**
     * Called when a row is selected on the left side table
     * @param event
     */
    onRowSelect(event) {
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
        this.onset = this.selectedDisease.onset;
        this.stages = this.selectedDisease.diseaseStage;
        this.findings = this.selectedDisease.clinicalTnmFinding;
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
