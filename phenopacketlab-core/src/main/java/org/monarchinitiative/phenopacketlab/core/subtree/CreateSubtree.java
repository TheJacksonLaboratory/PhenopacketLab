package org.monarchinitiative.phenopacketlab.core.subtree;

import org.monarchinitiative.phenol.ontology.data.TermId;
import org.monarchinitiative.phenopacketlab.core.OntologyHierarchyService;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConcept;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConceptResource;

import java.util.*;

public class CreateSubtree {

    private CreateSubtree() {
    }

    /**
     * Create a subtree with given {@code root} from an {@code ontology}, with a {@code comparator} used to sort
     * the children of the tree branches.
     * @param root TermId
     * @param conceptResource IdentifiedConceptResource
     * @param hierarchyService OntologyHierarchyService
     * @param comparator a comparator for sorting children of a node or {@code null} if no sorting is expected
     * @param excludedNodes nodes to be excluded from the resulting tree
     * @return a node of the root node of the subtree
     * @throws IllegalArgumentException if the root node was not found in the {@code ontology}
     */
    public static Optional<SubtreeNode> createSubtree(TermId root,
                                                      IdentifiedConceptResource conceptResource,
                                                      OntologyHierarchyService hierarchyService,
                                                      Comparator<SubtreeNode> comparator,
                                                      Collection<TermId> excludedNodes) {
        Optional<IdentifiedConcept> rico = conceptResource.conceptForTermId(root);
        if (rico.isEmpty())
            throw new IllegalArgumentException("Root %s not found in ontology".formatted(root.getValue()));

        IdentifiedConcept ric = rico.get();
        SubtreeNode node = new SubtreeNode(root.getValue(), ric.getName(), ric.getDefinition());
        return Optional.of(augmentWithChildren(conceptResource, hierarchyService, root, node, comparator, excludedNodes));
    }

    private static SubtreeNode augmentWithChildren(IdentifiedConceptResource conceptResource,
                                                   OntologyHierarchyService hierarchyService,
                                                   TermId termId,
                                                   SubtreeNode node,
                                                   Comparator<SubtreeNode> comparator,
                                                   Collection<TermId> excludedNodes) {
        Collection<TermId> children = hierarchyService.children(termId).toList();

        List<SubtreeNode> childNodes = new ArrayList<>(children.size());
        for (TermId childTermId : children) {
            // if child term is not one of the excluded node do nothing
            if (excludedNodes == null || !excludedNodes.contains(childTermId)) {
                // Term should always be non-null since we just got the termId from the `ontology`.
                //noinspection OptionalGetWithoutIsPresent
                IdentifiedConcept term = conceptResource.conceptForTermId(childTermId).get();
                SubtreeNode childNode = new SubtreeNode(childTermId.getValue(), term.getName(), term.getDefinition());
                augmentWithChildren(conceptResource, hierarchyService, childTermId, childNode, comparator, excludedNodes);
                childNodes.add(childNode);
            }
        }

        if (comparator != null)
            childNodes.sort(comparator);
        // Set leaf and selectable boolean
        if (childNodes.isEmpty()) {
            node.setLeaf(true);
        } else {
            node.setLeaf(false);
        }
        node.getChildren().addAll(childNodes);

        return node;
    }
}
