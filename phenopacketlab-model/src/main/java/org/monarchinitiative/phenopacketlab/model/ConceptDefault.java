package org.monarchinitiative.phenopacketlab.model;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

class ConceptDefault implements Concept {

    private final String name;
    private final String definition;
    private final List<String> synonyms;

    ConceptDefault(String name, String definition, List<String> synonyms) {
        this.name = Objects.requireNonNull(name);
        this.definition = definition; // nullable
        this.synonyms = Objects.requireNonNull(synonyms);
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
        return Objects.equals(name, that.name) && Objects.equals(definition, that.definition) && Objects.equals(synonyms, that.synonyms);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, definition, synonyms);
    }

    @Override
    public String toString() {
        return "Concept{" +
                "name='" + name + '\'' +
                ", definition='" + definition + '\'' +
                ", synonyms=" + synonyms +
                '}';
    }
}
