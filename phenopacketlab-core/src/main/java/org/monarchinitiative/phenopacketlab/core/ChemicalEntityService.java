package org.monarchinitiative.phenopacketlab.core;

import org.monarchinitiative.phenol.ontology.data.TermId;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConcept;
import org.monarchinitiative.phenopacketlab.core.model.SearchIdentifiedConcept;

import java.util.Collection;
import java.util.Optional;
import java.util.stream.Stream;

/**
 * {@linkplain ChemicalEntityService} serves all chemical entity concepts, possibly from CHEBI vocabulary
 */
public interface ChemicalEntityService {

    /**
     * @return the namespace prefixes of the chemical entity concepts served by the service.
     */
    Collection<String> chemicalEntityNamespacePrefixes();

    /**
     * Look up a chemical entity concept by its {@link TermId}.
     */
    Optional<IdentifiedConcept> chemicalEntityConceptById(TermId id);

    /**
     * Search through chemical entity concepts
     * @param query search string
     * @param limit max number of results
     * @return List of found concepts
     */
    SearchIdentifiedConcept searchChemicalEntityConcepts(String query, int limit);

    /**
     * Stream all chemical entity concepts served by the service.
     */
    Stream<IdentifiedConcept> allChemicalEntityConcepts();

}
