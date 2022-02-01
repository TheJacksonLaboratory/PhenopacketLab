import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Component, Input } from "@angular/core";
import { MatChipInputEvent } from "@angular/material/chips";

@Component({
    selector: 'app-select-chip',
    templateUrl: './select-chip.component.html',
    styleUrls: ['./select-chip.component.scss']
})

export class SelectChipComponent {
    addOnBlur = true;
    removable = true;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];

    @Input()
    description: string;
    @Input()
    label: string;
    @Input()
    placeholderLabel: string;
    @Input()
    values: string[];

    addValue(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Add our modifier
        // var numberValue = parseFloat(value);
        const idx = this.values.indexOf(value);
        if (value !== '' && idx == -1) {
            this.values.push(value);
            // this.setEvidenceValues();
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }
    }

    removeValue(value: string): void {
        const index = this.values.indexOf(value);

        if (index >= 0) {
            this.values.splice(index, 1);
        }
        for (let i = 0; i < this.values.length; i++) {
            console.log(this.values[i]);
        }
    }

}