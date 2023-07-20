import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { File } from 'src/app/models/base';
import { ProfileSelection } from 'src/app/models/profile';
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

    constructor (public phenopacketService: PhenopacketService) {

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
}
