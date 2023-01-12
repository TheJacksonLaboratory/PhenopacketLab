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
    public List<MinedConcept> getConcepts() {
        return concepts;
    }
}
