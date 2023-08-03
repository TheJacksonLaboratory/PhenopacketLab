import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { Individual } from 'src/app/models/individual';
import { MetaData } from 'src/app/models/metadata';
import { Phenopacket } from 'src/app/models/phenopacket';
import { ProfileSelection } from 'src/app/models/profile';
import { PhenopacketStepperService } from 'src/app/services/phenopacket-stepper.service';

@Component({
    selector: 'app-individual-step',
    templateUrl: './individual-step.component.html',
    styleUrls: ['./pheno-creator.component.scss']
})
export class IndividualStepComponent implements OnInit, OnDestroy {

    phenopacket: Phenopacket;

    phenopacketSubscription: Subscription;
    submitted = false;

    profileSelectionSubscription: Subscription;
    profileSelection: ProfileSelection;

    isPrivateInfoWarnSelected: boolean;
    privateInfoWarnSelectedSubscription: Subscription;

    summary: string;

    constructor(public phenopacketService: PhenopacketStepperService) {

    }

    ngOnInit() {
        this.phenopacket = this.phenopacketService.phenopacket;
        if (this.phenopacket === undefined) {
            this.phenopacket = new Phenopacket();
            this.phenopacket.subject = new Individual();
            this.phenopacket.subject.isPrivateInfoWarnSelected = false;
            this.phenopacket.metaData = new MetaData();
        }
        this.profileSelectionSubscription = this.phenopacketService.getProfileSelection().subscribe(profile => {
            this.profileSelection = profile;
        });
        // set isPrivateInfoSelected
        if (this.phenopacket?.subject) {
            this.isPrivateInfoWarnSelected = this.phenopacket.subject.isPrivateInfoWarnSelected;
        }

        // Initialize the phenopacket
        this.phenopacketService.phenopacket = this.phenopacket;

    }

    ngOnDestroy() {
        if (this.phenopacketSubscription) {
            this.phenopacketSubscription.unsubscribe();
        }
        if (this.profileSelectionSubscription) {
            this.profileSelectionSubscription.unsubscribe();
        }
    }

    generateNewID() {
        if (this.phenopacket) {
            this.phenopacket.id = uuidv4();
        }
    }

    updateSubject(subject: Individual) {
        if (this.phenopacket) {
            this.phenopacket.subject = subject;
        }
    }
}
