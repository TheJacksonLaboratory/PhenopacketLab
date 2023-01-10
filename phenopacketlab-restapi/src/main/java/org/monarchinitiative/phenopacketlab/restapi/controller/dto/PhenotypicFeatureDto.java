package org.monarchinitiative.phenopacketlab.restapi.controller.dto;

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


}
