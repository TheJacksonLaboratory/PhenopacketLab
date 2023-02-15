package org.monarchinitiative.phenopacketlab.restapi.controller.dto;

import java.util.Objects;

/**
 * Data transfer object for Hpo Phenotypic feature.
 */
public class PhenotypicFeatureDto {

    private String id;
    private String name;

    public PhenotypicFeatureDto() {
    }

    public PhenotypicFeatureDto(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PhenotypicFeatureDto that = (PhenotypicFeatureDto) o;
        return Objects.equals(id, that.id) && Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }
}
