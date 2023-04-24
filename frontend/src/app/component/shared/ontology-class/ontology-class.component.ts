import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OntologyClass } from 'src/app/models/base';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ontology-class-input',
    templateUrl: './ontology-class.component.html',
    styleUrls: ['./ontology-class.component.scss'],
    // tslint:disable-next-line:no-host-metadata-property
    // host: {
    //     '[class.floating]': 'shouldLabelFloat',
    //     '[id]': 'id',
    //   },
})
export class OntologyClassComponent implements OnInit {
    // tslint:disable-next-line:no-input-rename
    @Output()
    ontologyObjectEvent = new EventEmitter<OntologyClass>();
    @Input()
    ontologyObject: OntologyClass;

    label: string;
    id: string;

    ngOnInit(): void {
       if (this.ontologyObject) {
        this.label = this.ontologyObject.label;
        this.id = this.ontologyObject.id;
       }
    }

    updateOntologyClass() {
        if (this.ontologyObject === undefined) {
            this.ontologyObject = new OntologyClass(this.id, this.label);

        } else {
            this.ontologyObject.id = this.id;
            this.ontologyObject.label = this.label;
        }
        this.ontologyObjectEvent.emit(this.ontologyObject);
    }

}
