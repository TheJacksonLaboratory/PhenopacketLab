package org.monarchinitiative.phenopacketlab.model;

import java.util.List;
import java.util.Optional;

public interface Concept {

    static Concept of(String name, String definition, List<String> synonyms) {
        return new ConceptDefault(name, definition, synonyms);
    }

    String getName();

    Optional<String> getDefinition();

    List<String> getSynonyms();

}
