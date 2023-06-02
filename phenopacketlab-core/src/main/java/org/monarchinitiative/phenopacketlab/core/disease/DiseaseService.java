package org.monarchinitiative.phenopacketlab.core.disease;

import org.monarchinitiative.phenol.annotations.formats.hpo.HpoDisease;
import org.monarchinitiative.phenol.ontology.data.TermId;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConcept;

import java.util.Optional;
import java.util.stream.Stream;

/**
 * {@linkplain DiseaseService} serves all disease concepts, possibly from different vocabularies (e.g. <em>MONDO</em>,
 * <em>OMIM</em>).
 */
public interface DiseaseService {

    Optional<IdentifiedConcept> diseaseConceptById(TermId id);

    Stream<IdentifiedConcept> allDiseaseConcepts();

    /**
     * @deprecated use {@link #diseaseConceptById(TermId)} instead.
     */
    @Deprecated
    Optional<HpoDisease> diseaseById(TermId id);

    /**
     * @deprecated use {@link #allDiseaseConcepts()} instead.
     */
    @Deprecated
    Stream<HpoDisease> diseases();
}
