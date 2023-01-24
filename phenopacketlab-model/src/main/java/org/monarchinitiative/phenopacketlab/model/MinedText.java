package org.monarchinitiative.phenopacketlab.model;

import java.util.List;
import java.util.Objects;

public class MinedText {
    String payload;
    List<MinedConcept> concepts;

    public MinedText(String payload, List<MinedConcept> concepts) {
        this.payload = payload;
        this.concepts = concepts;
    }

    public String getPayload() {
        return payload;
    }
    public void setPayload(String payload) {
        this.payload = payload;
    }
    public List<MinedConcept> getConcepts() {
        return concepts;
    }
    public void setConcepts(List<MinedConcept> concepts) {
        this.concepts = concepts;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MinedText that = (MinedText) o;
        return Objects.equals(payload, that.payload) && Objects.equals(concepts, that.concepts);
    }

    @Override
    public int hashCode() {
        return Objects.hash(payload, concepts);
    }
}
