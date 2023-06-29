package org.monarchinitiative.phenopacketlab.core.model;

import org.monarchinitiative.phenol.ontology.data.Ontology;

import java.util.Objects;

record OntologyConceptResourceDefault(Ontology ontology, Resource resource) implements OntologyConceptResource {

    OntologyConceptResourceDefault(Ontology ontology, Resource resource) {
        this.ontology = Objects.requireNonNull(ontology);
        this.resource = Objects.requireNonNull(resource);
    }

}
