import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';

/**
 * Node for to-do item
 */
export class OntologyNode {
    children: OntologyNode[];
    label?: string;
}

/** Flat to-do label node with expandable and level information */
export class OntologyFlatNode {
    label: string;
    level: number;
    expandable: boolean;
}

/**
 * The Json object for to-do list data.
 */
const TREE_DATA = [{

    label: 'Groceries',
    children: [{
        label: 'Almond Meal flour'
    }, {
        label: 'Organic eggs'
    }, {
        label: 'Protein Powder'
    }, {
        label: 'Fruits',
        children: [{
            label: 'Apple'
        }, {
            label: 'Blueberry'
        }, {
            label: 'Raspberry'
        }]
    }, {
        label: 'Reminders',
        children: [{
            label: 'Cook dinner'
        }, {
            label: 'Read the Material Design spec'
        }, {
            label: 'Upgrade Application to Angular'
        }, {
            label: 'Fruits',
            children: [{
                label: 'Orange'
            }, {
                label: 'Mango'
            }]
        }]
    }, {
        label: 'Reminders1',
        children: [{
            label: 'Cook dinner 1'
        }, {
            label: 'Read the Material Design spec 1'
        }, {
            label: 'Upgrade Application to Angular 1'
        }, {
            label: 'Fruits',
            children: [{
                label: 'Apple'
            }, {
                label: 'Berries',
                children: [{
                    label: 'Grapes'
                }, {
                    label: 'Pomegranate'
                }]
            }, {
                label: 'Orange'
            }]
        }]
    }, {
        label: 'Reminders2',
        children: [{
            label: 'Cook dinner 2'
        }, {
            label: 'Read the Material Design spec 2'
        }, {
            label: 'Upgrade Application to Angular 2'
        }, {
            label: 'Fruits',
            children: [{
                label: 'Apple'
            }, {
                label: 'Berries',
                children: [{
                    label: 'Grapes1'
                }, {
                    label: 'Pomegranate'
                }]
            }, {
                label: 'Orange'
            }]
        }]
    }]
}];

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do label or a category.
 * If a node is a category, it has children labels and new labels can be added under the category.
 */
@Injectable()
export class ChecklistDatabase {
    dataChange = new BehaviorSubject<OntologyNode[]>([]);
    get data(): OntologyNode[] { return this.dataChange.value; }

    constructor() {
        this.initialize();
    }

    initialize() {
        // Build the tree nodes from Json object  . The result is a list of `TodolabelNode` with nested
        //     file node as children.
        const data = this.buildFileTree(TREE_DATA, 0);
        console.log(data);
        // Notify the change.
        this.dataChange.next(data);
    }

    /**
     * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
     * The return value is the list of `TodolabelNode`.
     */
    buildFileTree(obj: { [key: string]: any }, level: number): any[] {
        return Object.keys(obj).reduce<any[]>((accumulator, key) => {
            const value = obj[key];
            const node = new OntologyNode();
            node.label = key;

            if (value != null) {
                if (typeof value === 'object') {
                    if ('children' in value) {
                        node.label = value.label;
                        node.children = this.buildFileTree(value.children, level + 1);
                    } else {
                        node.label = value.label;
                    }
                } else {
                    node.label = value.label;
                }
            }

            return accumulator.concat(
                {
                    ...node,
                    otherInfo: key
                }
            );
        }, []);
    }

    /** Add an label to to-do list */
    insertlabel(parent: OntologyNode, name: string) {
        if (parent.children) {
            parent.children.push({ label: name } as OntologyNode);
            this.dataChange.next(this.data);
        }
    }

    updatelabel(node: OntologyNode, name: string) {
        node.label = name;
        this.dataChange.next(this.data);
    }
}

/**
 * @title Tree with checkboxes
 */
@Component({
    selector: 'app-tree-search',
    templateUrl: 'tree-search.component.html',
    styleUrls: ['tree-search.component.scss'],
    providers: [ChecklistDatabase]
})
export class TreeSearchComponent {
    /** Map from flat node to nested node. This helps us finding the nested node to be modified */
    flatNodeMap = new Map<OntologyFlatNode, OntologyNode>();

    searchString = '';

    /** Map from nested node to flattened node. This helps us to keep the same object for selection */
    nestedNodeMap = new Map<OntologyNode, OntologyFlatNode>();

    /** A selected parent node to be inserted */
    selectedParent: OntologyFlatNode | null = null;

    /** The new item's name */
    newItemName = '';

    treeControl: FlatTreeControl<OntologyFlatNode>;

    treeFlattener: MatTreeFlattener<OntologyNode, OntologyFlatNode>;

    dataSource: MatTreeFlatDataSource<OntologyNode, OntologyFlatNode>;

    /** The selection for checklist */
    checklistSelection = new SelectionModel<OntologyFlatNode>(true /* multiple */);

