import { TreeNode } from 'primeng/api';
import { OntologyClass } from './base';

export class OntologyTreeNode<T = any> implements TreeNode {
  label?: string;
  data?: T;
  description?: string;
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

  /**
   * Returns a OntologyTreeNode given a key in a OntologyTreeNode tree
   * @param key
   * @param nodes
   * @returns
   */
  public static getNodeWithKey(key: string, nodes: OntologyTreeNode[]): OntologyTreeNode | undefined {
    for (const node of nodes) {
      if (node.key === key) {
        return node;
      }
      if (node.children) {
        const matchedNode = this.getNodeWithKey(key, node.children);
        if (matchedNode) {
          return matchedNode;
        }
      }
    }
    return undefined;
  }

  /**
   * Convert to OntologyClass
   * @param ontologyNodes
   * @param urlPrefix
   * @returns
   */
  public static toOntologyClass(ontologyNodes: OntologyTreeNode[], urlPrefix: string) {
    const ontologyList = [];
    for (const node of ontologyNodes) {
      const obj = new OntologyClass(node['key'], node['label']);
      obj.termUrl = `${urlPrefix}/${obj.id}`;
      ontologyList.push(new OntologyClass(node['key'], node['label']));
    }
    return ontologyList;
  }

  /**
   * Copy of an OntologyTreeNode
   */
  copy(): OntologyTreeNode {
    const ontologyTreeNodeCopy = new OntologyTreeNode();
    ontologyTreeNodeCopy.label = this.label;
    ontologyTreeNodeCopy.data = this.data;
    ontologyTreeNodeCopy.description = this.description;
    ontologyTreeNodeCopy.icon = this.icon;
    ontologyTreeNodeCopy.expandedIcon = this.expandedIcon;
    ontologyTreeNodeCopy.collapsedIcon = this.collapsedIcon;
    if (this.children) {
      ontologyTreeNodeCopy.children = [];
      for (const child of this.children) {
        ontologyTreeNodeCopy.children.push(child.copy());
      }
    }
    ontologyTreeNodeCopy.leaf = this.leaf;
    ontologyTreeNodeCopy.expanded = this.expanded;
    ontologyTreeNodeCopy.type = this.type;
    if (this.parent) {
      ontologyTreeNodeCopy.parent = this.parent.copy();
    }
    ontologyTreeNodeCopy.partialSelected = this.partialSelected;
    ontologyTreeNodeCopy.style = this.style;
    ontologyTreeNodeCopy.styleClass = this.styleClass;
    ontologyTreeNodeCopy.draggable = this.draggable;
    ontologyTreeNodeCopy.droppable = this.droppable;
    ontologyTreeNodeCopy.selectable = this.selectable;
    ontologyTreeNodeCopy.key = this.key;
    if (this.parents) {
      ontologyTreeNodeCopy.parents = [];
      for (const par of this.parents) {
        ontologyTreeNodeCopy.parents.push(par.copy());
      }
    }
    ontologyTreeNodeCopy.state = this.state;
    return ontologyTreeNodeCopy;
  }
}
