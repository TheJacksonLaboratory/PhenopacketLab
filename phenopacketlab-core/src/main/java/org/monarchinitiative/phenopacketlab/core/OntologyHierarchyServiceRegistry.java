package org.monarchinitiative.phenopacketlab.core;

import java.util.Optional;
import java.util.stream.Stream;

/**
 * The {@linkplain OntologyHierarchyServiceRegistry} manages {@link OntologyHierarchyService}s for supported ontologies.
 */
public interface OntologyHierarchyServiceRegistry {

    /**
     * Get the {@link OntologyHierarchyService} for given namespace prefix.
     *
     * @param namespacePrefix the namespace prefix of the ontology (e.g. {@code MONDO}, {@code HP}).
     * @return an optional with {@link OntologyHierarchyService} corresponding to the namespace prefix
     * or an empty optional.
     */
    Optional<OntologyHierarchyService> forPrefix(String namespacePrefix);

    /**
     * @return a {@linkplain Stream} of prefixes of the supported ontologies.
     */
    Stream<String> allPrefixes();

}
