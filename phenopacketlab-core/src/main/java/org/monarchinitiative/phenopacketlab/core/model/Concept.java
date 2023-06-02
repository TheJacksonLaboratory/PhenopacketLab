package org.monarchinitiative.phenopacketlab.core.model;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.util.List;

/**
 * {@link Concept} is an entity that has a name, an optional definition, and a list of synonyms.
 */
@JsonSerialize(as = Concept.class)
@JsonPropertyOrder({"name", "definition", "synonyms"})
public interface Concept {

    static Concept of(String name, String definition, List<String> synonyms) {
        return new ConceptDefault(name, definition, synonyms);
    }

    /**
     * Get a human-friendly label (e.g. <em>Arachnodactyly</em>).
     *
     * @return the label {@linkplain String}.
     */
    String getName();

    /**
     * Get the concept definition or {@code null} if no definition is available..
     *
     * @return the definition or {@code null}.
     */
    String getDefinition();

    /**
     * Get a {@linkplain List} of synonyms or an empty list if no synonyms are available.
     *
     * @return a possibly empty list of concept synonyms.
     */
    List<String> getSynonyms();

}
