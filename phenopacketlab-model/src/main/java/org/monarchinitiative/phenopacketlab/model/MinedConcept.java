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

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public int getStart() {
        return start;
    }
    public void setStart(int start) {
        this.start = start;
    }
    public int getEnd() {
        return end;
    }
    public void setEnd(int end) {
        this.end = end;
    }
    public boolean isExcluded() {
        return excluded;
    }
    public void setExcluded(boolean excluded) {
        this.excluded = excluded;
    }

}
