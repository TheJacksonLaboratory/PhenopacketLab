package org.monarchinitiative.phenopacketlab.core.subtree;

import org.monarchinitiative.phenol.ontology.algo.OntologyAlgorithm;
import org.monarchinitiative.phenol.ontology.data.Ontology;
import org.monarchinitiative.phenol.ontology.data.Term;
import org.monarchinitiative.phenol.ontology.data.TermId;

import java.util.Comparator;
import java.util.List;
import java.util.Set;

public class CreateSubtree {

    private CreateSubtree() {
    }

    /**
     * Create a subtree with given {@code root} from an {@code ontology}, with a {@code comparator} used to sort
     * the children of the tree branches.
     */
    public static List<SubtreeNode> createSubtree(TermId root, Ontology ontology, Comparator<SubtreeNode> comparator) {
        Term rootTerm = ontology.getTermMap().get(root);
        if (rootTerm == null)
            throw new IllegalArgumentException("Root %s not found in ontology".formatted(root.getValue()));

        SubtreeNode node = new SubtreeNode(root.getValue(), rootTerm.getName(), comparator);
        return augmentWithChildren(ontology, root, node, comparator).getChildren();
    }

    private static SubtreeNode augmentWithChildren(Ontology ontology, TermId termId, SubtreeNode node, Comparator<SubtreeNode> comparator) {
        Set<TermId> childTerms = OntologyAlgorithm.getChildTerms(ontology, termId, false);

        for (TermId childTermId : childTerms) {
            Term term = ontology.getTermMap().get(childTermId);
            SubtreeNode childNode = new SubtreeNode(childTermId.getValue(), term.getName(), comparator);
            node.getChildren().add(childNode);
            augmentWithChildren(ontology, childTermId, childNode, comparator);
        }

        return node;
    }
}
