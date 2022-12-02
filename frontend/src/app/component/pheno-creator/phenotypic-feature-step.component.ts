import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Evidence, OntologyClass } from 'src/app/models/base';
import { Severities } from 'src/app/models/disease';
import { OntologyTreeNode } from 'src/app/models/ontology-treenode';
import { Phenopacket } from 'src/app/models/phenopacket';
import { PhenotypicFeature } from 'src/app/models/phenotypic-feature';
import { PhenopacketService } from 'src/app/services/phenopacket.service';
import { PhenotypeSearchService } from 'src/app/services/phenotype-search.service';
import { SpinnerDialogComponent } from '../shared/spinner-dialog/spinner-dialog.component';

@Component({
    providers: [ConfirmationService],
    selector: 'app-phenotypic-feature-step',
    templateUrl: './phenotypic-feature-step.component.html',
    styleUrls: ['./pheno-creator.component.scss']
})
export class PhenotypicFeatureStepComponent implements OnInit, OnDestroy {

    label = '';
    id = '';
    visible = false;
    phenopacket: Phenopacket;
    phenotypicFeatures: PhenotypicFeature[] = [];
    submitted = false;
    phenopacketSubscription: Subscription;

    // table contents of phenotypic features
    selectedFeature: PhenotypicFeature;
    // searchparams
    currSearchParams: any = {};
    spinnerDialogRef: any;

    observed: boolean;

    severity: OntologyClass;
    // modifiers
    modifiers: OntologyClass[];
    modifiersNodes: OntologyTreeNode[];
    modifiersSubscription: Subscription;
    // evidence
    evidences: Evidence[];
    evidencesNodes: OntologyTreeNode[];
    evidencesSubscription: Subscription;
    // onset
    onsetsNodes: OntologyTreeNode[];
    onset: any;
    onsetsSubscription: Subscription;

    phenoIndex = 0;

    constructor(public searchService: PhenotypeSearchService,
        public phenopacketService: PhenopacketService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private router: Router, public dialog: MatDialog,
        private primengConfig: PrimeNGConfig) {
    }


    ngOnInit() {
        this.primengConfig.ripple = true;
        this.phenopacket = this.phenopacketService.phenopacket;
        if (this.phenopacket === undefined) {
            // navigate to first page of creator as phenopacket is not created
            this.router.navigate(['pheno-creator/individual']);
        } else {
            this.phenotypicFeatures = this.phenopacket.phenotypicFeatures;
        }

        // Get modifiers
        this.modifiersSubscription = this.phenopacketService.getModifiers().subscribe(nodes => {
            this.modifiersNodes = <OntologyTreeNode[]>nodes.data;
        }
        );
        // get Evidences
        this.evidencesNodes = this.getEvidences();
        // get onsets
        this.onsetsSubscription = this.phenopacketService.getOnsets().subscribe(nodes => {
            this.onsetsNodes = <OntologyTreeNode[]>nodes.data;
        });
        this.phenopacketSubscription = this.phenopacketService.getPhenopacket().subscribe(phenopacket => {
            this.phenopacket = phenopacket;
            this.phenotypicFeatures = phenopacket.phenotypicFeatures;
        });
        this.phenopacket = this.phenopacketService.phenopacket;
        this.phenotypicFeatures = this.phenopacket?.phenotypicFeatures;
        if (this.phenotypicFeatures) {
            if (this.phenotypicFeatures.length > 0) {
                this.visible = true;
            }
        }
    }

    ngOnDestroy(): void {
        if (this.phenopacketSubscription) {
            this.phenopacketSubscription.unsubscribe();
        }
        if (this.modifiersSubscription) {
            this.modifiersSubscription.unsubscribe();
        }
        if (this.onsetsSubscription) {
            this.onsetsSubscription.unsubscribe();
        }
    }

    // Used for phenotypic feature search bar
    onSearchCriteriaChange(searchCriteria: any) {
        this.currSearchParams.offset = 0;
        const id = searchCriteria.selectedItems[0].selectedValue.id;

        if ((searchCriteria.selectedItems && searchCriteria.selectedItems.length > 0)) {
            this.currSearchParams = searchCriteria;
            this._queryPhenotypicFeatureById(id);
        }
    }

