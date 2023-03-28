package org.monarchinitiative.phenopacketlab.core.model;

import java.util.Objects;

public class MinedConcept {

    String id;
    String label;
    int start;
    int end;
    boolean excluded;

    public MinedConcept(String id, String label, int start, int end, boolean excluded) {
        this.id = id;
        this.label = label;
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
    public String getLabel() {
        return label;
    }
    public void setLabel(String label) {
        this.label = label;
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
        return Objects.equals(id, that.id) && Objects.equals(label, that.label) && Objects.equals(start, that.start) && Objects.equals(end, that.end) && Objects.equals(excluded, that.excluded);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, label, start, end, excluded);
    }
}
