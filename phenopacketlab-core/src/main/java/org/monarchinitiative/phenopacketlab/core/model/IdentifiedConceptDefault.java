package org.monarchinitiative.phenopacketlab.core.model;

import org.monarchinitiative.phenol.ontology.data.TermId;

import java.util.List;
import java.util.Objects;

class IdentifiedConceptDefault extends ConceptDefault implements IdentifiedConcept {

    private final TermId id;
    IdentifiedConceptDefault(TermId id, String name, String definition, List<String> synonyms) {
        super(name, definition, synonyms);
        this.id = Objects.requireNonNull(id);
    }

    @Override
    public TermId id() {
        return id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        IdentifiedConceptDefault that = (IdentifiedConceptDefault) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), id);
    }

    @Override
    public String toString() {
        return "IdentifiedConcept{" +
                "id=" + id +
                ", name='" + getName() + '\'' +
                ", definition='" + getDefinition() + '\'' +
                ", synonyms=" + getSynonyms() +
                '}';
    }
}
