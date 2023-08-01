package org.monarchinitiative.phenopacketlab.io;

import org.monarchinitiative.phenol.io.MinimalOntologyLoader;
import org.monarchinitiative.phenol.io.OntologyLoaderOptions;
import org.monarchinitiative.phenol.io.utils.CurieUtil;
import org.monarchinitiative.phenol.io.utils.CurieUtilBuilder;
import org.monarchinitiative.phenol.ontology.data.MinimalOntology;
import org.monarchinitiative.phenopacketlab.core.OntologyHierarchyService;
import org.monarchinitiative.phenopacketlab.core.PhenolOntologyHierarchyService;
import org.monarchinitiative.phenopacketlab.core.model.OntologyConceptResource;
import org.monarchinitiative.phenopacketlab.core.model.Resource;
import org.phenopackets.phenopackettools.builder.builders.Resources;

import java.io.InputStream;
import java.util.Map;

public class ConceptResourceLoaders {

    private static final CurieUtil CURIE_UTIL = CurieUtilBuilder.withDefaultsAnd(
            Map.of("HGNC", "http://identifiers.org/hgnc/",
                    "GSSO", "http://purl.obolibrary.org/obo/GSSO_") // REMOVE
    );
    private static final OntologyLoaderOptions STRICT_OPTIONS = OntologyLoaderOptions.builder()
            .discardNonPropagatingRelationships(true)
            .discardDuplicatedRelationships(true)
            .build();

    private static final OntologyLoaderOptions LENIENT_OPTIONS = OntologyLoaderOptions.builder()
            .discardNonPropagatingRelationships(true)
            .discardDuplicatedRelationships(true)
            .forceBuild(true)
            .build();

    private ConceptResourceLoaders() {
    }

    public static ConceptResourceAndHierarchyServices mondo(InputStream is) {
        MinimalOntology ontology = MinimalOntologyLoader.loadOntology(is, CURIE_UTIL, STRICT_OPTIONS, "MONDO");
        Resource resource = mondoResource(getOntologyVersion(ontology));
        OntologyConceptResource conceptResource = OntologyConceptResource.of(ontology, resource);
        return addHierarchyService(conceptResource);
    }

    private static Resource mondoResource(String version) {
        return new PhenopacketResource(Resources.mondoVersion(version));
    }

    public static ConceptResourceAndHierarchyServices hpo(InputStream is) {
        MinimalOntology ontology = MinimalOntologyLoader.loadOntology(is, CURIE_UTIL, STRICT_OPTIONS, "HP");
        Resource resource = hpoResource(getOntologyVersion(ontology));
        OntologyConceptResource conceptResource = OntologyConceptResource.of(ontology, resource);
        return addHierarchyService(conceptResource);
    }

    private static Resource hpoResource(String version) {
        return new PhenopacketResource(Resources.hpoVersion(version));
    }

    public static ConceptResourceAndHierarchyServices uberon(InputStream is) {
        MinimalOntology ontology = MinimalOntologyLoader.loadOntology(is, CURIE_UTIL, STRICT_OPTIONS, "UBERON");
        Resource resource = uberonResource(getOntologyVersion(ontology));
        OntologyConceptResource conceptResource = OntologyConceptResource.of(ontology, resource);
        return addHierarchyService(conceptResource);
    }

    private static Resource uberonResource(String version) {
        return new PhenopacketResource(Resources.uberonVersion(version));
    }

    public static ConceptResourceAndHierarchyServices geno(InputStream is) {
        MinimalOntology ontology = MinimalOntologyLoader.loadOntology(is, CURIE_UTIL, LENIENT_OPTIONS,
                "GENO", "SO", "BFO", "OBI", "UBERON", "UPHENO", "IAO");
        Resource resource = genoResource(getOntologyVersion(ontology));
        OntologyConceptResource conceptResource = OntologyConceptResource.of(ontology, resource);
        return addHierarchyService(conceptResource);
    }

    private static Resource genoResource(String version) {
        return new PhenopacketResource(Resources.genoVersion(version));
    }

    public static ConceptResourceAndHierarchyServices uo(InputStream is) {
        MinimalOntology ontology = MinimalOntologyLoader.loadOntology(is, CURIE_UTIL, STRICT_OPTIONS, "UO");
        Resource resource = uoResource(getOntologyVersion(ontology));
        OntologyConceptResource conceptResource = OntologyConceptResource.of(ontology, resource);
        return addHierarchyService(conceptResource);
    }

