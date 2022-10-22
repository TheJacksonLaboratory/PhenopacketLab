import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Subscription } from 'rxjs';
import { OntologyClass } from 'src/app/models/base';
import { PhenopacketService } from 'src/app/services/phenopacket.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ontology-tree-select',
    templateUrl: './tree-select.component.html',
    styleUrls: ['./tree-select.component.scss'],
    // tslint:disable-next-line:no-host-metadata-property
    // host: {
    //     '[class.floating]': 'shouldLabelFloat',
    //     '[id]': 'id',
    // },
})
export class TreeSelectComponent implements OnInit, OnDestroy {
    // tslint:disable-next-line:no-input-rename
    @Output()
    ontologyObjectEvent = new EventEmitter<OntologyClass[]>();
    @Input()
    ontologyObjects: OntologyClass[];

    phenopacketSubscription: Subscription;

    selectedNodes: any[] = [];
    nodes: any[];

    // label: string;
    // id: string;

    constructor(public phenopacketService: PhenopacketService) {

    }
    ngOnInit(): void {
        // make modifiers more generic
        this.phenopacketSubscription = this.phenopacketService.getModifiers().subscribe(nodes => {
            console.log(nodes);
            this.nodes = <TreeNode[]>nodes.data;
        }
        );
        // if (this.ontologyObject) {
        //     this.label = this.ontologyObject.label;
        //     this.id = this.ontologyObject.id;
        // }
    }

    ngOnDestroy() {
        if (this.phenopacketSubscription) {
            this.phenopacketSubscription.unsubscribe();
        }
    }
    updateOntologyClass() {
        // if (this.ontologyObject === undefined) {
        //     this.ontologyObject = new OntologyClass(this.id, this.label);

        // } else {
        //     this.ontologyObject.id = this.id;
        //     this.ontologyObject.label = this.label;
        // }
        this.ontologyObjectEvent.emit(this.selectedNodes);
    }

}
