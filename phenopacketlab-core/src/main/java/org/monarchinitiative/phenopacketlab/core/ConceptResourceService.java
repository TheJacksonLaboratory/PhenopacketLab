package org.monarchinitiative.phenopacketlab.core;

import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConceptResource;
import org.monarchinitiative.phenopacketlab.core.model.Resource;

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
     * Get {@link IdentifiedConceptResource} given a phenopacket string
     *
     * @param phenopacketString phenopacket as a string
     * @return resource metadata
     */
    @Deprecated(forRemoval = true) // Remove the function, not a good functionality for this service.
    Stream<IdentifiedConceptResource> conceptResourcesForPhenopacket(String phenopacketString);

    @Deprecated(forRemoval = true) // Remove the function, not a good functionality for this service.
    default Stream<Resource> resourcesForPhenopacket(String phenopacketString) {
        return conceptResourcesForPhenopacket(phenopacketString).map(IdentifiedConceptResource::getResource);
    }

}
