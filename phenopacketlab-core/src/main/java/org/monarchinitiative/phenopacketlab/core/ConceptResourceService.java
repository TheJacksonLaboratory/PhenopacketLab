package org.monarchinitiative.phenopacketlab.core;

import org.monarchinitiative.phenopacketlab.model.IdentifiedConceptResource;

import java.util.Optional;

/**
 * Service for {@link IdentifiedConceptResource}s used in PhenopacketLab.
 */
public interface ConceptResourceService {

    Optional<IdentifiedConceptResource> forPrefix(String prefix);

}
