import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Age, TimeElement } from 'src/app/models/base';

@Component({
    selector: 'app-age',
    templateUrl: './age.component.html',
    styleUrls: ['./age.component.scss']
})
export class AgeComponent implements OnInit {

    @Output() ageEvent = new EventEmitter<Age>();

    @Input()
    age: Age;

    years: number;
    months: number;
    days: number;

    constructor() {

    }
    ngOnInit(): void {
        if (this.age && this.age instanceof Age) {
            this.years = this.age.getYears();
            this.months = this.age.getMonths();
            this.days = this.age.getDays();
        }
    }

    setAge(timeElement: TimeElement) {
        if (timeElement && timeElement.age) {
            this.age = timeElement.age;
            this.years = this.age.getYears();
            this.months = this.age.getMonths();
            this.days = this.age.getDays();
        }
    }
    updateAge(value: number, type: string) {
        if (type === 'years') {
            if (value > 120) {
                value = 120;
            }
            this.years = value;
        } else if (type === 'months') {
            if (value > 11) {
                value = 11;
            }
            this.months = value;
        } else if (type === 'days') {
            if (value > 31) {
                value = 31;
            }
            this.days = value;
        }
        if (this.age === undefined || this.age === null) {
            this.age = new Age();
        }
        this.age.iso8601duration = Age.convertToIso8601(this.years, this.months, this.days);
        this.ageEvent.emit(this.age);
    }
    updateYears(event) {
        this.updateAge(event.value, 'years');
    }
    updateMonths(event) {
        this.updateAge(event.value, 'months');
    }
    updateDays(event) {
        this.updateAge(event.value, 'days');
    }
}
