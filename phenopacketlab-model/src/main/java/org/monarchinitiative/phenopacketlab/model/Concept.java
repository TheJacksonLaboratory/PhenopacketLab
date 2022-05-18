package org.monarchinitiative.phenopacketlab.model;

import org.monarchinitiative.phenol.ontology.data.Identified;
import org.monarchinitiative.phenol.ontology.data.TermId;

import java.util.List;
import java.util.Optional;

public interface Concept extends Identified {

    static Concept of(TermId id, String name, String definition, List<String> synonyms) {
        return new ConceptDefault(id, name, definition, synonyms);
    }

    String name();

    Optional<String> definition();

    List<String> synonyms();

}
