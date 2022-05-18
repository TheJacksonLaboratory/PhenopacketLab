package org.monarchinitiative.phenopacketlab.model;

import org.phenopackets.schema.v2.core.Resource;

import java.util.Iterator;
import java.util.List;
import java.util.Objects;

class ConceptResourceDefault implements ConceptResource {

    private final List<Concept> concepts;
    private final Resource resource;

    ConceptResourceDefault(List<Concept> concepts, Resource resource) {
        this.concepts = Objects.requireNonNull(concepts);
        this.resource = Objects.requireNonNull(resource);
    }

    @Override
    public int size() {
        return concepts.size();
    }

    @Override
    public Iterator<Concept> iterator() {
        return concepts.iterator();
    }

    @Override
    public Resource resource() {
        return resource;
    }

}
