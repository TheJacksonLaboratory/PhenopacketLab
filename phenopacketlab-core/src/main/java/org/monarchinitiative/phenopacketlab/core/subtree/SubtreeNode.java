package org.monarchinitiative.phenopacketlab.core.subtree;

import java.util.*;


/**
 * A node of an ontology subtree. The node has the following attributes:
 * <ul>
 *     <li><em>key</em> - CURIE of the term, e.g. HP:1234567</li>
 *     <li><em>label</em> - term name, e.g. Hypertension</li>
 *     <li><em>description</em> - Description/definition of term, e.g. The presence of chronic increased pressure in the systemic arterial system.</li>
 *     <li><em>children</em> - a list of node's child terms (empty for a leaf node)</li>
 * </ul>
 */
public class SubtreeNode {

    private final String key, label, description;
    private final List<SubtreeNode> children = new ArrayList<>();

    public SubtreeNode(String key, String label, String description) {
        this.key = key;
        this.label = label;
        this.description = description;
    }

    public String getKey() {
        return key;
    }

    public String getLabel() {
        return label;
    }

    public String getDescription() { return description; }

    public List<SubtreeNode> getChildren() {
        return children;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SubtreeNode that = (SubtreeNode) o;
        return Objects.equals(key, that.key) && Objects.equals(label, that.label)
                && Objects.equals(description, that.description) && Objects.equals(children, that.children);
    }

    @Override
    public int hashCode() {
        return Objects.hash(key, label, description, children);
    }

    @Override
    public String toString() {
        return "SubtreeNode{" +
                "key='" + key + '\'' +
                ", label='" + label + '\'' +
                ", description='" + description + '\'' +
                ", children=" + children +
                '}';
    }
}
