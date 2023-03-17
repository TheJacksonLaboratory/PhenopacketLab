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
   * @returns
   */
  public static toOntologyClass(ontologyNodes: OntologyTreeNode[]) {
    const ontologyList = [];
    for (const node of ontologyNodes) {
      ontologyList.push(new OntologyClass(node['key'], node['label']));
    }
    return ontologyList;
  }
}