    constructor(private _database: ChecklistDatabase) {
        this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
            this.isExpandable, this.getChildren);
        this.treeControl = new FlatTreeControl<OntologyFlatNode>(this.getLevel, this.isExpandable);
        this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

        _database.dataChange.subscribe(data => {
            this.dataSource.data = data;

            this.treeControl.expand(this.treeControl.dataNodes[0]);
        });
    }

    getLevel = (node: OntologyFlatNode) => node.level;

    isExpandable = (node: OntologyFlatNode) => node.expandable;

    getChildren = (node: OntologyNode): OntologyNode[] => node.children;

    hasChild = (_: number, _nodeData: OntologyFlatNode) => _nodeData.expandable;

    hasNoContent = (_: number, _nodeData: OntologyFlatNode) => _nodeData.label === '';

    /**
     * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
     */
    transformer = (node: OntologyNode, level: number) => {
        const existingNode = this.nestedNodeMap.get(node);
        const flatNode = existingNode && existingNode.label === node.label
            ? existingNode
            : new OntologyFlatNode();
        flatNode.label = node.label;
        flatNode.level = level;
        flatNode.expandable = !!node.children?.length;
        this.flatNodeMap.set(flatNode, node);
        this.nestedNodeMap.set(node, flatNode);
        return flatNode;
    }

    // search filter logic start
    filterLeafNode(node: OntologyFlatNode): boolean {
        if (!this.searchString) {
            return false;
        }
        return node.label.toLowerCase()
            .indexOf(this.searchString?.toLowerCase()) === -1;

    }

    filterParentNode(node: OntologyFlatNode): boolean {

        if (
            !this.searchString ||
            node.label.toLowerCase().indexOf(this.searchString?.toLowerCase()) !==
            -1
        ) {
            return false;
        }
        const descendants = this.treeControl.getDescendants(node);

        if (
            descendants.some(
                (descendantNode) =>
                    descendantNode.label
                        .toLowerCase()
                        .indexOf(this.searchString?.toLowerCase()) !== -1
            )
        ) {
            return false;
        }

        return true;
    }
    // search filter logic end

    /** Whether all the descendants of the node are selected. */
    //    descendantsAllSelected(node: OntologyFlatNode): boolean {
    //      const descendants = this.treeControl.getDescendants(node);
    //      const descAllSelected = descendants.length > 0 && descendants.every(child => {
    //        return this.checklistSelection.isSelected(child);
    //      });
    //      return descAllSelected;
    //    }

    //    /** Whether part of the descendants are selected */
    //    descendantsPartiallySelected(node: OntologyFlatNode): boolean {
    //      const descendants = this.treeControl.getDescendants(node);
    //      const result = descendants.some(child => this.checklistSelection.isSelected(child));
    //      return result && !this.descendantsAllSelected(node);
    //    }

    /** Toggle the to-do item selection. Select/deselect all the descendants node */
    todoItemSelectionToggle(node: OntologyFlatNode): void {

        this.checklistSelection.toggle(node);
        //  const descendants = this.treeControl.getDescendants(node);
        //  this.checklistSelection.isSelected(node)
        //    ? this.checklistSelection.select(...descendants)
        //    : this.checklistSelection.deselect(...descendants);

        // Force update for the parent
        //  descendants.forEach(child => this.checklistSelection.isSelected(child));
        //  this.checkAllParentsSelection(node);
    }

    /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
    todoLeafItemSelectionToggle(node: OntologyFlatNode): void {
        this.checklistSelection.toggle(node);
        //  this.checkAllParentsSelection(node);
    }

    /* Checks all the parents when a leaf node is selected/unselected */
    //    checkAllParentsSelection(node: OntologyFlatNode): void {
    //      let parent: OntologyFlatNode | null = this.getParentNode(node);
    //      while (parent) {
    //        this.checkRootNodeSelection(parent);
    //        parent = this.getParentNode(parent);
    //      }
    //    }

    /** Check root node checked state and change it accordingly */
    //    checkRootNodeSelection(node: OntologyFlatNode): void {
    //      const nodeSelected = this.checklistSelection.isSelected(node);
    //      const descendants = this.treeControl.getDescendants(node);
    //      const descAllSelected = descendants.length > 0 && descendants.every(child => {
    //        return this.checklistSelection.isSelected(child);
    //      });
    //      if (nodeSelected && !descAllSelected) {
    //        this.checklistSelection.deselect(node);
    //      } else if (!nodeSelected && descAllSelected) {
    //        this.checklistSelection.select(node);
    //      }
    //    }

    /* Get the parent node of a node */
    getParentNode(node: OntologyFlatNode): OntologyFlatNode | null {
        const currentLevel = this.getLevel(node);

        if (currentLevel < 1) {
            return null;
        }

        const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

        for (let i = startIndex; i >= 0; i--) {
            const currentNode = this.treeControl.dataNodes[i];

            if (this.getLevel(currentNode) < currentLevel) {
                return currentNode;
            }
        }
        return null;
    }

}


/**  Copyright 2021 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
