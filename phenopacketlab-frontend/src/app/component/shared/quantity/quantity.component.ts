import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { OntologyClass } from 'src/app/models/base';
import { Quantity } from 'src/app/models/measurement';
import { OntologyTreeNode } from 'src/app/models/ontology-treenode';
import { ConstantsService } from 'src/app/services/constants.service';

@Component({
    selector: 'app-quantity',
    templateUrl: './quantity.component.html',
    styleUrls: ['./quantity.component.scss']
})
export class QuantityComponent implements OnInit, OnDestroy {

    @Input()
    quantity: Quantity;

    @Output()
    quantityChange = new EventEmitter<Quantity>();

    unitSubscription: Subscription;
    unitNodes: OntologyTreeNode[];

    constructor(public constantsService: ConstantsService) {
    }

    ngOnInit() {
        this.unitSubscription = this.constantsService.getUnits().subscribe(nodes => {
            if (nodes) {
                this.unitNodes = <OntologyTreeNode[]>nodes.children;
            }
        });
    }
    ngOnDestroy(): void {
        if (this.unitSubscription) {
            this.unitSubscription.unsubscribe();
        }
    }

    updateUnit(eventObj) {
        if (this.quantity === undefined) {
            this.quantity = new Quantity();
        }
        if (eventObj) {
            const id = eventObj.node.key.split(':')[1];
            this.quantity.unit = new OntologyClass(eventObj.node.key, eventObj.node.label, eventObj.node.key, `http://purl.obolibrary.org/obo/NCIT_${id}`);
        } else {
            this.quantity.unit = undefined;
        }
        this.quantityChange.emit(this.quantity);
    }

    updateValue(value) {
        if (this.quantity === undefined) {
            this.quantity = new Quantity();
        }
        if (value) {
            this.quantity.value = value;
        } else {
            this.quantity.value = undefined;
        }
        this.quantityChange.emit(this.quantity);
    }

    updateReferenceRange(referenceRange) {

    }

}
