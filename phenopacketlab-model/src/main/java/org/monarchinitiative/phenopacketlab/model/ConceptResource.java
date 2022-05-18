package org.monarchinitiative.phenopacketlab.model;

import java.util.stream.Stream;
import java.util.stream.StreamSupport;

/**
 * A {@link Concept} container.
 */
public interface ConceptResource extends Iterable<Concept>, ResourceAware {

    /**
     * @return number of concepts
     */
    int size();

    default Stream<Concept> stream() {
        return StreamSupport.stream(spliterator(), false);
    }

}
