import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Interpretation } from 'src/app/models/interpretation';
import { Phenopacket } from 'src/app/models/phenopacket';
import { ProfileSelection } from 'src/app/models/profile';
import { PhenopacketService } from 'src/app/services/phenopacket.service';

@Component({
    selector: 'app-interpretation-step',
    templateUrl: './interpretation-step.component.html',
    styleUrls: ['./pheno-creator.component.scss']
})
export class InterpretationStepComponent implements OnInit, OnDestroy {

    phenopacket: Phenopacket;
    interpretations: Interpretation[];

    profileSelection: ProfileSelection;
    profileSelectionSubscription: Subscription;


    constructor(public phenopacketService: PhenopacketService,
        private router: Router) {
    }


    ngOnInit() {
        this.phenopacket = this.phenopacketService.phenopacket;
        if (this.phenopacket === undefined) {
            // navigate to first page of creator as phenopacket is not created
            this.router.navigate(['pheno-creator/individual']);
            this.phenopacketService.setProfileSelection(ProfileSelection.RARE_DISEASE);
        } else {
            this.interpretations = this.phenopacket.interpretations;
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

    updateInterpretations(interpretations: Interpretation[]) {
        if (this.phenopacket) {
            this.interpretations = interpretations;
            this.phenopacket.interpretations = interpretations;
        }
    }
}
