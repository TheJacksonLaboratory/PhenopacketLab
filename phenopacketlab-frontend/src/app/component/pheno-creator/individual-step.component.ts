import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { Individual } from 'src/app/models/individual';
import { MetaData } from 'src/app/models/metadata';
import { Phenopacket } from 'src/app/models/phenopacket';
import { Profile, ProfileSelection } from 'src/app/models/profile';
import { PhenopacketService } from 'src/app/services/phenopacket.service';

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

    constructor(public phenopacketService: PhenopacketService, private router: Router) {

    }

    ngOnInit() {
        // We only manage rare disease profile for now
        this.phenopacketService.setProfileSelection(ProfileSelection.RARE_DISEASE);
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

    nextPage() {
        if (this.phenopacket.id && this.phenopacket.subject.id
            && this.phenopacket.subject.isPrivateInfoWarnSelected) {
            // TODO Check if id already exists
            for (const profile of Profile.profileSelectionOptions) {
                if (this.profileSelection === profile.value) {
                    this.router.navigate([`creator/${profile.path}/phenotypic-features`]);
                    return;
                }
            }
            return;
        }
        this.submitted = true;
    }
}
