package org.monarchinitiative.phenopacketlab.core.subtree;

import org.monarchinitiative.phenol.ontology.algo.OntologyAlgorithm;
import org.monarchinitiative.phenol.ontology.data.Ontology;
import org.monarchinitiative.phenol.ontology.data.Term;
import org.monarchinitiative.phenol.ontology.data.TermId;

import java.util.Set;

public class CreateSubtree {

    private CreateSubtree() {
    }

    /**
     * Create a subtree with given {@code root} from an {@code ontology}.
     */
    public static SubtreeNode createSubtree(TermId root, Ontology ontology) {
        Term rootTerm = ontology.getTermMap().get(root);
        if (rootTerm == null)
            throw new IllegalArgumentException("Root %s not found in ontology".formatted(root.getValue()));

        SubtreeNode node = new SubtreeNode(root.getValue(), rootTerm.getName());
        return augmentWithChildren(ontology, root, node);
    }

    private static SubtreeNode augmentWithChildren(Ontology ontology, TermId termId, SubtreeNode node) {
        Set<TermId> childTerms = OntologyAlgorithm.getChildTerms(ontology, termId, false);

        for (TermId childTermId : childTerms) {
            Term term = ontology.getTermMap().get(childTermId);
            SubtreeNode childNode = new SubtreeNode(childTermId.getValue(), term.getName());
            node.getChildren().add(childNode);
            augmentWithChildren(ontology, childTermId, childNode);
        }

        return node;
    }
}
