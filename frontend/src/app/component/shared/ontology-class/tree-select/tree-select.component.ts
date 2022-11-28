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

    /**
     * Ontology nodes
     */
    @Input()
    nodes: any[];

    /**
     * Preselected nodes
     */
    @Input()
    selectedNodes = [];
    @Output()
    selectedNodesChange = new EventEmitter<OntologyClass[]>();
    /**
     * Selection mode: can be single, checkbox, multiple or tricheckbox
     */
    @Input()
    selectionMode = 'checkbox';

    phenopacketSubscription: Subscription;

    selectedNodesStr: string[] = [];

    constructor() {}

    nodeSelect(event) {
        this.selectedNodesChange.emit(this.selectedNodes);
    }

    nodeUnselect(event) {
        this.selectedNodesChange.emit(this.selectedNodes);
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

        if (node.state) {
            this.selectedNodes.push(node);
        } else {
            const index = this.selectedNodes.indexOf(node);
            if (index !== -1) {
                this.selectedNodes.splice(index, 1);
            }
        }
    }

}
