import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { MiningState, PhenotypicFeature } from 'src/app/models/phenotypic-feature';

@Component({
    selector: 'app-word-dialog',
    templateUrl: 'word-dialog.component.html',
    styleUrls: ['word-dialog.component.scss']
})
export class WordDialogComponent {

    phenotypicFeature: PhenotypicFeature;

    constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
        this.phenotypicFeature = config.data?.feature;
    }

    updateExcluded(event) {
        if (this.phenotypicFeature) {
            this.phenotypicFeature.excluded = !event.checked;
        }
    }
    approve() {
        this.ref.close({ key: this.phenotypicFeature.key, state: MiningState.APPROVED });
    }
    reject() {
        this.ref.close({ key: this.phenotypicFeature.key, state: MiningState.REJECTED });
    }

}
