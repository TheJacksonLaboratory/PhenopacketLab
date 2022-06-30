import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OntologyClass } from 'src/app/models/base';

@Component({
    selector: 'app-ontology-class',
    templateUrl: './ontology-class.component.html',
    styleUrls: ['./ontology-class.component.scss'],
})
export class OntologyClassComponent implements OnInit {
    @Output()
    ontologyObjectEvent = new EventEmitter<OntologyClass>();
    @Input()
    ontologyObject: OntologyClass;
    // title of the OntologyClass Object
    @Input()
    title: string;
    labelControl = new FormControl('', [Validators.required]);
    labelSubscription: Subscription;
    idControl = new FormControl('', [Validators.required]);
    idSubscription: Subscription;

    label = "";
    id = "";

    ngOnInit(): void {
        if (this.ontologyObject) {
            this.label = this.ontologyObject.label;
            this.labelControl.setValue(this.label);
            this.id = this.ontologyObject.id;
            this.idControl.setValue(this.id);
        } else {
            this.ontologyObject = new OntologyClass(this.id, this.label);
        }

        if (this.labelSubscription) {
            this.labelSubscription.unsubscribe();
        }
        this.labelSubscription = this.labelControl.valueChanges.subscribe(value => {
            if (value && value.length > 0) {
                this.label = value;
                this.ontologyObject.label = this.label;
                this.ontologyObjectEvent.emit(this.ontologyObject);
            }
        });

        if (this.idSubscription) {
            this.idSubscription.unsubscribe();
        }
        this.idSubscription = this.idControl.valueChanges.subscribe(value => {
            if (value && value.length > 0) {
                this.id = value;
                this.ontologyObject.id = this.id;
                this.ontologyObjectEvent.emit(this.ontologyObject);
            }
        });
    }


}
