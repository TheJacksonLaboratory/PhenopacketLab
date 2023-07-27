import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BioSample } from 'src/app/models/biosample';
import { ProfileSelection } from 'src/app/models/profile';
import { PhenopacketService } from 'src/app/services/phenopacket.service';

@Component({
    selector: 'app-biosample-step',
    templateUrl: './biosample-step.component.html',
    styleUrls: ['./pheno-creator.component.scss']
})
export class BiosampleStepComponent implements OnInit, OnDestroy {

    biosamples: BioSample[];

    profileSelectionSubscription: Subscription;
    profileSelection: ProfileSelection;

    constructor(public phenopacketService: PhenopacketService) {

    }

    ngOnInit() {
        // this.biosamples = this.phenopacketService.getPhenopacket().biosamples;
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
