package org.monarchinitiative.phenopacketlab.restapi.controller.dto;

import java.util.Objects;

/**
 * Data transfer object for HpoDisease.
 */
public class OntologyClassDto {

    private String id;
    private String label;

    public OntologyClassDto() {
    }

    public OntologyClassDto(String id, String label) {
        this.id = id;
        this.label = label;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OntologyClassDto that = (OntologyClassDto) o;
        return Objects.equals(id, that.id) && Objects.equals(label, that.label);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, label);
    }
}
