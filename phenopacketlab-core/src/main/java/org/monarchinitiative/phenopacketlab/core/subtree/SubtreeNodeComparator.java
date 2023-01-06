package org.monarchinitiative.phenopacketlab.core.subtree;

import java.util.Comparator;

public class SubtreeNodeComparator implements Comparator<SubtreeNode> {

    @Override
    public int compare(SubtreeNode node1, SubtreeNode node2) {
        return node1.getLabel().compareTo(node2.getLabel());
    }
}
