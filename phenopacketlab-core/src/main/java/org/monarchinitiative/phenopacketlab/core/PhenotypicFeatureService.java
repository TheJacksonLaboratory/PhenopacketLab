package org.monarchinitiative.phenopacketlab.core;

import org.monarchinitiative.phenol.ontology.data.TermId;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConcept;

import java.util.Collection;
import java.util.Optional;
import java.util.stream.Stream;

/**
 * A service for showing concepts that can be used as phenotypic features.
 */
public interface PhenotypicFeatureService {

    /**
     * @return the namespace prefixes of the phenotypic features served by the service.
     */
    Collection<String> phenotypeNamespacePrefixes();

    Optional<IdentifiedConcept> phenotypeConceptById(TermId id);

    Stream<IdentifiedConcept> allPhenotypeConcepts();

}
