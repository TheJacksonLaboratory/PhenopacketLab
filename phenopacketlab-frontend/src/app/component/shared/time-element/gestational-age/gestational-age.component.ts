import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { Subscription } from 'rxjs';
import { GestationalAge, TimeElement, TimeElementId } from 'src/app/models/base';
import { DiseaseSearchService } from 'src/app/services/disease-search.service';
import { PhenotypeSearchService } from 'src/app/services/phenotype-search.service';

@Component({
    selector: 'app-gestational-age',
    templateUrl: './gestational-age.component.html',
    styleUrls: ['./gestational-age.component.scss']
})

export class GestationalAgeComponent implements OnInit, OnDestroy {

    @Output() gestationalAgeChange = new EventEmitter<GestationalAge>();

    @Input()
    gestationalAge: GestationalAge;

    @Input()
    timeElementId: TimeElementId;

    weeks: number;
    days: number;

    phenotypicOnsetSubscription: Subscription;
    phenotypicResolutionSubscription: Subscription;
    diseaseOnsetSubscription: Subscription;
    diseaseResolutionSubscription: Subscription;

    constructor(private phenotypeSearchService: PhenotypeSearchService, private diseaseSearchService: DiseaseSearchService) {
    }

    ngOnInit(): void {
        if (this.gestationalAge && this.gestationalAge instanceof GestationalAge) {
            this.weeks = this.gestationalAge.weeks;
            this.days = this.gestationalAge.days;
        }

        this.phenotypicOnsetSubscription = this.phenotypeSearchService.getPhenotypicOnset().subscribe(onset => {
            if (this.timeElementId === TimeElementId.PHENOTYPIC_ONSET) {
                this.setGestationalAge(onset);
            }
        });
        this.phenotypicResolutionSubscription = this.phenotypeSearchService.getPhenotypicResolution().subscribe(resolution => {
            if (this.timeElementId === TimeElementId.PHENOTYPIC_RESOLUTION) {
                this.setGestationalAge(resolution);
            }
        });
        this.diseaseOnsetSubscription = this.diseaseSearchService.getDiseaseOnset().subscribe(onset => {
            if (this.timeElementId === TimeElementId.DISEASE_ONSET) {
                this.setGestationalAge(onset);
            }
        });
        this.diseaseResolutionSubscription = this.diseaseSearchService.getDiseaseResolution().subscribe(resolution => {
            if (this.timeElementId === TimeElementId.DISEASE_RESOLUTION) {
                this.setGestationalAge(resolution);
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
            if (value > 31) {
                value = 31;
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
