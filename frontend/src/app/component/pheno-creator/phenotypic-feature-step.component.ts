import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { OntologyClass, TimeElement } from 'src/app/models/base';
import { OntologyTreeNode } from 'src/app/models/ontology-treenode';
import { Phenopacket } from 'src/app/models/phenopacket';
import { PhenotypicFeature } from 'src/app/models/phenotypic-feature';
import { Profile, ProfileSelection } from 'src/app/models/profile';
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

    onsetsNodes: OntologyTreeNode[];
    onsetsSubscription: Subscription;
    onsetApplied = false;
    onset: TimeElement;

    profileSelection: ProfileSelection;
    profileSelectionSubscription: Subscription;

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
            if (this.phenotypicFeatures) {
                if (this.phenotypicFeatures.length > 0) {
                    this.visible = true;
                }
            }
        }

        this.phenopacketSubscription = this.phenopacketService.getPhenopacket().subscribe(phenopacket => {
            this.phenopacket = phenopacket;
            this.phenotypicFeatures = phenopacket.phenotypicFeatures;
        });
        // get onsets
        this.onsetsSubscription = this.phenopacketService.getOnsets().subscribe(nodes => {
            this.onsetsNodes = <OntologyTreeNode[]>nodes.data;
        });
        // get profile
        this.profileSelectionSubscription = this.phenopacketService.getProfileSelection().subscribe(profile => {
            this.profileSelection = profile;
        });
        this.onset = this.phenopacket?.subject?.timeAtLastEncounter;
    }

    ngOnDestroy(): void {
        if (this.phenopacketSubscription) {
            this.phenopacketSubscription.unsubscribe();
        }
        if (this.onsetsSubscription) {
            this.onsetsSubscription.unsubscribe();
        }
        if (this.profileSelectionSubscription) {
            this.profileSelectionSubscription.unsubscribe();
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
            return;
        }
        // set unique key for feature table
        phenotypicFeature.key = this.getBiggestKey() + 1;
        this.phenotypicFeatures.push(phenotypicFeature);
        // we copy the array after each update so the ngChange method is triggered on the child component
        this.phenotypicFeatures = this.phenotypicFeatures.slice();
        setTimeout(() => this.visible = true, 0);

        this.phenopacket.phenotypicFeatures = this.phenotypicFeatures;
        this.submitted = true;
        // make table visible
        this.visible = true;
    }

    deleteFeature(feature: PhenotypicFeature) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete \'' + feature.type.label + '\'?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.phenotypicFeatures = this.phenotypicFeatures.filter(val => val.key !== feature.key);
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

    updatePhenotypicFeature(phenotypicFeature) {
        this.selectedFeature = phenotypicFeature;
    }

    addTextMinedFeatures(phenotypicFeatures: PhenotypicFeature[]) {
        phenotypicFeatures.forEach(feature => {
            this.addPhenotypicFeature(feature);
        });
    }

    updateAgeOnset(timeElement: any) {
        console.log('onset update');
        console.log(timeElement);
        this.onset = timeElement;
    }

    applyOnset() {
        this.onsetApplied = true;
        this.phenotypicFeatures.forEach(feature => {
            feature.onset = this.onset;
        });
        this.phenopacket.phenotypicFeatures = this.phenotypicFeatures;
        console.log('apply onset');
        console.log(this.onset);
    }

    editOnset() {
        this.onsetApplied = false;
    }
    /**
     * Called when a row is selected in the left side table
     * @param event
     */
    onRowSelect(event) {
        this.selectedFeature = event.data;
        this.searchService.setPhenotypicOnset(this.selectedFeature.onset);
        this.searchService.setPhenotypicResolution(this.selectedFeature.resolution);
    }

    nextPage() {
        this.phenopacketService.setPhenopacket(this.phenopacket);
        this.phenopacketService.phenopacket = this.phenopacket;
        // this.router.navigate(['pheno-creator/measurements']);
        // TODO temp while measuremtn is not done

        // check profile and navigate to the corresponding step
        for (const profile of Profile.profileSelectionOptions) {

            if (this.profileSelection === ProfileSelection.ALL_AVAILABLE && profile.value === ProfileSelection.ALL_AVAILABLE) {
                this.router.navigate([`pheno-creator/${profile.path}/measurements`]);
                return;
            } else if (this.profileSelection === ProfileSelection.RARE_DISEASE && profile.value === ProfileSelection.RARE_DISEASE) {
                this.router.navigate([`pheno-creator/${profile.path}/diseases`]);
                return;
            } else if (this.profileSelection === ProfileSelection.OTHER && profile.value === ProfileSelection.OTHER) {
                this.router.navigate([`pheno-creator/${profile.path}/diseases`]);
                return;
            }
        }

        this.submitted = true;

        // console.log(this.phenopacketService.getPhenopacket());
    }
    prevPage() {
        this.phenopacketService.phenopacket = this.phenopacket;
        // check profile and navigate to the corresponding step
        for (const profile of Profile.profileSelectionOptions) {
            if (this.profileSelection === profile.value) {
                this.router.navigate([`pheno-creator/${profile.path}/individual`]);
                return;
            }
        }
    }
}
