package org.monarchinitiative.phenopacketlab.core.subtree;

import org.monarchinitiative.phenol.ontology.algo.OntologyAlgorithm;
import org.monarchinitiative.phenol.ontology.data.Ontology;
import org.monarchinitiative.phenol.ontology.data.Term;
import org.monarchinitiative.phenol.ontology.data.TermId;

import java.util.*;

public class CreateSubtree {

    private CreateSubtree() {
    }

    /**
     * Create a subtree with given {@code root} from an {@code ontology}, with a {@code comparator} used to sort
     * the children of the tree branches.
     *
     * @param comparator a comparator for sorting children of a node or {@code null} if no sorting is expected
     * @param ontology source ontology
     * @param excludedNodes nodes to be excluded from the resulting tree
     * @return a node of the root node of the subtree
     * @throws IllegalArgumentException if the root node was not found in the {@code ontology}
     */
    public static Optional<SubtreeNode> createSubtree(TermId root,
                                                      Ontology ontology,
                                                      Comparator<SubtreeNode> comparator,
                                                      List<TermId> excludedNodes) {
        Term rootTerm = ontology.getTermMap().get(root);
        if (rootTerm == null)
            throw new IllegalArgumentException("Root %s not found in ontology".formatted(root.getValue()));

        SubtreeNode node = new SubtreeNode(root.getValue(), rootTerm.getName(), rootTerm.getDefinition());
        return Optional.of(augmentWithChildren(ontology, root, node, comparator, excludedNodes));
    }

    private static SubtreeNode augmentWithChildren(Ontology ontology,
                                                   TermId termId,
                                                   SubtreeNode node,
                                                   Comparator<SubtreeNode> comparator,
                                                   List<TermId> excludedNodes) {
        Collection<TermId> children = OntologyAlgorithm.getChildTerms(ontology, termId, false);

        List<SubtreeNode> childNodes = new ArrayList<>(children.size());
        for (TermId childTermId : children) {
            // if child term is not one of the excluded node do nothing
            if (excludedNodes == null || !excludedNodes.contains(childTermId)) {
                // Term should always be non-null since we just got the termId from the `ontology`.
                Term term = ontology.getTermMap().get(childTermId);
                SubtreeNode childNode = new SubtreeNode(childTermId.getValue(), term.getName(), term.getDefinition());
                augmentWithChildren(ontology, childTermId, childNode, comparator, excludedNodes);
                childNodes.add(childNode);
            }
        }
        if (comparator != null)
            childNodes.sort(comparator);

        node.getChildren().addAll(childNodes);
        return node;
    }
}
