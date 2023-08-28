package org.monarchinitiative.phenopacketlab.core;

import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConcept;

import java.util.Optional;

/**
 * {@linkplain TaxonomyService} serves NCBITaxon concept. For now only homo-sapiens
 */
public interface TaxonomyService {

    /**
     * Returns homo-sapiens NCBITaxon term.
     */
    Optional<IdentifiedConcept> homoSapiensNCBIConcept();

}
