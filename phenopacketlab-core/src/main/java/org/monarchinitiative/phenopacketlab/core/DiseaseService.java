package org.monarchinitiative.phenopacketlab.core;

import org.monarchinitiative.phenol.ontology.data.TermId;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConcept;

import java.util.Collection;
import java.util.Optional;
import java.util.stream.Stream;

/**
 * {@linkplain DiseaseService} serves all disease concepts, possibly from different vocabularies (e.g. <em>MONDO</em>,
 * <em>OMIM</em>).
 */
public interface DiseaseService {

    /**
     * @return the namespace prefixes of the disease concepts served by the service.
     */
    Collection<String> diseaseNamespacePrefixes();

    /**
     * Look up a disease concept by its {@link TermId}.
     */
    Optional<IdentifiedConcept> diseaseConceptById(TermId id);

    /**
     * Stream all disease concepts served by the service.
     */
    Stream<IdentifiedConcept> allDiseaseConcepts();

}
