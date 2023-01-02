import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Interpretation } from 'src/app/models/interpretation';
import { Profile, ProfileSelection } from 'src/app/models/profile';
import { PhenopacketService } from 'src/app/services/phenopacket.service';

@Component({
    selector: 'app-interpretation-step',
    templateUrl: './interpretation-step.component.html',
    styleUrls: ['./pheno-creator.component.scss']
})
export class InterpretationStepComponent implements OnInit, OnDestroy {

    interpretations: Interpretation[];

    profileSelectionSubscription: Subscription;
    profileSelection: ProfileSelection;

    constructor(public phenopacketService: PhenopacketService, private router: Router) {

    }

    ngOnInit() {
        // this.interpretations = this.phenopacketService.getPhenopacket().interpretations;
        this.profileSelectionSubscription = this.phenopacketService.getProfileSelection().subscribe(profile => {
            this.profileSelection = profile;
        });
    }

    ngOnDestroy() {
        if (this.profileSelectionSubscription) {
            this.profileSelectionSubscription.unsubscribe();
        }
    }

    nextPage() {
        this.phenopacketService.phenopacket.interpretations = this.interpretations;
        // check profile and navigate to the corresponding step
        for (const profile of Profile.profileSelectionOptions) {
            if (this.profileSelection === ProfileSelection.ALL_AVAILABLE && profile.value === ProfileSelection.ALL_AVAILABLE) {
                this.router.navigate([`pheno-creator/${profile.path}/diseases`]);
                return;
            } else if (this.profileSelection === ProfileSelection.OTHER && profile.value === ProfileSelection.OTHER) {
                this.router.navigate([`pheno-creator/${profile.path}/diseases`]);
                return;
            }
            // Possible other profiles to come
        }
    }
    prevPage() {
        // check profile and navigate to the corresponding step
        for (const profile of Profile.profileSelectionOptions) {
            if (this.profileSelection === ProfileSelection.ALL_AVAILABLE && profile.value === ProfileSelection.ALL_AVAILABLE) {
                this.router.navigate([`pheno-creator/${profile.path}/biosamples`]);
                return;
            } else if (this.profileSelection === ProfileSelection.OTHER && profile.value === ProfileSelection.OTHER) {
                this.router.navigate([`pheno-creator/${profile.path}/biosamples`]);
                return;
            }
            // Possible other profiles to come
        }
    }
}
