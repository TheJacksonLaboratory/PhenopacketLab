import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BioSample } from 'src/app/models/biosample';
import { Phenopacket } from 'src/app/models/phenopacket';
import { ProfileSelection } from 'src/app/models/profile';
import { PhenopacketStepperService } from 'src/app/services/phenopacket-stepper.service';

@Component({
    selector: 'app-biosample-step',
    templateUrl: './biosample-step.component.html',
    styleUrls: ['./pheno-creator.component.scss']
})
export class BiosampleStepComponent implements OnInit, OnDestroy {

    phenopacket: Phenopacket;
    biosamples: BioSample[];

    profileSelectionSubscription: Subscription;
    profileSelection: ProfileSelection;

    constructor(public phenopacketService: PhenopacketStepperService) {

    }

    ngOnInit() {
        this.phenopacket = this.phenopacketService.phenopacket;
        this.profileSelectionSubscription = this.phenopacketService.getProfileSelection().subscribe(profile => {
            this.profileSelection = profile;
        });
    }

    ngOnDestroy() {
        if (this.profileSelectionSubscription) {
            this.profileSelectionSubscription.unsubscribe();
        }
    }
}
