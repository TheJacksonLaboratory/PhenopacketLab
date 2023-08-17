import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { Subscription } from 'rxjs';
import { Age, AgeRange, TimeElement } from 'src/app/models/base';

@Component({
    selector: 'app-age-range',
    templateUrl: './age-range.component.html',
    styleUrls: ['./age-range.component.scss']
})
export class AgeRangeComponent implements OnInit, OnDestroy {

    @Output() ageRangeChange = new EventEmitter<AgeRange>();

    @Input()
    ageRange: AgeRange;

    yearsStart: number;
    monthsStart: number;
    daysStart: number;
    yearsEnd: number;
    monthsEnd: number;
    daysEnd: number;

    phenotypicOnsetSubscription: Subscription;
    phenotypicResolutionSubscription: Subscription;
    diseaseOnsetSubscription: Subscription;
    diseaseResolutionSubscription: Subscription;

    constructor() {
    }

    ngOnInit(): void {
        if (this.ageRange && this.ageRange instanceof AgeRange) {
            this.yearsStart = this.ageRange.start.getYears();
            this.monthsStart = this.ageRange.start.getMonths();
            this.daysStart = this.ageRange.start.getDays();
            this.yearsEnd = this.ageRange.end.getYears();
            this.monthsEnd = this.ageRange.end.getMonths();
            this.daysEnd = this.ageRange.end.getDays();
        }
    }

    ngOnDestroy(): void {
        if (this.phenotypicOnsetSubscription) {
            this.phenotypicOnsetSubscription.unsubscribe();
        }
        if (this.phenotypicResolutionSubscription) {
            this.phenotypicResolutionSubscription.unsubscribe();
        }
        if (this.diseaseOnsetSubscription) {
            this.diseaseOnsetSubscription.unsubscribe();
        }
        if (this.diseaseResolutionSubscription) {
            this.diseaseResolutionSubscription.unsubscribe();
        }
    }

    setAgeRange(timeElement: TimeElement) {
        if (timeElement && timeElement.ageRange) {
            this.ageRange = timeElement.ageRange;
            this.yearsStart = this.ageRange.start.getYears();
            this.monthsStart = this.ageRange.start.getMonths();
            this.daysStart = this.ageRange.start.getDays();
            this.yearsEnd = this.ageRange.end.getYears();
            this.monthsEnd = this.ageRange.end.getMonths();
            this.daysEnd = this.ageRange.end.getDays();
        }
    }
    updateAgeRange(value: number, type: string) {
        if (type === 'yearsStart') {
            this.yearsStart = value;
        } else if (type === 'monthsStart') {
            this.monthsStart = value;
        } else if (type === 'daysStart') {
            this.daysStart = value;
        } else if (type === 'yearsEnd') {
            this.yearsEnd = value;
        } else if (type === 'monthsEnd') {
            this.monthsEnd = value;
        } else if (type === 'daysEnd') {
            this.daysEnd = value;
        }
        if (this.ageRange === undefined || this.ageRange === null) {
            this.ageRange = new AgeRange(new Age(), new Age());
        }
        this.ageRange.start.iso8601duration = Age.convertToIso8601(this.yearsStart, this.monthsStart, this.daysStart);
        this.ageRange.end.iso8601duration = Age.convertToIso8601(this.yearsEnd, this.monthsEnd, this.daysEnd);
        this.ageRangeChange.emit(this.ageRange);
    }

    updateYearsStart(event) {
        this.updateAgeRange(event.value, 'yearsStart');
    }
    updateMonthsStart(event) {
        this.updateAgeRange(event.value, 'monthsStart');
    }
    updateDaysStart(event) {
        this.updateAgeRange(event.value, 'daysStart');
    }

    updateYearsEnd(event) {
        this.updateAgeRange(event.value, 'yearsEnd');
    }
    updateMonthsEnd(event) {
        this.updateAgeRange(event.value, 'monthsEnd');
    }
    updateDaysEnd(event) {
        this.updateAgeRange(event.value, 'daysEnd');
    }
}
