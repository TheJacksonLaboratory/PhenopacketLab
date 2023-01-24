package org.monarchinitiative.phenopacketlab.model;

import java.util.Objects;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MinedConcept that = (MinedConcept) o;
        return Objects.equals(id, that.id) && Objects.equals(start, that.start) && Objects.equals(end, that.end) && Objects.equals(excluded, that.excluded);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, start, end, excluded);
    }
}
