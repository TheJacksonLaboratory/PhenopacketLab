import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Age } from 'src/app/models/base';

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
        if (this.age) {
            this.years = this.age.getYears();
            this.months = this.age.getMonths();
            this.days = this.age.getDays();
        }
    }

    updateAge(value: number, type: string) {
        if (type === 'years') {
            this.years = value;
        } else if (type === 'months') {
            this.months = value;
        } else if (type === 'days') {
            this.days = value;
        }

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
        if (this.age === undefined) {
            this.age = new Age();
        }
        this.age.iso8601duration = `P${yearsStr}${monthsStr}${daysStr}`;
        this.ageEvent.emit(this.age);
    }
    updateYears(event) {
        console.log(event);
        this.updateAge(event.value, 'years');
    }
    updateMonths(event) {
        console.log(event);
        this.updateAge(event.value, 'months');
    }
    updateDays(event) {
        this.updateAge(event.value, 'days');
    }
}
