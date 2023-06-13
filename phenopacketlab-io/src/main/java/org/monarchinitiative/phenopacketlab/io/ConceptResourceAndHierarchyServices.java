package org.monarchinitiative.phenopacketlab.io;

import org.monarchinitiative.phenopacketlab.core.OntologyHierarchyService;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConceptResource;

// Java cannot return a tuple from a function. It just so happens that we configure these two guys simultaneously..
public record ConceptResourceAndHierarchyServices(IdentifiedConceptResource conceptResource,
                                                  OntologyHierarchyService hierarchyService) {
}