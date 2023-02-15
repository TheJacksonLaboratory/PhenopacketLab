import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { Subscription } from 'rxjs';
import { Age, TimeElement, TimeElementId } from 'src/app/models/base';
import { DiseaseSearchService } from 'src/app/services/disease-search.service';
import { PhenotypeSearchService } from 'src/app/services/phenotype-search.service';

@Component({
    selector: 'app-age',
    templateUrl: './age.component.html',
    styleUrls: ['./age.component.scss']
})
export class AgeComponent implements OnInit, OnDestroy {

    @Output() ageEvent = new EventEmitter<Age>();

    @Input()
    age: Age;

    @Input()
    timeElementId: TimeElementId;

    years: number;
    months: number;
    days: number;

    phenotypicOnsetSubscription: Subscription;
    phenotypicResolutionSubscription: Subscription;
    diseaseOnsetSubscription: Subscription;
    diseaseResolutionSubscription: Subscription;

    constructor(private phenotypeSearchService: PhenotypeSearchService, private diseaseSearchService: DiseaseSearchService) {

    }
    ngOnInit(): void {
        console.log('ngInit Age');
        console.log(this.age);
        if (this.age && this.age instanceof Age) {
            this.years = this.age.getYears();
            this.months = this.age.getMonths();
            this.days = this.age.getDays();
        }
        this.phenotypicOnsetSubscription = this.phenotypeSearchService.getPhenotypicOnset().subscribe(onset => {
            if (this.timeElementId === TimeElementId.PHENOTYPIC_ONSET) {
                this.setAge(onset);
            }
        });
        this.phenotypicResolutionSubscription = this.phenotypeSearchService.getPhenotypicResolution().subscribe(resolution => {
            if (this.timeElementId === TimeElementId.PHENOTYPIC_RESOLUTION) {
                this.setAge(resolution);
            }
        });
        this.diseaseOnsetSubscription = this.diseaseSearchService.getDiseaseOnset().subscribe(onset => {
            if (this.timeElementId === TimeElementId.DISEASE_ONSET) {
                this.setAge(onset);
            }
        });
        this.diseaseResolutionSubscription = this.diseaseSearchService.getDiseaseResolution().subscribe(resolution => {
            if (this.timeElementId === TimeElementId.DISEASE_RESOLUTION) {
                this.setAge(resolution);
            }
        });
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
            this.years = value;
        } else if (type === 'months') {
            this.months = value;
        } else if (type === 'days') {
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
