import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { OntologyClass } from 'src/app/models/base';
import { OntologyTreeNode } from 'src/app/models/ontology-treenode';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ontology-tree-select',
    templateUrl: './tree-select.component.html',
    styleUrls: ['./tree-select.component.scss'],
})
export class TreeSelectComponent {
    // tslint:disable-next-line:no-input-rename
    @Output()
    ontologyObjectEvent = new EventEmitter<OntologyClass[]>();
    @Input()
    ontologyObjects: OntologyClass[];

    /**
     * Ontology nodes
     */
    @Input()
    nodes: any[];

    /**
     * Selection mode: can be single, checkbox, multiple or tricheckbox
     */
    @Input()
    selectionMode = 'checkbox';

    phenopacketSubscription: Subscription;

    selectedNodesStr: string[] = [];
    selectedNodes: OntologyTreeNode[] = [];

    constructor() {}

    nodeSelect(event) {
        // needed so that the programmatic changes to chips value are reflected in the UI
        const clonedArrayStr = Object.assign([], this.selectedNodesStr);
        clonedArrayStr.push(event.node.label);

        this.selectedNodesStr = clonedArrayStr;
        this.ontologyObjectEvent.emit(this.toOntologyClass(this.selectedNodes));
    }

    nodeUnselect(event) {
        // needed so that the programmatic changes to chips value are reflected in the UI
        const clonedArrayStr = Object.assign([], this.selectedNodesStr);
        const indexStr = this.selectedNodesStr.indexOf(event.node.label);

        console.log(indexStr);
        if (indexStr !== -1) {
            clonedArrayStr.splice(indexStr, 1);
            this.selectedNodesStr = clonedArrayStr;
        }
        this.ontologyObjectEvent.emit(this.toOntologyClass(this.selectedNodes));
    }

    /**
     *
     * @param ontologyNodes Transform to OntologyClass
     * @returns
     */
    toOntologyClass(ontologyNodes: OntologyTreeNode[]) {
        const ontologyList = [];
        for (const node of ontologyNodes) {
            ontologyList.push(new OntologyClass(node['key'], node['label']));
        }
        return ontologyList;
    }

    /**
     * Used if selectionMode equals 'tricheckbox'
     * @param node
     */
    nodeSelectionChange(node: any) {
        // needed so that the programmatic changes to chips value are reflected in the UI
        const clonedArray = Object.assign([], this.selectedNodesStr);

        if (node.state) {
            clonedArray.push(node.label);
            this.selectedNodesStr = clonedArray;
            this.selectedNodes.push(node);
        } else {
            const index = this.selectedNodes.indexOf(node);
            if (index !== -1) {
                clonedArray.splice(index, 1);
                this.selectedNodesStr = clonedArray;
                this.selectedNodes.splice(index, 1);
            }
        }
    }

}
