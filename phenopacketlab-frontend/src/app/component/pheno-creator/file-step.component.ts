import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { File } from 'src/app/models/base';
import { Phenopacket } from 'src/app/models/phenopacket';
import { ProfileSelection } from 'src/app/models/profile';
import { PhenopacketStepperService } from 'src/app/services/phenopacket-stepper.service';

@Component({
    selector: 'app-file-step',
    templateUrl: './file-step.component.html',
    styleUrls: ['./pheno-creator.component.scss']
})
export class FileStepComponent implements OnInit, OnDestroy {

    files: File[];
    phenopacket: Phenopacket;

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
            this.files = this.phenopacket.files;
        }
        this.profileSelectionSubscription = this.phenopacketService.getProfileSelection().subscribe(profile => {
            this.profileSelection = profile;
        });
    }
    ngOnDestroy(): void {
        if (this.profileSelectionSubscription) {
            this.profileSelectionSubscription.unsubscribe();
        }
    }

    updateFiles(files: File[]) {
        if (this.phenopacket) {
            this.files = files;
            this.phenopacket.files = files;
        }
    }
}
