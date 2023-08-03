package org.monarchinitiative.phenopacketlab.core.model;

import org.monarchinitiative.phenol.ontology.data.MinimalOntology;

import java.util.Objects;

record OntologyConceptResourceDefault(MinimalOntology ontology, Resource resource) implements OntologyConceptResource {

    OntologyConceptResourceDefault(MinimalOntology ontology, Resource resource) {
        this.ontology = Objects.requireNonNull(ontology);
        this.resource = Objects.requireNonNull(resource);
    }

}
