package org.monarchinitiative.phenopacketlab.core.model;

import com.fasterxml.jackson.annotation.JsonTypeInfo;

import java.util.List;
import java.util.Objects;

public class SearchIdentifiedConcept {

    private final int numberOfTerms;

    private final List<IdentifiedConcept> foundConcepts;

    public SearchIdentifiedConcept(int numberOfTerms, List<IdentifiedConcept> foundConcepts) {
        this.numberOfTerms = numberOfTerms;
        this.foundConcepts = foundConcepts;
    }

    public int getNumberOfTerms() {
        return numberOfTerms;
    }

    public List<IdentifiedConcept> getFoundConcepts() {
        return foundConcepts;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        SearchIdentifiedConcept that = (SearchIdentifiedConcept) o;
        return Objects.equals(numberOfTerms, that.numberOfTerms);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), numberOfTerms);
    }

    @Override
    public String toString() {
        return "SearchIdentifiedConceptDefault{" +
                "numberOfTerms=" + numberOfTerms +
                ", foundConcepts='" + foundConcepts +
                '}';
    }
}
