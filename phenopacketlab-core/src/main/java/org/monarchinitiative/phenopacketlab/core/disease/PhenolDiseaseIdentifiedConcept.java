package org.monarchinitiative.phenopacketlab.core.disease;

import org.monarchinitiative.phenol.ontology.data.TermId;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConcept;

import java.util.List;

/**
 * A specialization of {@link IdentifiedConcept}s obtained from Phenol's
 * {@link org.monarchinitiative.phenol.annotations.formats.hpo.HpoDisease} where we know that
 * we will never have a definition or synonyms.
 *
 * @param id disease identifier.
 * @param name human-friendly disease name.
 */
record PhenolDiseaseIdentifiedConcept(TermId id, String name) implements IdentifiedConcept {

    @Override
    public String getName() {
        return name;
    }

    @Override
    public String getDefinition() {
        return null;
    }

    @Override
    public List<String> getSynonyms() {
        return List.of();
    }
}
