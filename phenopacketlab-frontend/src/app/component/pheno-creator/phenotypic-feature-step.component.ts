import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Phenopacket } from 'src/app/models/phenopacket';
import { PhenotypicFeature } from 'src/app/models/phenotypic-feature';
import { ProfileSelection } from 'src/app/models/profile';
import { PhenopacketService } from 'src/app/services/phenopacket.service';

@Component({
    selector: 'app-phenotypic-feature-step',
    templateUrl: './phenotypic-feature-step.component.html',
    styleUrls: ['./pheno-creator.component.scss']
})
export class PhenotypicFeatureStepComponent implements OnInit, OnDestroy {

    phenopacket: Phenopacket;

    phenotypicFeatures: PhenotypicFeature[] = [];

    profileSelection: ProfileSelection;
    profileSelectionSubscription: Subscription;

    constructor(private phenopacketService: PhenopacketService,
        private router: Router) {
    }


    ngOnInit() {
        this.phenopacket = this.phenopacketService.phenopacket;
        if (this.phenopacket === undefined) {
            // navigate to first page of creator as phenopacket is not created
            this.router.navigate(['creator/individual']);
        } else {
            this.phenotypicFeatures = this.phenopacket.phenotypicFeatures;
        }
        // get profile
        this.profileSelectionSubscription = this.phenopacketService.getProfileSelection().subscribe(profile => {
            this.profileSelection = profile;
        });
    }

    ngOnDestroy(): void {
        if (this.profileSelectionSubscription) {
            this.profileSelectionSubscription.unsubscribe();
        }
    }

    updatePhenotypicFeatures(features: PhenotypicFeature[]) {
        if (this.phenopacket) {
            this.phenotypicFeatures = features;
            this.phenopacket.phenotypicFeatures = features;
        }
    }
}
