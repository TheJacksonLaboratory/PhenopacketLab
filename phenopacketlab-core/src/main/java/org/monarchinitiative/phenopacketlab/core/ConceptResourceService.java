package org.monarchinitiative.phenopacketlab.core;

import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConceptResource;
import org.monarchinitiative.phenopacketlab.core.model.Resource;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

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

    Stream<IdentifiedConceptResource> conceptResources();

    /**
     * Get all {@link IdentifiedConceptResource} for given {@code prefix} list, if available.
     *
     * @param prefixes List of String prefixes expected to match {@link Resource#getId()} of the {@link Resource} in {@link IdentifiedConceptResource}.
     * @return List of {@link Resource} or {@link Optional#empty()}
     * if {@link IdentifiedConceptResource} for given {@code prefixes} is not available.
     */
    Stream<IdentifiedConceptResource> conceptResourcesForPrefixes(List<String> prefixes);

    default Stream<Resource> resources() {
        return conceptResources().map(IdentifiedConceptResource::getResource);
    }
    default Stream<Resource> resourcesForPrefixes(List<String> prefixes) {
        return conceptResourcesForPrefixes(prefixes).map(IdentifiedConceptResource::getResource);
    }

}
