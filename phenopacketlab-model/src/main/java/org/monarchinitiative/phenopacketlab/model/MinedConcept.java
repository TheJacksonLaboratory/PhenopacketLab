package org.monarchinitiative.phenopacketlab.model;

public class MinedConcept {

    String id;
    int start;
    int end;
    boolean excluded;

    public MinedConcept(String id, int start, int end, boolean excluded) {
        this.id = id;
        this.start = start;
        this.end = end;
        this.excluded = excluded;
    }
}
