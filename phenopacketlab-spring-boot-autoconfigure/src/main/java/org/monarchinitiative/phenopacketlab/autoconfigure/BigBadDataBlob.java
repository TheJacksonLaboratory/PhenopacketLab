package org.monarchinitiative.phenopacketlab.autoconfigure;

import org.monarchinitiative.phenopacketlab.core.ConceptResourceService;
import org.monarchinitiative.phenopacketlab.core.OntologyHierarchyServiceRegistry;

record BigBadDataBlob(ConceptResourceService conceptResourceService,
                      OntologyHierarchyServiceRegistry hierarchyServiceRegistry) {
}
