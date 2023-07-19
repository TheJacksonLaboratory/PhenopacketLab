import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Measurement } from 'src/app/models/measurement';
import { Profile, ProfileSelection } from 'src/app/models/profile';
import { PhenopacketService } from 'src/app/services/phenopacket.service';

@Component({
    selector: 'app-measurement-step',
    templateUrl: './measurement-step.component.html',
    styleUrls: ['./pheno-creator.component.scss']
  })
export class MeasurementStepComponent implements OnInit, OnDestroy {

    measurements: Measurement[];

    profileSelectionSubscription: Subscription;
    profileSelection: ProfileSelection;

    constructor (public phenopacketService: PhenopacketService, private router: Router) {

    }

    ngOnInit() {
        // this.measurements = this.phenopacketService.getPhenopacket().measurements;
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
        // check profile and navigate to the corresponding step
        for (const profile of Profile.profileSelectionOptions) {
            if (this.profileSelection === ProfileSelection.ALL_AVAILABLE && profile.value === ProfileSelection.ALL_AVAILABLE) {
                this.router.navigate([`creator/${profile.path}/biosamples`]);
                return;
            }
            // Possible other profiles to come
        }
    }

    prevPage() {
        // check profile and navigate to the corresponding step
        for (const profile of Profile.profileSelectionOptions) {
            if (this.profileSelection === ProfileSelection.ALL_AVAILABLE && profile.value === ProfileSelection.ALL_AVAILABLE) {
                this.router.navigate([`creator/${profile.path}/phenotypic-features`]);
                return;
            }
            // Possible other profiles to come
        }
    }
}
