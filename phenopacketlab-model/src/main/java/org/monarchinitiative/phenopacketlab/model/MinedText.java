package org.monarchinitiative.phenopacketlab.model;

import java.util.List;

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
}
