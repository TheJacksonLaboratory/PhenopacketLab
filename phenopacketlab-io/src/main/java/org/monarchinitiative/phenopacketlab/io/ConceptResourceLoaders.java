package org.monarchinitiative.phenopacketlab.io;

import org.monarchinitiative.phenol.io.OntologyLoader;
import org.monarchinitiative.phenol.io.utils.CurieUtil;
import org.monarchinitiative.phenol.io.utils.CurieUtilBuilder;
import org.monarchinitiative.phenol.ontology.data.Ontology;
import org.monarchinitiative.phenopacketlab.core.model.OntologyConceptResource;
import org.monarchinitiative.phenopacketlab.core.model.Resource;

import java.io.InputStream;
import java.util.Map;

public class ConceptResourceLoaders {

    private ConceptResourceLoaders() {
    }

    public static OntologyConceptResource mondo(InputStream is) {
        Ontology ontology = OntologyLoader.loadOntology(is, "MONDO");
        Resource resource = mondoResource(getOntologyVersion(ontology));
        return OntologyConceptResource.of(ontology, resource);
    }

    private static Resource mondoResource(String version) {
        // TODO - use phenopacket-tools when released.
        org.phenopackets.schema.v2.core.Resource resource = org.phenopackets.schema.v2.core.Resource.newBuilder()
                .setId("mondo")
                .setName("MONDO Disease Ontology")
                .setUrl("http://purl.obolibrary.org/obo/mondo.json")
                .setVersion(version)
                .setNamespacePrefix("MONDO")
                .setIriPrefix("http://purl.obolibrary.org/obo/MONDO_")
                .build();
        return new PhenopacketResource(resource);
    }

    public static OntologyConceptResource hpo(InputStream is) {
        Ontology ontology = OntologyLoader.loadOntology(is);
        Resource resource = hpoResource(getOntologyVersion(ontology));
        return OntologyConceptResource.of(ontology, resource);
    }

    private static Resource hpoResource(String version) {
        // TODO - use phenopacket-tools when released.
        org.phenopackets.schema.v2.core.Resource resource = org.phenopackets.schema.v2.core.Resource.newBuilder()
                .setId("hp")
                .setName("Human Phenotype Ontology")
                .setUrl("http://purl.obolibrary.org/obo/hp.json")
                .setVersion(version)
                .setNamespacePrefix("HP")
                .setIriPrefix("http://purl.obolibrary.org/obo/HP_")
                .build();
        return new PhenopacketResource(resource);
    }

    public static OntologyConceptResource uberon(InputStream is) {
        Ontology ontology = OntologyLoader.loadOntology(is);
        Resource resource = uberonResource(getOntologyVersion(ontology));
        return OntologyConceptResource.of(ontology, resource);
    }

    private static Resource uberonResource(String version) {
        org.phenopackets.schema.v2.core.Resource resource = org.phenopackets.schema.v2.core.Resource.newBuilder()
                .setId("uberon")
                .setName("Uber-anatomy ontology")
                .setUrl("http://purl.obolibrary.org/obo/uberon.json")
                .setVersion(version)
                .setNamespacePrefix("UBERON")
                .setIriPrefix("http://purl.obolibrary.org/obo/UBERON_")
                .build();
        return new PhenopacketResource(resource);
    }

    public static OntologyConceptResource geno(InputStream is) {
        Ontology ontology = OntologyLoader.loadOntology(is);
        Resource resource = genoResource(getOntologyVersion(ontology));
        return OntologyConceptResource.of(ontology, resource);
    }

    private static Resource genoResource(String version) {
        org.phenopackets.schema.v2.core.Resource resource = org.phenopackets.schema.v2.core.Resource.newBuilder()
                .setId("geno")
                .setName("Genotype Ontology")
                .setUrl("http://purl.obolibrary.org/obo/geno.json")
                .setVersion(version)
                .setNamespacePrefix("GENO")
                .setIriPrefix("http://purl.obolibrary.org/obo/GENO_")
                .build();
        return new PhenopacketResource(resource);
    }

    public static OntologyConceptResource uo(InputStream is) {
        Ontology ontology = OntologyLoader.loadOntology(is);
        Resource resource = uoResource(getOntologyVersion(ontology));
        return OntologyConceptResource.of(ontology, resource);
    }

    private static Resource uoResource(String version) {
        org.phenopackets.schema.v2.core.Resource resource = org.phenopackets.schema.v2.core.Resource.newBuilder()
                .setId("uo")
                .setName("Units of measurement ontology")
                .setUrl("http://purl.obolibrary.org/obo/uo.owl")
                .setVersion(version)
                .setNamespacePrefix("UO")
                .setIriPrefix("http://purl.obolibrary.org/obo/UO_")
                .build();
        return new PhenopacketResource(resource);
    }