    private _queryPhenotypicFeatureById(id: string) {
        this.openSpinnerDialog();
        this.searchService.queryPhenotypicFeatureById(id).subscribe(data => {
            const phenotypicFeature = new PhenotypicFeature();
            phenotypicFeature.key = this.getBiggestKey() + 1;
            phenotypicFeature.type = new OntologyClass(data.id, data.name);
            phenotypicFeature.excluded = false;
            this.addPhenotypicFeature(phenotypicFeature);
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
        for (const feature of this.phenotypicFeatures) {
            if ((feature.key) >= key) {
                key = feature.key;
            }
        }
        return key;
    }

    /**
     * Adds a new phenotypic feature.
     **/
    addPhenotypicFeature(phenotypicFeature?: PhenotypicFeature) {
        if (phenotypicFeature === undefined) {
            phenotypicFeature = new PhenotypicFeature();
            phenotypicFeature.type.id = this.id;
            phenotypicFeature.type.label = this.label;
        }
        this.phenotypicFeatures.push(phenotypicFeature);
        // we copy the array after each update so the ngChange method is triggered on the child component
        this.phenotypicFeatures = this.phenotypicFeatures.slice();
        setTimeout(() => this.visible = true, 0);

        this.phenopacket.phenotypicFeatures = this.phenotypicFeatures;
        this.submitted = true;
        // make table visible
        this.visible = true;

    }

    getSeverities() {
        return Severities.VALUES;
    }

    getEvidences() {
        const nodes = [];
        for (const evidence of Evidence.VALUES) {
            nodes.push({label: evidence.label, key: evidence.id, leaf: true, parent: undefined});
        }
        return nodes;
    }

    updateExcluded(event) {
        if (this.selectedFeature) {
            this.selectedFeature.excluded = !event.checked;
        }
    }
    updateModifiers(modifiers: any[]) {
        if (this.selectedFeature) {
            this.selectedFeature.modifiers = modifiers;
        }
    }
    updateSeverity(event) {
        if (this.selectedFeature) {
            this.selectedFeature.severity = event.value;
        }
    }
    updateOnset(timeElement: any) {
        if (this.selectedFeature) {
            this.selectedFeature.onset = timeElement;
        }
    }
    updateEvidences(evidences: any[]) {
        if (this.selectedFeature) {
            this.selectedFeature.evidence = evidences;
        }
    }

    /**
     * Called when a row is selected in the left side table
     * @param event
     */
    onRowSelect(event) {
        this.selectedFeature = event.data;
        this.updateSelection();
    }

    /**
     * Update components on the right side pane with all data from the selected phenotypic feature
     */
    updateSelection() {
        this.id = this.selectedFeature.type.id;
        this.label = this.selectedFeature.type.label;
        this.observed = !this.selectedFeature.excluded;
        this.modifiers = this.selectedFeature.modifiers;
        this.evidences = this.selectedFeature.evidence;
        this.severity = this.selectedFeature.severity;
        this.onset = this.selectedFeature.onset;
        // this.phenopacketService.setTimeElement(this.onset);
    }

    deleteFeature(feature: PhenotypicFeature) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete \'' + feature.type.label + '\'?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.phenotypicFeatures = this.phenotypicFeatures.filter(val => val.type.id !== feature.type.id);
                this.selectedFeature = null;
                this.phenopacket.phenotypicFeatures = this.phenotypicFeatures;
                if (this.phenotypicFeatures.length === 0) {
                    this.visible = false;
                }
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Feature Deleted', life: 3000 });
            },
            reject: () => {
                this.confirmationService.close();
            }
        });
    }

    nextPage() {
        // this.phenopacket.phenotypicFeatures = this.phenotypicFeatures;
        // console.log(this.phenopacket);
        // this.phenopacketService.setPhenopacket(this.phenopacket);
        this.phenopacketService.phenopacket = this.phenopacket;
        // this.router.navigate(['pheno-creator/measurements']);
        // TODO temp while measuremtn is not done
        this.router.navigate(['pheno-creator/diseases']);
        this.submitted = true;

        // console.log(this.phenopacketService.getPhenopacket());
    }
    prevPage() {
        this.phenopacketService.phenopacket = this.phenopacket;
        this.router.navigate(['pheno-creator/individual']);
    }
}
