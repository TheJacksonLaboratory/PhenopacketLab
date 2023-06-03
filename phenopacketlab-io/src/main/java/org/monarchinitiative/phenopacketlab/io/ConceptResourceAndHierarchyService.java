package org.monarchinitiative.phenopacketlab.io;

import org.monarchinitiative.phenopacketlab.core.OntologyHierarchyService;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConceptResource;

public record ConceptResourceAndHierarchyService(IdentifiedConceptResource conceptResource,
                                                 OntologyHierarchyService hierarchyService) {
}