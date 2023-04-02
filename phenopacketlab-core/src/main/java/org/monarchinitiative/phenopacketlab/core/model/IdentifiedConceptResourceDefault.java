package org.monarchinitiative.phenopacketlab.core.model;

import java.util.Iterator;
import java.util.List;
import java.util.Objects;

class IdentifiedConceptResourceDefault implements IdentifiedConceptResource {

    private final List<IdentifiedConcept> concepts;
    private final Resource resource;

    IdentifiedConceptResourceDefault(List<IdentifiedConcept> concepts, Resource resource) {
        this.concepts = Objects.requireNonNull(concepts);
        this.resource = Objects.requireNonNull(resource);
    }

    @Override
    public Iterator<IdentifiedConcept> iterator() {
        return concepts.iterator();
    }

    @Override
    public int size() {
        return concepts.size();
    }

    @Override
    public Resource getResource() {
        return resource;
    }

    // TODO - implement better way of getting `conceptForTermId`.
}
