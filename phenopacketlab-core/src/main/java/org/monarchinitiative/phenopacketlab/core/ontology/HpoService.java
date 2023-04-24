package org.monarchinitiative.phenopacketlab.core.ontology;

import org.monarchinitiative.phenol.ontology.data.Term;
import org.monarchinitiative.phenol.ontology.data.TermId;

import java.util.Collection;
import java.util.Optional;
import java.util.stream.Stream;

public interface HpoService {


    Collection<Term> severities();

    Collection<Term> onsets();

    Stream<Term> phenotypicFeatures();

    Optional<Term> phenotypicFeatureById(TermId id);

}
