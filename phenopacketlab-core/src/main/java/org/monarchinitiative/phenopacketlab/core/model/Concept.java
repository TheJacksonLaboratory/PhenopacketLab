package org.monarchinitiative.phenopacketlab.core.model;

import java.util.List;
import java.util.Optional;

/**
 * {@link Concept} is an entity that has a name, an optional definition, and a list of synonyms.
 */
public interface Concept {

    static Concept of(String name, String definition, List<String> synonyms) {
        return new ConceptDefault(name, definition, synonyms);
    }

    String getName();

    Optional<String> getDefinition();

    List<String> getSynonyms();

}
