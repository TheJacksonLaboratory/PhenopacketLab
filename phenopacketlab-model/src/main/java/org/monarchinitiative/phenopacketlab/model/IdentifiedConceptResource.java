package org.monarchinitiative.phenopacketlab.model;

import org.monarchinitiative.phenol.ontology.data.TermId;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

/**
 * The implementors serve as a container of {@link IdentifiedConcept}s coming from a single {@link Resource}.
 * <p>
 * The {@link IdentifiedConceptResource} supports iteration through the {@link IdentifiedConcept}s as well as
 * {@link IdentifiedConcept} lookup using {@link TermId}.
 */
public interface IdentifiedConceptResource extends Iterable<IdentifiedConcept>, ResourceAware {

    static IdentifiedConceptResource of(List<IdentifiedConcept> concepts, Resource resource) {
        return new IdentifiedConceptResourceDefault(concepts, resource);
    }

    /**
     * @return number of concepts
     */
    int size();

    default Stream<IdentifiedConcept> stream() {
        return StreamSupport.stream(spliterator(), false);
    }

    default Optional<IdentifiedConcept> conceptForTermId(TermId termId) {
        return stream()
                .filter(ic -> ic.id().equals(termId))
                .findAny();
    }

}
