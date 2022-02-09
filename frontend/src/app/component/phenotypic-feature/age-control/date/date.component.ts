import { Component } from "@angular/core";
import { FormControl, FormGroupDirective, NgForm, Validators } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'app-date',
    templateUrl: './date.component.html',
    styleUrls: ['./date.component.scss']
})

export class DateComponent {

    yearFormControl = new FormControl('', [
        Validators.required,
        Validators.pattern(/^([0-9]|[1-9][0-9]|1[0-4][0-9]|150)$/)
    ]);
    monthFormControl = new FormControl('', [
        Validators.required,
        Validators.pattern(/^([0-9]|1[011])$/)
    ]);
    dayFormControl = new FormControl('', [
        Validators.required,
        Validators.pattern(/^([0-9]|[1-2][0-9]|[3][0])$/)
    ]);

    matcher = new MyErrorStateMatcher();

}