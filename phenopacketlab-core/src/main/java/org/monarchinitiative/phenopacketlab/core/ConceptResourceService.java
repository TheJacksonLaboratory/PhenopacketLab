package org.monarchinitiative.phenopacketlab.core;

import org.monarchinitiative.phenopacketlab.model.IdentifiedConceptResource;
import org.monarchinitiative.phenopacketlab.model.Resource;

import java.util.Optional;

/**
 * Service for {@link IdentifiedConceptResource}s used in PhenopacketLab.
 */
public interface ConceptResourceService {

    /**
     * Get {@link IdentifiedConceptResource} for given {@code prefix}, if available.
     *
     * @param prefix String expected to match {@link Resource#getId()} of the {@link Resource} in {@link IdentifiedConceptResource}.
     * @return optional with {@link IdentifiedConceptResource} or {@link Optional#empty()}
     * if {@link IdentifiedConceptResource} for given {@code prefix} is not available.
     */
    Optional<IdentifiedConceptResource> forPrefix(String prefix);

}
