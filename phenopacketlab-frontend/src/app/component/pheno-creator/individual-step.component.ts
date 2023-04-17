import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Individual } from 'src/app/models/individual';
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

    summary: string;

    constructor(public phenopacketService: PhenopacketService, private router: Router) {

    }

    ngOnInit() {
        this.phenopacket = this.phenopacketService.phenopacket;
        if (this.phenopacket === undefined) {
            this.phenopacket = new Phenopacket();
            this.phenopacket.subject = new Individual();
        }
        this.profileSelectionSubscription = this.phenopacketService.getProfileSelection().subscribe(profile => {
            this.profileSelection = profile;
        });
    }

    ngOnDestroy() {
        if (this.phenopacketSubscription) {
            this.phenopacketSubscription.unsubscribe();
        }
        if (this.profileSelectionSubscription) {
            this.profileSelectionSubscription.unsubscribe();
        }
    }

    updateIsPrivateInfoWarnSelected(isPrivateInfoWarnSelected: boolean) {
        this.isPrivateInfoWarnSelected = isPrivateInfoWarnSelected;
    }

    updateSubject(subject: Individual) {
        if (this.phenopacket) {
            this.phenopacket.subject = subject;
        }
    }

    nextPage() {
        if (this.phenopacket.id && this.phenopacket.subject.id && this.isPrivateInfoWarnSelected) {
            // TODO Check if id already exists
            this.phenopacketService.phenopacket = this.phenopacket;
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
