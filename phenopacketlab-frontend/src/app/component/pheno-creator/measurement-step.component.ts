import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Measurement } from 'src/app/models/measurement';
import { ProfileSelection } from 'src/app/models/profile';
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

    constructor (public phenopacketService: PhenopacketService) {

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
}
