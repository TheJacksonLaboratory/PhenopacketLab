package org.monarchinitiative.phenopacketlab.model;

import org.monarchinitiative.phenol.ontology.data.Ontology;
import org.phenopackets.schema.v2.core.Resource;

import java.util.Objects;

public class OntologyResource implements ResourceAware {

    private final Ontology ontology;
    private final Resource resource;

    public static OntologyResource of(Ontology ontology, Resource resource) {
        return new OntologyResource(ontology, resource);
    }

    private OntologyResource(Ontology ontology, Resource resource) {
        this.ontology = Objects.requireNonNull(ontology);
        this.resource = Objects.requireNonNull(resource);
    }

    public Ontology ontology() {
        return ontology;
    }

    @Override
    public Resource resource() {
        return resource;
    }

}
