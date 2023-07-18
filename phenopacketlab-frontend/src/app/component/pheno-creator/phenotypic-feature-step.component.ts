import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { Phenopacket } from 'src/app/models/phenopacket';
import { PhenotypicFeature } from 'src/app/models/phenotypic-feature';
import { Profile, ProfileSelection } from 'src/app/models/profile';
import { PhenopacketService } from 'src/app/services/phenopacket.service';
import { PhenotypeSearchService } from 'src/app/services/phenotype-search.service';
import { Utils } from '../shared/utils';
import { PhenotypicFeatureSearchDialogComponent } from '../shared/dialog/phenotypic-feature-search-dialog/phenotypic-feature-search-dialog.component';
import { PhenotypicFeatureDialogComponent } from '../shared/dialog/phenotypic-feature-dialog/phenotypic-feature-dialog.component';

@Component({
    providers: [ConfirmationService, DialogService],
    selector: 'app-phenotypic-feature-step',
    templateUrl: './phenotypic-feature-step.component.html',
    styleUrls: ['./pheno-creator.component.scss']
})
export class PhenotypicFeatureStepComponent implements OnInit, OnDestroy {

    phenopacket: Phenopacket;
    submitted = false;
    phenopacketSubscription: Subscription;

    // table contents of phenotypic features
    selectedFeature: PhenotypicFeature;
    phenotypicFeatures: PhenotypicFeature[] = [];

    expandedTextMining = false;

    profileSelection: ProfileSelection;
    profileSelectionSubscription: Subscription;

    ref: DynamicDialogRef;


    constructor(public searchService: PhenotypeSearchService,
        public phenopacketService: PhenopacketService,
        private confirmationService: ConfirmationService,
        private dialogService: DialogService,
        private messageService: MessageService,
        private router: Router,
        private primengConfig: PrimeNGConfig) {
    }


    ngOnInit() {
        this.primengConfig.ripple = true;
        this.phenopacket = this.phenopacketService.phenopacket;
        if (this.phenopacket === undefined) {
            // navigate to first page of creator as phenopacket is not created
            this.router.navigate(['creator/individual']);
        } else {
            this.phenotypicFeatures = this.phenopacket.phenotypicFeatures;
            console.log(this.phenotypicFeatures);
        }
        this.phenopacketSubscription = this.phenopacketService.getPhenopacket().subscribe(phenopacket => {
            this.phenopacket = phenopacket;
            this.phenotypicFeatures = phenopacket.phenotypicFeatures;
        });
        // get profile
        this.profileSelectionSubscription = this.phenopacketService.getProfileSelection().subscribe(profile => {
            this.profileSelection = profile;
        });
    }

    ngOnDestroy(): void {
        if (this.phenopacketSubscription) {
            this.phenopacketSubscription.unsubscribe();
        }
        if (this.profileSelectionSubscription) {
            this.profileSelectionSubscription.unsubscribe();
        }
    }

    addFeatures() {
        this.ref = this.dialogService.open(PhenotypicFeatureSearchDialogComponent, {
            header: 'Search for feature term(s)',
            width: '50%',
            contentStyle: { 'overflow': 'auto' },
            baseZIndex: 10000,
            resizable: true,
            draggable: true,
            modal: true,
            data: {
                profile: this.profileSelection
            }
        });

        this.ref.onClose.subscribe((featuresResult: PhenotypicFeature[]) => {
            if (this.phenotypicFeatures === undefined) {
                this.phenotypicFeatures = [];
            }
            if (featuresResult) {
                for (const feat of featuresResult) {
                    const indexToUpdate = this.phenotypicFeatures.findIndex(item => item.type.id === feat.type.id);
                    feat.key = Utils.getBiggestKey(this.phenotypicFeatures) + 1;
                    if (indexToUpdate === -1) {
                        this.phenotypicFeatures.push(feat);
                    } else {
                        this.phenotypicFeatures[indexToUpdate] = feat;
                        this.phenotypicFeatures = Object.assign([], this.phenotypicFeatures);
                    }
                }
                // emit change
                this.phenopacket.phenotypicFeatures = this.phenotypicFeatures;
                this.submitted = true;
            }
        });
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

    editPhenotypicFeature(feature?: PhenotypicFeature) {
        this.ref = this.dialogService.open(PhenotypicFeatureDialogComponent, {
            header: 'Edit Phenotypic feature',
            width: '50%',
            contentStyle: { 'overflow': 'auto' },
            baseZIndex: 10000,
            resizable: true,
            draggable: true,
            data: { phenotypicFeature: feature }
        });

        this.ref.onClose.subscribe((phenoFeature: PhenotypicFeature) => {
            if (phenoFeature) {
                const indexToUpdate = this.phenotypicFeatures.findIndex(item => item.key === phenoFeature.key);
                if (indexToUpdate === -1) {
                    this.phenotypicFeatures.push(phenoFeature);
                } else {
                    this.phenotypicFeatures[indexToUpdate] = phenoFeature;
                    this.phenotypicFeatures = Object.assign([], this.phenotypicFeatures);
                }
            }
        });
    }

    nextPage() {
        this.phenopacketService.setPhenopacket(this.phenopacket);
        this.phenopacketService.phenopacket = this.phenopacket;
        // this.router.navigate(['creator/measurements']);
        // TODO temp while measuremtn is not done

        // check profile and navigate to the corresponding step
        for (const profile of Profile.profileSelectionOptions) {

            if (this.profileSelection === ProfileSelection.ALL_AVAILABLE && profile.value === ProfileSelection.ALL_AVAILABLE) {
                this.router.navigate([`creator/${profile.path}/measurements`]);
                return;
            } else if (this.profileSelection === ProfileSelection.RARE_DISEASE && profile.value === ProfileSelection.RARE_DISEASE) {
                this.router.navigate([`creator/${profile.path}/diseases`]);
                return;
            }
        }

        this.submitted = true;

    }
    prevPage() {
        this.phenopacketService.phenopacket = this.phenopacket;
        // check profile and navigate to the corresponding step
        for (const profile of Profile.profileSelectionOptions) {
            if (this.profileSelection === profile.value) {
                this.router.navigate([`creator/${profile.path}/individual`]);
                return;
            }
        }
    }
}
