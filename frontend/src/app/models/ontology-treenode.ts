import { TreeNode } from 'primeng/api';

export class OntologyTreeNode<T = any> implements TreeNode {
    label?: string;
    data?: T;
    icon?: string;
    expandedIcon?: any;
    collapsedIcon?: any;
    children?: OntologyTreeNode<T>[];
    leaf?: boolean;
    expanded?: boolean;
    type?: string;
    parent?: OntologyTreeNode<T>;
    partialSelected?: boolean;
    style?: string;
    styleClass?: string;
    draggable?: boolean;
    droppable?: boolean;
    selectable?: boolean;
    key?: string;

    parents?: OntologyTreeNode<T>[];
    state?: any;
}
