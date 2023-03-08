import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { File } from 'src/app/models/base';
import { Profile, ProfileSelection } from 'src/app/models/profile';
import { PhenopacketService } from 'src/app/services/phenopacket.service';

@Component({
    selector: 'app-file-step',
    templateUrl: './file-step.component.html',
    styleUrls: ['./pheno-creator.component.scss']
  })
export class FileStepComponent implements OnInit, OnDestroy {

    files: File[];

    profileSelectionSubscription: Subscription;
    profileSelection: ProfileSelection;

    constructor (public phenopacketService: PhenopacketService, private router: Router) {

    }

    ngOnInit() {
        // this.files = this.phenopacketService.getPhenopackt().files;
        this.profileSelectionSubscription = this.phenopacketService.getProfileSelection().subscribe(profile => {
            this.profileSelection = profile;
        });
    }

    ngOnDestroy() {
        if (this.profileSelectionSubscription) {
            this.profileSelectionSubscription.unsubscribe();
        }
    }

    nextPage() {
        this.phenopacketService.phenopacket.files = this.files;
        for (const profile of Profile.profileSelectionOptions) {
            if (this.profileSelection === ProfileSelection.ALL_AVAILABLE && profile.value === ProfileSelection.ALL_AVAILABLE) {
                this.router.navigate([`creator/${profile.path}/validate`]);
                return;
            }
            // Possible other profiles to come
        }
    }
    prevPage() {
        for (const profile of Profile.profileSelectionOptions) {
            if (this.profileSelection === ProfileSelection.ALL_AVAILABLE && profile.value === ProfileSelection.ALL_AVAILABLE) {
                this.router.navigate([`creator/${profile.path}/medical-actions`]);
                return;
            }
            // Possible other profiles to come
        }
    }
}
