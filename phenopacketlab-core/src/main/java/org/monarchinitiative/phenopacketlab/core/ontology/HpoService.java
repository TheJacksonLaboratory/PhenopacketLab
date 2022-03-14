package org.monarchinitiative.phenopacketlab.core.ontology;

import org.monarchinitiative.phenol.ontology.data.Term;

import java.util.Collection;

public interface HpoService {

    Collection<Term> severities();

    Collection<Term> onsets();

}
