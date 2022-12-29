import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhenopacketService } from 'src/app/services/phenopacket.service';

export enum ProfileSelection {
    RARE_DISEASE = 'rare',
    ALL_AVAILABLE = 'all',
    OTHER = 'other'
}

@Component({
    selector: 'app-profile-selection',
    templateUrl: './profile-selection.component.html',
    styleUrls: ['./profile-selection.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed, void', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
            transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ]
})
export class ProfileSelectionComponent implements OnInit {
    static profileSelectionOptions = [
        // tslint:disable-next-line:max-line-length
        { label: 'Rare disease', value: ProfileSelection.RARE_DISEASE, path: 'rare', steps: ['phenotypic-features', 'diseases', 'validate'] },
        { label: 'All available steps', value: ProfileSelection.ALL_AVAILABLE, path: 'all', steps: ['phenotypic-features', 'measurements', 'biosamples', 'interpretations', 'diseases', 'medical-actions', 'files', 'validate'] },
        { label: 'Other', value: ProfileSelection.OTHER, path: 'other', steps: ['phenotypic-features', 'measurement', 'biosamples', 'interpretations', 'diseases', 'medical-actions', 'files', 'validate']  }
    ];

    options: any;
    profileSelected: any;
    submitted = false;

    constructor(private phenopacketService: PhenopacketService, private router: Router) { }

    ngOnInit() {
        this.options = ProfileSelectionComponent.profileSelectionOptions;
    }

    start() {
        for (const profile of ProfileSelectionComponent.profileSelectionOptions) {
            if (this.profileSelected === profile.value) {
                this.phenopacketService.setProfileSelection(profile.value);
                this.router.navigate([`pheno-creator/${profile.path}`]);
            }
        }
    }

}
