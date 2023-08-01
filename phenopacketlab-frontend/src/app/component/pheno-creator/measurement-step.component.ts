import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Measurement } from 'src/app/models/measurement';
import { Phenopacket } from 'src/app/models/phenopacket';
import { ProfileSelection } from 'src/app/models/profile';
import { PhenopacketStepperService } from 'src/app/services/phenopacket-stepper.service';

@Component({
    selector: 'app-measurement-step',
    templateUrl: './measurement-step.component.html',
    styleUrls: ['./pheno-creator.component.scss']
  })
export class MeasurementStepComponent implements OnInit, OnDestroy {

    phenopacket: Phenopacket;
    measurements: Measurement[];

    profileSelectionSubscription: Subscription;
    profileSelection: ProfileSelection;

    constructor (public phenopacketService: PhenopacketStepperService) {

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
