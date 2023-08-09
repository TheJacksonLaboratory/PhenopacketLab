package org.monarchinitiative.phenopacketlab.core;

import org.monarchinitiative.phenol.ontology.data.TermId;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConcept;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConceptResource;
import org.monarchinitiative.phenopacketlab.core.model.SearchIdentifiedConcept;

import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Stream;

/**
 * {@linkplain MultipurposeConceptConstantService} uses {@link ConceptResourceService} to fetch concepts to be used
 * in various parts of the application.
 */
public class MultipurposeConceptConstantService implements DiseaseService, PhenotypicFeatureService, ChemicalEntityService,
                                                        TaxonomyService {

    private final ConceptResourceService conceptResourceService;
    private final List<String> diseasePrefixes;
    private final List<String> phenotypePrefixes;
    private final List<String> chemicalEntityPrefixes;

    public MultipurposeConceptConstantService(ConceptResourceService conceptResourceService,
                                              Collection<String> diseasePrefixes,
                                              List<String> phenotypePrefixes,
                                              List<String> chemicalEntityPrefixes) {
        this.conceptResourceService = Objects.requireNonNull(conceptResourceService);
        this.diseasePrefixes = List.copyOf(Objects.requireNonNull(diseasePrefixes));
        this.phenotypePrefixes = List.copyOf(Objects.requireNonNull(phenotypePrefixes));
        this.chemicalEntityPrefixes = List.copyOf(Objects.requireNonNull(chemicalEntityPrefixes));
    }

    @Override
    public Collection<String> diseaseNamespacePrefixes() {
        return diseasePrefixes;
    }

    @Override
    public Optional<IdentifiedConcept> diseaseConceptById(TermId id) {
        return findConceptFromSelectedPrefixes(id, diseasePrefixes);
    }

    @Override
    public Stream<IdentifiedConcept> allDiseaseConcepts() {
        return findAllConceptsFromSelectedPrefixes(diseasePrefixes);
    }

    @Override
    public SearchIdentifiedConcept searchDiseaseConcepts(String query, int limit) {
        return searchConcepts(query, limit, diseasePrefixes);
    }

    @Override
    public Collection<String> phenotypeNamespacePrefixes() {
        return phenotypePrefixes;
    }

    @Override
    public Optional<IdentifiedConcept> phenotypeConceptById(TermId id) {
        return findConceptFromSelectedPrefixes(id, phenotypePrefixes);
    }

    @Override
    public Stream<IdentifiedConcept> allPhenotypeConcepts() {
        return findAllConceptsFromSelectedPrefixes(phenotypePrefixes);
    }

    @Override
    public SearchIdentifiedConcept searchPhenotypeConcepts(String query, int limit) {
        return searchConcepts(query, limit, phenotypePrefixes);
    }

    @Override
    public Collection<String> chemicalEntityNamespacePrefixes() {
        return chemicalEntityPrefixes;
    }

    @Override
    public Optional<IdentifiedConcept> chemicalEntityConceptById(TermId id) {
        return findConceptFromSelectedPrefixes(id, chemicalEntityPrefixes);
    }

    @Override
    public SearchIdentifiedConcept searchChemicalEntityConcepts(String query, int limit) {
        return searchConcepts(query, limit, chemicalEntityPrefixes);
    }

    @Override
    public Stream<IdentifiedConcept> allChemicalEntityConcepts() {
        return findAllConceptsFromSelectedPrefixes(chemicalEntityPrefixes);
    }

    @Override
    public Optional<IdentifiedConcept> homoSapiensNCBIConcept() {
        List<String> ncbiTaxonPrefixes = List.of("NCBITaxon");
        TermId id = TermId.of("NCBITaxon:9606");
        if (ncbiTaxonPrefixes.contains(id.getPrefix())) {
            return conceptResourceService.forPrefix(id.getPrefix())
                    .flatMap(cr -> cr.conceptForTermId(id));
        }
        return Optional.empty();
    }

    private Stream<IdentifiedConcept> findAllConceptsFromSelectedPrefixes(List<String> prefixes) {
        return prefixes.stream()
                .map(conceptResourceService::forPrefix)
                .flatMap(Optional::stream)
                .flatMap(IdentifiedConceptResource::stream)
                // TODO a temporary bugfix for an issue resulting from incorrect loading of the HPO/others.
                .filter(ic -> prefixes.contains(ic.id().getPrefix()));
    }

    private Optional<IdentifiedConcept> findConceptFromSelectedPrefixes(TermId id, List<String> prefixes) {
        if (prefixes.contains(id.getPrefix())) {
            return conceptResourceService.forPrefix(id.getPrefix())
                    .flatMap(cr -> cr.conceptForTermId(id));
        }

        return Optional.empty();
    }

    private int termLengthComparator(String term1, String term2) {
        if (term1.length() != term2.length()) {
            return term1.length() - term2.length();
        }
        return term1.compareTo(term2);
    }

    private SearchIdentifiedConcept searchConcepts(String query, int max, List<String> prefixes) {
        AtomicInteger counter = new AtomicInteger();
        List<IdentifiedConcept> concepts = findAllConceptsFromSelectedPrefixes(prefixes)
                .peek(unused -> counter.incrementAndGet()) // Keep track of the concept count.
                .map(concept -> matchQueryToConcept(query, concept))
                .flatMap(Optional::stream) // Filter out non-matches.
                .sorted(Comparator.comparing(SearchResult::score).reversed()) // Put the best match on top
                .limit(max) // Show top n matches
                .map(SearchResult::concept)
                .toList();

        return new SearchIdentifiedConcept(counter.get(), concepts);
    }

    private static Optional<SearchResult> matchQueryToConcept(String query, IdentifiedConcept ic) {
        String concat = ic.id().getValue().toLowerCase() + ic.getName().toLowerCase();
        if (concat.contains(query)) {
            float matchScore = (float) query.length() / concat.length();
            return Optional.of(new SearchResult(ic, matchScore));
        }
        return Optional.empty();
    }

    private record SearchResult(IdentifiedConcept concept, float score) {}

}
