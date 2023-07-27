import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MedicalAction } from 'src/app/models/medical-action';
import { ProfileSelection } from 'src/app/models/profile';
import { PhenopacketService } from 'src/app/services/phenopacket.service';

@Component({
    selector: 'app-medical-action-step',
    templateUrl: './medical-action-step.component.html',
    styleUrls: ['./pheno-creator.component.scss']
})
export class MedicalActionStepComponent implements OnInit, OnDestroy {

    medicalActions: MedicalAction[];

    profileSelectionSubscription: Subscription;
    profileSelection: ProfileSelection;

    constructor(public phenopacketService: PhenopacketService) {

    }

    ngOnInit() {
        this.phenopacketService.getPhenopacket().subscribe(phenopacket => {
            this.medicalActions = phenopacket.medicalActions;
        });
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
