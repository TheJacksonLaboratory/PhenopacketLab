import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Disease } from 'src/app/models/disease';
import { MedicalAction } from 'src/app/models/medical-action';
import { Phenopacket } from 'src/app/models/phenopacket';
import { ProfileSelection } from 'src/app/models/profile';
import { PhenopacketStepperService } from 'src/app/services/phenopacket-stepper.service';

@Component({
    selector: 'app-medical-action-step',
    templateUrl: './medical-action-step.component.html',
    styleUrls: ['./pheno-creator.component.scss']
})
export class MedicalActionStepComponent implements OnInit, OnDestroy {
    phenopacket: Phenopacket;
    medicalActions: MedicalAction[];
    diseases: Disease[];

    profileSelectionSubscription: Subscription;
    profileSelection: ProfileSelection;

    constructor(public phenopacketService: PhenopacketStepperService,
        private router: Router) {

    }

    ngOnInit() {
        this.phenopacket = this.phenopacketService.phenopacket;
        if (this.phenopacket === undefined) {
            // navigate to first page of creator as phenopacket is not created
            this.router.navigate(['creator/individual']);
            this.phenopacketService.setProfileSelection(ProfileSelection.RARE_DISEASE);
        } else {
            this.medicalActions = this.phenopacket.medicalActions;
            this.diseases = this.phenopacket.diseases;
        }
        this.profileSelectionSubscription = this.phenopacketService.getProfileSelection().subscribe(profile => {
            this.profileSelection = profile;
        });
    }

    ngOnDestroy() {
        if (this.profileSelectionSubscription) {
            this.profileSelectionSubscription.unsubscribe();
        }
    }

    updateMedicalActions(medicalActions: MedicalAction[]) {
        if (this.phenopacket) {
            this.medicalActions = medicalActions;
            this.phenopacket.medicalActions = medicalActions;
        }
    }
}
