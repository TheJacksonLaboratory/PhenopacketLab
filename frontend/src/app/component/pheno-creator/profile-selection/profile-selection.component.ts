import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

    profileSelectionOptions: any[];
    profileSelected: any;
    submitted = false;

    constructor(private router: Router) { }

    ngOnInit() {

        this.profileSelectionOptions = [
            { label: 'Rare disease', value: SelectionOptions.RARE_DISEASE },
            { label: 'All available steps', value: SelectionOptions.ALL_AVAILABLE },
            { label: 'Other', value: SelectionOptions.OTHER }
        ];

    }

    start() {
        if (this.profileSelected === SelectionOptions.ALL_AVAILABLE) {
            this.router.navigate(['pheno-creator/all']);
        }
        if (this.profileSelected === SelectionOptions.RARE_DISEASE) {
            this.router.navigate(['pheno-creator/rare']);
        }
        if (this.profileSelected === SelectionOptions.OTHER) {
            this.router.navigate(['pheno-creator/rare']);
        }

    }

}

export enum SelectionOptions {
    RARE_DISEASE,
    ALL_AVAILABLE,
    OTHER
}
