package org.monarchinitiative.phenopacketlab.restapi.controller.dto;

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


}
