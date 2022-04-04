package org.monarchinitiative.phenopacketlab.core.disease;

import org.monarchinitiative.phenol.annotations.formats.hpo.HpoDisease;
import org.monarchinitiative.phenol.ontology.data.TermId;

import java.util.Optional;
import java.util.stream.Stream;

public interface DiseaseService {

     // TODO - implement subset of the disease model
    Optional<HpoDisease> diseaseById(TermId id);

    Stream<HpoDisease> diseases();
}
