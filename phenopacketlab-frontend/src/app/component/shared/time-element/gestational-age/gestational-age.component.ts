import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { GestationalAge, TimeElement } from 'src/app/models/base';

@Component({
    selector: 'app-gestational-age',
    templateUrl: './gestational-age.component.html',
    styleUrls: ['./gestational-age.component.scss']
})

export class GestationalAgeComponent implements OnInit {

    @Output() gestationalAgeChange = new EventEmitter<GestationalAge>();

    @Input()
    gestationalAge: GestationalAge;

    weeks: number;
    days: number;

    constructor() {
    }

    ngOnInit(): void {
        if (this.gestationalAge && this.gestationalAge instanceof GestationalAge) {
            this.weeks = this.gestationalAge.weeks;
            this.days = this.gestationalAge.days;
        }
    }

    setGestationalAge(timeElement: TimeElement) {
        if (timeElement && timeElement.gestationalAge) {
            this.gestationalAge = timeElement.gestationalAge;
            this.weeks = this.gestationalAge.weeks;
            this.days = this.gestationalAge.days;
        }
    }
    updateGestationalAge(value: number, type: string) {
        if (this.gestationalAge === undefined || this.gestationalAge === null) {
            this.gestationalAge = new GestationalAge();
        }
        if (type === 'weeks') {
            if (value > 45) {
                value = 45;
            }
            this.weeks = value;
            this.gestationalAge.weeks = this.weeks;

        } else if (type === 'days') {
            if (value > 7) {
                value = 7;
            }
            this.days = value;
            this.gestationalAge.days = this.days;

        }
        this.gestationalAgeChange.emit(this.gestationalAge);
    }
    updateWeeks(event) {
        this.updateGestationalAge(event.value, 'weeks');
    }

    updateDays(event) {
        this.updateGestationalAge(event.value, 'days');
    }
}
