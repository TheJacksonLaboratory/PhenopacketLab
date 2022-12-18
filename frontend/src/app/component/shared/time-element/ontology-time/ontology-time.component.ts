import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { Subscription } from 'rxjs';
import { OntologyClass, TimeElementId } from 'src/app/models/base';
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
    phenotypicResolutionSubscription: Subscription;

    constructor(private phenotypeSearchService: PhenotypeSearchService) {

    }
    ngOnInit(): void {
        console.log('ngInit Ontology time element');
        console.log(this.ontologyClass);

        this.phenotypicOnsetSubscription = this.phenotypeSearchService.getPhenotypicOnset().subscribe(onset => {
            if (this.timeElementId === TimeElementId.PHENOTYPIC_ONSET) {
                this.setOntologyClass(onset);
            }
        });
        this.phenotypicResolutionSubscription = this.phenotypeSearchService.getPhenotypicResolution().subscribe(resolution => {
            if (this.timeElementId === TimeElementId.PHENOTYPIC_RESOLUTION) {
                this.setOntologyClass(resolution);
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
    }

    setOntologyClass(timeElement: any) {
        console.log('set ontology class');
        console.log(timeElement);
        if (timeElement?.element instanceof OntologyClass) {

            console.log(timeElement);
            this.ontologyClass = timeElement.element;
            // this.ontologyClass = OntologyTreeNode.getNodeWithKey(timeElement.element.id, this.ontologyNodes);
            console.log(this.ontologyClass);
            // this.ontologyClass = timeElement.element;
        }
    }
    updateOntologyClass(event: any) {
        if (this.ontologyClass === undefined || this.ontologyClass === null) {
            this.ontologyClass = new OntologyClass();
        }
        console.log(event);
        this.ontologyClass.label = event.node.label;
        this.ontologyClass.id = event.node.key;

        this.ontologyClassChange.emit(this.ontologyClass);
    }

}
