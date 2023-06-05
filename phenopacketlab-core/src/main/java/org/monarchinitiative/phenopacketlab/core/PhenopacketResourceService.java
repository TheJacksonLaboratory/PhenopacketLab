package org.monarchinitiative.phenopacketlab.core;

import org.monarchinitiative.phenopacketlab.core.model.PrefixResource;
import org.monarchinitiative.phenopacketlab.core.model.Resource;
import org.phenopackets.schema.v2.core.OntologyClass;

import java.io.IOException;
import java.util.List;

/**
 * {@link PhenopacketResourceService} provides {@link Resource}s for a provided top-level element
 * of the phenopacket schema formatted as a JSON string based on {@link OntologyClass} instances present in the element.
 * The {@link Resource} is wrapped into a {@link PrefixResource}
 * to enable verbose modeling of the absence of a {@link Resource} for a given namespace prefix
 * (e.g. missing {@code NCBITaxon} {@link Resource} and used in the top-level element).
 *
 * @see PrefixResource
 */
public interface PhenopacketResourceService {

    /**
     * Get a {@link PrefixResource}s for a given top-level element of the Phenopacket Schema (phenopacket, family,
     * or cohort).
     *
     * @param jsonMessage a JSON String corresponding to the top-level Phenopacket Schema element.
     * @return a list of {@link PrefixResource}s
     * @throws IOException
     */
    List<PrefixResource> getPrefixResourcesForPhenopacketElement(String jsonMessage) throws IOException;

}
