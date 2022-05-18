package org.monarchinitiative.phenopacketlab.model;

import org.phenopackets.schema.v2.core.Resource;

import java.util.List;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

/**
 * A {@link Concept} container.
 */
public interface ConceptResource extends Iterable<Concept>, ResourceAware {

    static ConceptResource of(List<Concept> concepts, Resource resource) {
        return new ConceptResourceDefault(concepts, resource);
    }

    /**
     * @return number of concepts
     */
    int size();

    default Stream<Concept> stream() {
        return StreamSupport.stream(spliterator(), false);
    }

}
