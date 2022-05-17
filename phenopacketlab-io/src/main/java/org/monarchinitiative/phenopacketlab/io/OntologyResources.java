package org.monarchinitiative.phenopacketlab.io;

import org.monarchinitiative.phenol.io.OntologyLoader;
import org.monarchinitiative.phenol.io.utils.CurieUtil;
import org.monarchinitiative.phenol.io.utils.CurieUtilBuilder;
import org.monarchinitiative.phenol.ontology.data.Ontology;
import org.monarchinitiative.phenopacketlab.model.OntologyResource;
import org.phenopackets.schema.v2.core.Resource;

import java.io.InputStream;
import java.util.Map;

public class OntologyResources {

    private OntologyResources() {
    }
    public static OntologyResource mondo(InputStream is) {
        CurieUtil newCurie = CurieUtilBuilder.withDefaultsAnd(Map.of("HGNC", "http://identifiers.org/hgnc/"));
        Ontology ontology = OntologyLoader.loadOntology(is, newCurie, "MONDO", "HGNC");
        Resource resource = mondoResource(getOntologyVersion(ontology));
        return OntologyResource.of(ontology, resource);
    }

    private static Resource mondoResource(String version) {
        // TODO - use phenopacket-tools when released.
        return Resource.newBuilder()
                .setId("mondo")
                .setName("MONDO Disease Ontology")
                .setUrl("http://purl.obolibrary.org/obo/mondo.json")
                .setVersion(version)
                .setNamespacePrefix("MONDO")
                .setIriPrefix("http://purl.obolibrary.org/obo/MONDO_")
                .build();
    }

    public static OntologyResource hpo(InputStream is) {
        Ontology ontology = OntologyLoader.loadOntology(is);
        Resource resource = hpoResource(getOntologyVersion(ontology));
        return OntologyResource.of(ontology, resource);
    }

    private static Resource hpoResource(String version) {
        // TODO - use phenopacket-tools when released.
        return Resource.newBuilder()
                .setId("hp")
                .setName("Human Phenotype Ontology")
                .setUrl("http://purl.obolibrary.org/obo/hp.json")
                .setVersion(version)
                .setNamespacePrefix("HP")
                .setIriPrefix("http://purl.obolibrary.org/obo/HP_")
                .build();
    }

    public static OntologyResource uberon(InputStream is) {
        Ontology ontology = OntologyLoader.loadOntology(is);
        Resource resource = uberonResource(getOntologyVersion(ontology));
        return OntologyResource.of(ontology, resource);
    }

    private static Resource uberonResource(String version) {
        return Resource.newBuilder()
                .setId("uberon")
                .setName("Uber-anatomy ontology")
                .setUrl("http://purl.obolibrary.org/obo/uberon.json")
                .setVersion(version)
                .setNamespacePrefix("UBERON")
                .setIriPrefix("http://purl.obolibrary.org/obo/UBERON_")
                .build();
    }

    public static OntologyResource geno(InputStream is) {
        Ontology ontology = OntologyLoader.loadOntology(is);
        Resource resource = genoResource(getOntologyVersion(ontology));
        return OntologyResource.of(ontology, resource);
    }

    private static Resource genoResource(String version) {
        return Resource.newBuilder()
                .setId("geno")
                .setName("Genotype Ontology")
                .setUrl("http://purl.obolibrary.org/obo/geno.json")
                .setVersion(version)
                .setNamespacePrefix("GENO")
                .setIriPrefix("http://purl.obolibrary.org/obo/GENO_")
                .build();
    }

    public static OntologyResource uo(InputStream is) {
        Ontology ontology = OntologyLoader.loadOntology(is);
        Resource resource = uoResource(getOntologyVersion(ontology));
        return OntologyResource.of(ontology, resource);
    }

    private static Resource uoResource(String version) {
        return Resource.newBuilder()
                .setId("uo")
                .setName("Units of measurement ontology")
                .setUrl("http://purl.obolibrary.org/obo/uo.owl")
                .setVersion(version)
                .setNamespacePrefix("UO")
                .setIriPrefix("http://purl.obolibrary.org/obo/UO_")
                .build();
    }

    public static OntologyResource efo(InputStream is) {
        Ontology ontology = OntologyLoader.loadOntology(is);
        Resource resource = efoResource(getOntologyVersion(ontology));
        return OntologyResource.of(ontology, resource);
    }

    private static Resource efoResource(String version) {
        return Resource.newBuilder()
                .setId("efo")
                .setName("Experimental Factor Ontology")
                .setUrl("http://www.ebi.ac.uk/efo/efo.owl")
                .setVersion(version)
                .setNamespacePrefix("EFO")
                .setIriPrefix("http://www.ebi.ac.uk/efo/EFO_")
                .build();
    }

    private static String getOntologyVersion(Ontology ontology) {
        return ontology.getMetaInfo().getOrDefault("release", "UNKNOWN");
    }

}
