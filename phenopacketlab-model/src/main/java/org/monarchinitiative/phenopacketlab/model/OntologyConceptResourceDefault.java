package org.monarchinitiative.phenopacketlab.model;

import org.monarchinitiative.phenol.ontology.data.Ontology;

import java.util.Objects;

class OntologyConceptResourceDefault implements OntologyConceptResource {

    private final Ontology ontology;
    private final Resource resource;

    OntologyConceptResourceDefault(Ontology ontology, Resource resource) {
        this.ontology = Objects.requireNonNull(ontology);
        this.resource = Objects.requireNonNull(resource);
    }

    @Override
    public Ontology ontology() {
        return ontology;
    }

    @Override
    public Resource resource() {
        return resource;
    }

}
