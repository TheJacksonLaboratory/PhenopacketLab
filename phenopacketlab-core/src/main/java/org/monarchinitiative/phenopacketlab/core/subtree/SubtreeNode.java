package org.monarchinitiative.phenopacketlab.core.subtree;

import java.util.*;


/**
 * A node of an ontology subtree. The node has the following attributes:
 * <ul>
 *     <li><em>key</em> - CURIE of the term, e.g. HP:1234567</li>
 *     <li><em>label</em> - term name, e.g. Hypertension</li>
 *     <li><em>children</em> - a list of node's child terms (empty for a leaf node)</li>
 * </ul>
 */
public class SubtreeNode {

    private final String key, label;
    private final List<SubtreeNode> children = new ArrayList<>();
    private final Comparator<SubtreeNode> comparator;

    public SubtreeNode(String key, String label, Comparator<SubtreeNode> comparator) {
        this.key = key;
        this.label = label;
        this.comparator = comparator;
    }

    public String getKey() {
        return key;
    }

    public String getLabel() {
        return label;
    }

    public List<SubtreeNode> getChildren() {
        if (comparator != null) {
            Collections.sort(children, comparator);
        }
        return children;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SubtreeNode that = (SubtreeNode) o;
        return Objects.equals(key, that.key) && Objects.equals(label, that.label) && Objects.equals(children, that.children);
    }

    @Override
    public int hashCode() {
        return Objects.hash(key, label, children);
    }

    @Override
    public String toString() {
        return "SubtreeNode{" +
                "key='" + key + '\'' +
                ", label='" + label + '\'' +
                ", children=" + children +
                '}';
    }
}