    private static Resource uoResource(String version) {
        return new PhenopacketResource(Resources.uoVersion(version));
    }

    @Deprecated(forRemoval = true)
    public static ConceptResourceAndHierarchyServices efo(InputStream is) {
        MinimalOntology ontology = MinimalOntologyLoader.loadOntology(is, CURIE_UTIL, STRICT_OPTIONS, "EFO", "BFO", "CHEBI");
        Resource resource = efoResource(getOntologyVersion(ontology));
        OntologyConceptResource conceptResource = OntologyConceptResource.of(ontology, resource);
        return addHierarchyService(conceptResource);
    }

    private static Resource efoResource(String version) {
        return new PhenopacketResource(Resources.efoVersion(version));
    }

    public static ConceptResourceAndHierarchyServices so(InputStream is) {
        MinimalOntology ontology = MinimalOntologyLoader.loadOntology(is, CURIE_UTIL, LENIENT_OPTIONS, "SO");
        Resource resource = soResource(getOntologyVersion(ontology));
        OntologyConceptResource conceptResource = OntologyConceptResource.of(ontology, resource);
        return addHierarchyService(conceptResource);
    }

    private static Resource soResource(String version) {
        return new PhenopacketResource(Resources.soVersion(version));
    }

    public static ConceptResourceAndHierarchyServices ncit(InputStream is) {
        MinimalOntology ontology = MinimalOntologyLoader.loadOntology(is, CURIE_UTIL, LENIENT_OPTIONS, "NCIT");
        Resource resource = ncitResource(getOntologyVersion(ontology));
        OntologyConceptResource conceptResource = OntologyConceptResource.of(ontology, resource);
        return addHierarchyService(conceptResource);
    }

    private static Resource ncitResource(String version) {
        return new PhenopacketResource(Resources.ncitVersion(version));
    }

    public static ConceptResourceAndHierarchyServices eco(InputStream is) {
        MinimalOntology ontology = MinimalOntologyLoader.loadOntology(is, CURIE_UTIL, STRICT_OPTIONS, "ECO");
        Resource resource = ecoResource(getOntologyVersion(ontology));
        OntologyConceptResource conceptResource = OntologyConceptResource.of(ontology, resource);
        return addHierarchyService(conceptResource);
    }

    private static Resource ecoResource(String version) {
        return new PhenopacketResource(Resources.ecoVersion(version));
    }

    private static ConceptResourceAndHierarchyServices addHierarchyService(OntologyConceptResource conceptResource) {
        OntologyHierarchyService hierarchyService = new PhenolOntologyHierarchyService(conceptResource.resource().getNamespacePrefix(), conceptResource.ontology());
        return new ConceptResourceAndHierarchyServices(conceptResource, hierarchyService);
    }

    public static ConceptResourceAndHierarchyServices chebi(InputStream is) {
        MinimalOntology ontology = MinimalOntologyLoader.loadOntology(is, CURIE_UTIL, STRICT_OPTIONS, "CHEBI");
        Resource resource = chebiResource(getOntologyVersion(ontology));
        OntologyConceptResource conceptResource = OntologyConceptResource.of(ontology, resource);
        return addHierarchyService(conceptResource);
    }

    private static Resource chebiResource(String version) {
        return new PhenopacketResource(Resources.chebiVersion(version));
    }

    private static String getOntologyVersion(MinimalOntology ontology) {
        return ontology.version()
                .orElse("UNKNOWN");
    }

    @Deprecated(forRemoval = true)
    public static ConceptResourceAndHierarchyServices gsso(InputStream is) {
        MinimalOntology ontology = MinimalOntologyLoader.loadOntology(is, CURIE_UTIL, STRICT_OPTIONS, "GSSO");
        Resource resource = gssoResource(getOntologyVersion(ontology));
        OntologyConceptResource conceptResource = OntologyConceptResource.of(ontology, resource);
        return addHierarchyService(conceptResource);
    }

    private static Resource gssoResource(String version) {
        org.phenopackets.schema.v2.core.Resource resource = org.phenopackets.schema.v2.core.Resource.newBuilder()
                .setId("gsso")
                .setName("GSSO - the Gender, Sex, and Sexual Orientation ontology")
                .setUrl("http://purl.obolibrary.org/obo/gsso.owl")
                .setVersion(version)
                .setNamespacePrefix("GSSO")
                .setIriPrefix("http://purl.obolibrary.org/obo/GSSO_")
                .build();
        return new PhenopacketResource(resource);
    }
}
