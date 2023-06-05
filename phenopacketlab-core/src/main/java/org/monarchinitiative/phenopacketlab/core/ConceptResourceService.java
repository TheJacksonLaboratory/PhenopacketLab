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
     * @param namespacePrefix String expected to match {@link Resource#getNamespacePrefix()} of the {@link Resource}
     *                        in {@link IdentifiedConceptResource} (e.g. {@code MONDO}, {@code NCIT}).
     * @return optional with {@link IdentifiedConceptResource} or {@link Optional#empty()}
     * if {@link IdentifiedConceptResource} for given {@code namespacePrefix} is not available.
     */
    Optional<IdentifiedConceptResource> forPrefix(String namespacePrefix);

    /**
     * Get a {@linkplain Stream} of {@link Resource}s managed by the service.
     */
    Stream<Resource> conceptResources();

    /**
     * Get a {@linkplain Stream} of namespace prefixes of the {@link Resource}s managed by the service.
     */
    default Stream<String> conceptResourcePrefixes() {
        return conceptResources()
                .map(Resource::getNamespacePrefix);
    }

    /**
     * Get all {@link IdentifiedConceptResource} for given {@code prefix} list, if available.
     *
     * @param prefixes List of String prefixes expected to match {@link Resource#getId()} of the {@link Resource} in {@link IdentifiedConceptResource}.
     * @return List of {@link Resource} or {@link Optional#empty()}
     * if {@link IdentifiedConceptResource} for given {@code prefixes} is not available.
     */
    @Deprecated(forRemoval = true) // Remove the function, not a good functionality for this service.
    Stream<IdentifiedConceptResource> conceptResourcesForPrefixes(List<String> prefixes);

    @Deprecated(forRemoval = true) // Remove the function, not a good functionality for this service.
    default Stream<Resource> resourcesForPrefixes(List<String> prefixes) {
        return conceptResourcesForPrefixes(prefixes).map(IdentifiedConceptResource::resource);
    }

}
