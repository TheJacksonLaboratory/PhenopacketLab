import { Component, EventEmitter, Output } from '@angular/core';
import { Age } from 'src/app/models/base';

/** Error when invalid control is dirty, touched, or submitted. */
// export class MyErrorStateMatcher implements ErrorStateMatcher {
//     isErrorState(control: UntypedFormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//         const isSubmitted = form && form.submitted;
//         return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//     }
// }

@Component({
    selector: 'app-age',
    templateUrl: './age.component.html',
    styleUrls: ['./age.component.scss']
})

export class AgeComponent {

    @Output() ageEvent = new EventEmitter<Age>();

    years: number;
    months: number;
    days: number;

    constructor() {

    }

    updateAge() {
        let yearsStr = '';
        if (this.years) {
            yearsStr = `${this.years}Y`;
        }
        let monthsStr = '';
        if (this.months) {
            monthsStr = `${this.months}M`;
        }
        let daysStr = '';
        if (this.days) {
            daysStr = `${this.days}D`;
        }

        const age = new Age();
        age.iso8601duration = `P${yearsStr}${monthsStr}${daysStr}`;
        this.ageEvent.emit(age);

    }
}
