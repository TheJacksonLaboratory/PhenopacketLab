package org.monarchinitiative.phenopacketlab.core.model;

import org.monarchinitiative.phenol.ontology.data.*;
import org.monarchinitiative.phenopacketlab.core.util.MappingIterator;

import java.util.Iterator;
import java.util.Optional;
import java.util.function.Function;

/**
 * On top of the functionality provided by {@link IdentifiedConceptResource}, instances of {@link OntologyConceptResource}
 * also provide an {@link Ontology}.
 */
public interface OntologyConceptResource extends IdentifiedConceptResource {

    static OntologyConceptResource of(MinimalOntology ontology, Resource resource) {
        return new OntologyConceptResourceDefault(ontology, resource);
    }

    MinimalOntology ontology();

    @Override
    default Iterator<IdentifiedConcept> iterator() {
        return MappingIterator.of(ontology().nonObsoleteTermIds().iterator(), this::conceptForTermId);
    }

    @Override
    default int size() {
        return ontology().nonObsoleteTermIdCount();
    }

    @Override
    default Optional<IdentifiedConcept> conceptForTermId(TermId termId) {
        return ontology().termForTermId(termId)
                .flatMap(termToConcept());
    }

    private static Function<Term, Optional<IdentifiedConcept>> termToConcept() {
        return t -> Optional.of(new IdentifiedConceptDefault(t.id(),
                t.getName(),
                t.getDefinition(),
                t.getSynonyms().stream()
                        .map(TermSynonym::getValue)
                        .toList()));
    }
}
