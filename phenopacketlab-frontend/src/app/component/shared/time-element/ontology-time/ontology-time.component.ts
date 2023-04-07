import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { Subscription } from 'rxjs';
import { OntologyClass, TimeElementId } from 'src/app/models/base';
import { DiseaseSearchService } from 'src/app/services/disease-search.service';
import { PhenotypeSearchService } from 'src/app/services/phenotype-search.service';

@Component({
    selector: 'app-ontology-time',
    templateUrl: './ontology-time.component.html',
    styleUrls: ['./ontology-time.component.scss']
})
export class OntologyTimeComponent implements OnInit, OnDestroy {

    @Output() ontologyClassChange = new EventEmitter<any>();

    @Input()
    ontologyClass: any;
    @Input()
    ontologyNodes: any[];
    @Input()
    timeElementId: TimeElementId;

    phenotypicOnsetSubscription: Subscription;
    diseaseOnsetSubscription: Subscription;

    constructor(private phenotypeSearchService: PhenotypeSearchService, private diseaseSearchService: DiseaseSearchService) {

    }
    ngOnInit(): void {
        console.log('ngInit Ontology time element');
        console.log(this.ontologyClass);

        this.phenotypicOnsetSubscription = this.phenotypeSearchService.getPhenotypicOnset().subscribe(onset => {
            if (this.timeElementId === TimeElementId.PHENOTYPIC_ONSET) {
                this.setOntologyClass(onset);
            }
        });
        this.diseaseOnsetSubscription = this.diseaseSearchService.getDiseaseOnset().subscribe(onset => {
            if (this.timeElementId === TimeElementId.DISEASE_ONSET) {
                this.setOntologyClass(onset);
            }
        });
    }

    ngOnDestroy(): void {
        if (this.phenotypicOnsetSubscription) {
            this.phenotypicOnsetSubscription.unsubscribe();
        }
        if (this.diseaseOnsetSubscription) {
            this.diseaseOnsetSubscription.unsubscribe();
        }
    }

    setOntologyClass(timeElement: any) {
        if (timeElement?.element instanceof OntologyClass) {
            this.ontologyClass = timeElement.element;
            // this.ontologyClass = OntologyTreeNode.getNodeWithKey(timeElement.element.id, this.ontologyNodes);
            // this.ontologyClass = timeElement.element;
        }
    }
    updateOntologyClass(event: any) {
        if (this.ontologyClass === undefined || this.ontologyClass === null) {
            this.ontologyClass = new OntologyClass();
        }
        this.ontologyClass.label = event.node.label;
        this.ontologyClass.id = event.node.key;

        this.ontologyClassChange.emit(this.ontologyClass);
    }

}