    public static OntologyConceptResource efo(InputStream is) {
        Ontology ontology = OntologyLoader.loadOntology(is);
        Resource resource = efoResource(getOntologyVersion(ontology));
        return OntologyConceptResource.of(ontology, resource);
    }

    private static Resource efoResource(String version) {
        org.phenopackets.schema.v2.core.Resource resource = org.phenopackets.schema.v2.core.Resource.newBuilder()
                .setId("efo")
                .setName("Experimental Factor Ontology")
                .setUrl("http://www.ebi.ac.uk/efo/efo.owl")
                .setVersion(version)
                .setNamespacePrefix("EFO")
                .setIriPrefix("http://www.ebi.ac.uk/efo/EFO_")
                .build();
        return new PhenopacketResource(resource);
    }

    public static OntologyConceptResource so(InputStream is) {
        Ontology ontology = OntologyLoader.loadOntology(is);
        Resource resource = soResource(getOntologyVersion(ontology));
        return OntologyConceptResource.of(ontology, resource);
    }

    private static Resource soResource(String version) {
        org.phenopackets.schema.v2.core.Resource resource = org.phenopackets.schema.v2.core.Resource.newBuilder()
                .setId("so")
                .setName("Sequence types and features ontology")
                .setUrl("http://purl.obolibrary.org/obo/so.owl")
                .setVersion(version)
                .setNamespacePrefix("SO")
                .setIriPrefix("http://purl.obolibrary.org/obo/SO_")
                .build();
        return new PhenopacketResource(resource);
    }

    public static OntologyConceptResource ncit(InputStream is) {
        Ontology ontology = OntologyLoader.loadOntology(is);
        Resource resource = ncitResource(getOntologyVersion(ontology));
        return OntologyConceptResource.of(ontology, resource);
    }

    private static Resource ncitResource(String version) {
        org.phenopackets.schema.v2.core.Resource resource = org.phenopackets.schema.v2.core.Resource.newBuilder()
                .setId("ncit")
                .setName("NCI Thesaurus")
                .setUrl("http://purl.obolibrary.org/obo/ncit.owl")
                .setVersion(version)
                .setNamespacePrefix("NCIT")
                .setIriPrefix("http://purl.obolibrary.org/obo/NCIT_")
                .build();
        return new PhenopacketResource(resource);
    }

    public static OntologyConceptResource gsso(InputStream is) {
        CurieUtil curieUtil = CurieUtilBuilder.withDefaultsAnd(Map.of("GSSO", "http://purl.obolibrary.org/obo/GSSO_"));
        Ontology ontology = OntologyLoader.loadOntology(is, curieUtil, "GSSO");
        Resource resource = gssoResource(getOntologyVersion(ontology));
        return OntologyConceptResource.of(ontology, resource);
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

    public static OntologyConceptResource eco(InputStream is) {
        CurieUtil curieUtil = CurieUtilBuilder.withDefaultsAnd(Map.of("ECO", "http://purl.obolibrary.org/obo/ECO_"));
        Ontology ontology = OntologyLoader.loadOntology(is, curieUtil, "ECO");
        Resource resource = ecoResource(getOntologyVersion(ontology));
        return OntologyConceptResource.of(ontology, resource);
    }

    private static Resource ecoResource(String version) {
        org.phenopackets.schema.v2.core.Resource resource = org.phenopackets.schema.v2.core.Resource.newBuilder()
                .setId("eco")
                .setName("Evidence & Conclusion Ontology (ECO)")
                .setUrl("http://purl.obolibrary.org/obo/eco.owl")
                .setVersion(version)
                .setNamespacePrefix("ECO")
                .setIriPrefix("http://purl.obolibrary.org/obo/ECO_")
                .build();
        return new PhenopacketResource(resource);
    }

    public static OntologyConceptResource chebi(InputStream is) {
        CurieUtil curieUtil = CurieUtilBuilder.withDefaultsAnd(Map.of("CHEBI", "http://purl.obolibrary.org/obo/CHEBI_"));
        Ontology ontology = OntologyLoader.loadOntology(is, curieUtil, "CHEBI");
        Resource resource = chebiResource(getOntologyVersion(ontology));
        return OntologyConceptResource.of(ontology, resource);
    }

    private static Resource chebiResource(String version) {
        org.phenopackets.schema.v2.core.Resource resource = org.phenopackets.schema.v2.core.Resource.newBuilder()
                .setId("chebi")
                .setName("Chemical Entities of Biological Interest (CHEBI)")
                .setUrl("http://purl.obolibrary.org/obo/chebi.owl")
                .setVersion(version)
                .setNamespacePrefix("CHEBI")
                .setIriPrefix("http://purl.obolibrary.org/obo/CHEBI_")
                .build();
        return new PhenopacketResource(resource);
    }

    private static String getOntologyVersion(Ontology ontology) {
        return ontology.getMetaInfo().getOrDefault("release", "UNKNOWN");
    }

}
