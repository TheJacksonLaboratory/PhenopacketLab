import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OntologyTreeNode } from 'src/app/models/ontology-treenode';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ontology-tree-select',
    templateUrl: './tree-select.component.html',
    styleUrls: ['./tree-select.component.scss'],
})
export class TreeSelectComponent implements OnInit {

    /**
     * Ontology nodes
     */
    @Input()
    nodes: any[];

    /**
     * Preselected nodes
     */
    @Input()
    selectedNodes;
    @Output()
    selectedNodesChange = new EventEmitter<OntologyTreeNode[]>();
    /**
     * Selection mode: can be single, checkbox, multiple or tricheckbox
     */
    @Input()
    selectionMode = 'multiple';

    loading: boolean = false;

    constructor() { }

    ngOnInit() {
        if (this.selectedNodes === undefined) {
            this.selectedNodes = [];
        }
        this.setNodeSelection(this.nodes, this.selectedNodes);
    }

    setNodeSelection(treeNodes: OntologyTreeNode[], nodesSelected: OntologyTreeNode[]) {
        if (Array.isArray(treeNodes)) {
            for (const treeNode of treeNodes) {
                // Set selection
                if (Array.isArray(nodesSelected)) {
                    for (const selectedNode of nodesSelected) {
                        if (selectedNode.key === treeNode.key) {
                            treeNode.isSelected = true;
                        }
                    }
                }

                if (treeNode.children) {
                    this.setNodeSelection(treeNode.children, nodesSelected);
                }
            }
        }
    }

    nodeSelect() {
        this.selectedNodesChange.emit(this.selectedNodes);
    }

    /**
     * Not used
     * @param node
     */
    chipRemoved(node: OntologyTreeNode) {
        // remove from selectedNodes
        const index = this.selectedNodes.indexOf(node, 0);
        if (index > -1) {
            this.selectedNodes.splice(index, 1);
        }
        this.selectedNodesChange.emit(this.selectedNodes);
    }
    selectionChange(checked: boolean, node: OntologyTreeNode) {
        // update selectedNodes
        if (checked === false) {
            // remove from selectedNodes
            const index =  this.selectedNodes.findIndex(x => x.key === node.key);
            if (index > -1) {
                this.selectedNodes.splice(index, 1);
            }
        } else {
            this.selectedNodes.push(node);
        }
        this.setNodeSelection(this.nodes, this.selectedNodes);
        console.log(this.selectedNodes);
        this.selectedNodesChange.emit(this.selectedNodes);
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

    // nodeExpand(event: any) {
    //     if (event.node) {
    //         this.loading = true;
    //         setTimeout(() => {
    //             this.nodeService.getLazyFiles().then((nodes) => {
    //                 event.node.children = nodes;
    //                 this.messageService.add({ severity: 'info', summary: 'Children Loaded', detail: event.node.label });
    //             });
    //             this.loading = false;
    //         }, 200);
    //     }
    // }

}
