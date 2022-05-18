package org.monarchinitiative.phenopacketlab.model;

import org.monarchinitiative.phenol.ontology.data.Ontology;
import org.monarchinitiative.phenol.ontology.data.Term;
import org.monarchinitiative.phenol.ontology.data.TermSynonym;
import org.phenopackets.schema.v2.core.Resource;

import java.util.Iterator;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

public interface OntologyConceptResource extends ConceptResource {

    static OntologyConceptResource of(Ontology ontology, Resource resource) {
        return new OntologyConceptResourceDefault(ontology, resource);
    }

    Ontology ontology();

    @Override
    default Iterator<Concept> iterator() {
        // TODO - how about the obsolete terms?
        return new MappingIterator<>(ontology().getTerms().iterator(), termToConcept());
    }

    @Override
    default int size() {
        return ontology().countAllTerms();
    }

    private static Function<Term, Optional<Concept>> termToConcept() {
        return t -> Optional.of(new ConceptDefault(t.id(),
                t.getName(),
                t.getDefinition(),
                t.getSynonyms().stream()
                        .map(TermSynonym::getValue)
                        .collect(Collectors.toList())));
    }
}
