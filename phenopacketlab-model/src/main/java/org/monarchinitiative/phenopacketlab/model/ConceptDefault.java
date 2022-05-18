package org.monarchinitiative.phenopacketlab.model;

import org.monarchinitiative.phenol.ontology.data.TermId;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

class ConceptDefault implements Concept {

    private final TermId id;
    private final String name;
    private final String definition;
    private final List<String> synonyms;

    ConceptDefault(TermId id, String name, String definition, List<String> synonyms) {
        this.id = Objects.requireNonNull(id);
        this.name = Objects.requireNonNull(name);
        this.definition = definition; // nullable
        this.synonyms = Objects.requireNonNull(synonyms);
    }

    @Override
    public TermId id() {
        return id;
    }

    @Override
    public String name() {
        return name;
    }

    @Override
    public Optional<String> definition() {
        return Optional.ofNullable(definition);
    }

    @Override
    public List<String> synonyms() {
        return synonyms;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ConceptDefault that = (ConceptDefault) o;
        return Objects.equals(id, that.id) && Objects.equals(name, that.name) && Objects.equals(definition, that.definition) && Objects.equals(synonyms, that.synonyms);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, definition, synonyms);
    }

    @Override
    public String toString() {
        return "ConceptDefault{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", definition='" + definition + '\'' +
                ", synonyms=" + synonyms +
                '}';
    }
}
