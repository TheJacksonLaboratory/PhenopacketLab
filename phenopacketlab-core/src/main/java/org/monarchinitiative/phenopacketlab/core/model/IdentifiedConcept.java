package org.monarchinitiative.phenopacketlab.core.model;

import org.monarchinitiative.phenol.ontology.data.Identified;
import org.monarchinitiative.phenol.ontology.data.TermId;

import java.util.List;

/**
 * {@link IdentifiedConcept} is an entity that has an {@link #id()} and all attributes of a {@link Concept}.
 */
public interface IdentifiedConcept extends Identified, Concept {

    /**
     * Instantiate a default implementation of the {@link IdentifiedConcept}.
     *
     * @param id concept ID.
     * @param name concept name.
     * @param definition definition or <code>null</code> if not available.
     * @param synonyms list of concept synonyms.
     * @return instance.
     */
    static IdentifiedConcept of(TermId id, String name, String definition, List<String> synonyms) {
        return new IdentifiedConceptDefault(id, name, definition, synonyms);
    }

}
