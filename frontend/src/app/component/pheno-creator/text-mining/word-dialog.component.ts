import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MiningState, PhenotypicFeature } from 'src/app/models/phenotypic-feature';

@Component({
    selector: 'app-word-dialog',
    templateUrl: 'word-dialog.component.html',
    styleUrls: ['word-dialog.component.scss']
})
export class WordDialogComponent {

    phenotypicFeature: PhenotypicFeature;

    constructor(public dialogRef: MatDialogRef<WordDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.phenotypicFeature = data['feature'];
    }

    updateExcluded(event) {
        if (this.phenotypicFeature) {
            this.phenotypicFeature.excluded = !event.checked;
        }
    }
    approve() {
        this.dialogRef.close({ data: {key: this.phenotypicFeature.key, state: MiningState.APPROVED}});
    }
    reject() {
        this.dialogRef.close({data: {key: this.phenotypicFeature.key, state: MiningState.REJECTED}});
    }

}
