import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { OntologyClass } from 'src/app/models/base';

@Component({
    selector: 'app-ontology-time',
    templateUrl: './ontology-time.component.html',
    styleUrls: ['./ontology-time.component.scss']
})
export class OntologyTimeComponent implements OnInit {

    @Output() ontologyClassChange = new EventEmitter<any>();

    @Input()
    ontologyClass: any;
    @Input()
    ontologyNodes: any[];

    constructor() {

    }
    ngOnInit(): void {
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
