package org.monarchinitiative.phenopacketlab.io;

import org.junit.jupiter.api.Test;
import org.monarchinitiative.phenol.ontology.data.*;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConceptResource;
import org.monarchinitiative.phenopacketlab.core.model.OntologyConceptResource;
import org.monarchinitiative.phenopacketlab.core.model.Resource;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;
import java.util.function.Function;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

public class OntologyConceptResourceTest {

    private static ConceptResourceAndHierarchyServices loadOntologyResource(Path ontologyPath, Function<InputStream, ConceptResourceAndHierarchyServices> loader) throws IOException {
        try (InputStream is = Files.newInputStream(ontologyPath)) {
            return loader.apply(is);
        }
    }

    @Test
    public void loadMondo() throws IOException {
        ConceptResourceAndHierarchyServices crhs = loadOntologyResource(TestBase.TEST_BASE.resolve("mondo.module.json"), ConceptResourceLoaders::mondo);
        IdentifiedConceptResource cr = crhs.conceptResource();

        assertThat(cr, is(instanceOf(OntologyConceptResource.class)));

        // Test the `Ontology`.
        MinimalOntology ontology = ((OntologyConceptResource) cr).ontology();
        assertThat(ontology.allTermIdCount(), equalTo(7));
        TermId achooSyndromeId = TermId.of("MONDO:0007038");
        assertThat(ontology.termForTermId(achooSyndromeId).isPresent(), equalTo(true));
        Term term = ontology.termForTermId(achooSyndromeId).get();
        assertThat(term.id(), equalTo(achooSyndromeId));
        assertThat(term.getName(), equalTo("Achoo syndrome"));
        assertThat(term.getXrefs(), hasSize(5));
        assertThat(term.getXrefs(), hasItems(new Dbxref("UMLS:C1863416", null, Map.of()), new Dbxref("OMIM:100820", null, Map.of())));


        // Test the `Resource`.
        Resource resource = cr.resource();
        assertThat(resource.getId(), equalTo("mondo"));
        assertThat(resource.getName(), equalTo("Mondo Disease Ontology"));
        assertThat(resource.getUrl(), equalTo("http://purl.obolibrary.org/obo/mondo.obo"));
        assertThat(resource.getVersion(), equalTo("2022-05-02"));
        assertThat(resource.getNamespacePrefix(), equalTo("MONDO"));
        assertThat(resource.getIriPrefix(), equalTo("http://purl.obolibrary.org/obo/MONDO_"));
    }

    @Test
    public void loadHpo() throws IOException {
        ConceptResourceAndHierarchyServices crhs = loadOntologyResource(TestBase.TEST_BASE.resolve("hp.module.json"), ConceptResourceLoaders::hpo);
        IdentifiedConceptResource cr = crhs.conceptResource();

        assertThat(cr, is(instanceOf(OntologyConceptResource.class)));

        assertThat(((OntologyConceptResource) cr).ontology(), is(notNullValue(MinimalOntology.class)));

        Resource resource = cr.resource();
        assertThat(resource.getId(), equalTo("hp"));
        assertThat(resource.getName(), equalTo("human phenotype ontology"));
        assertThat(resource.getUrl(), equalTo("http://purl.obolibrary.org/obo/hp.owl"));
        assertThat(resource.getVersion(), equalTo("2021-06-08"));
        assertThat(resource.getNamespacePrefix(), equalTo("HP"));
        assertThat(resource.getIriPrefix(), equalTo("http://purl.obolibrary.org/obo/HP_"));
    }

    @Test
    public void loadGeno() throws IOException {
        ConceptResourceAndHierarchyServices crhs = loadOntologyResource(TestBase.TEST_BASE.resolve("geno.json"), ConceptResourceLoaders::geno);
        IdentifiedConceptResource cr = crhs.conceptResource();

        assertThat(cr, is(instanceOf(OntologyConceptResource.class)));

        assertThat(((OntologyConceptResource) cr).ontology(), is(notNullValue(MinimalOntology.class)));

        Resource resource = cr.resource();
        assertThat(resource.getId(), equalTo("geno"));
        assertThat(resource.getName(), equalTo("Genotype Ontology"));
        assertThat(resource.getUrl(), equalTo("http://purl.obolibrary.org/obo/geno.owl"));
        assertThat(resource.getVersion(), equalTo("2022-03-05"));
        assertThat(resource.getNamespacePrefix(), equalTo("GENO"));
        assertThat(resource.getIriPrefix(), equalTo("http://purl.obolibrary.org/obo/GENO_"));
    }

    @Test
    public void loadUberon() throws IOException {
        ConceptResourceAndHierarchyServices crhs = loadOntologyResource(TestBase.TEST_BASE.resolve("uberon.module.json"), ConceptResourceLoaders::uberon);
        IdentifiedConceptResource cr = crhs.conceptResource();
        assertThat(cr, is(instanceOf(OntologyConceptResource.class)));

        assertThat(((OntologyConceptResource) cr).ontology(), is(notNullValue(MinimalOntology.class)));

        Resource resource = cr.resource();
        assertThat(resource.getId(), equalTo("uberon"));
        assertThat(resource.getName(), equalTo("Uber-anatomy ontology"));
        assertThat(resource.getUrl(), equalTo("http://purl.obolibrary.org/obo/uberon.owl"));
        assertThat(resource.getVersion(), equalTo("2022-04-18"));
        assertThat(resource.getNamespacePrefix(), equalTo("UBERON"));
        assertThat(resource.getIriPrefix(), equalTo("http://purl.obolibrary.org/obo/UBERON_"));
    }

    @Test
    public void loadUo() throws IOException {
        ConceptResourceAndHierarchyServices crhs = loadOntologyResource(TestBase.TEST_BASE.resolve("uo.json"), ConceptResourceLoaders::uo);
        IdentifiedConceptResource cr = crhs.conceptResource();

        assertThat(((OntologyConceptResource) cr).ontology(), is(notNullValue(MinimalOntology.class)));

        Resource resource = cr.resource();
        assertThat(resource.getId(), equalTo("uo"));
        assertThat(resource.getName(), equalTo("Units of measurement ontology"));
        assertThat(resource.getUrl(), equalTo("http://purl.obolibrary.org/obo/uo.owl"));
        assertThat(resource.getVersion(), equalTo("UNKNOWN")); // TODO - resolve
        assertThat(resource.getNamespacePrefix(), equalTo("UO"));
        assertThat(resource.getIriPrefix(), equalTo("http://purl.obolibrary.org/obo/UO_"));
    }

    @Test
    public void loadEfo() throws IOException {
        ConceptResourceAndHierarchyServices crhs = loadOntologyResource(TestBase.TEST_BASE.resolve("efo.module.json"), ConceptResourceLoaders::efo);
        IdentifiedConceptResource cr = crhs.conceptResource();

        assertThat(((OntologyConceptResource) cr).ontology(), is(notNullValue(MinimalOntology.class)));

        Resource resource = cr.resource();
        assertThat(resource.getId(), equalTo("efo"));
        assertThat(resource.getName(), equalTo("Experimental Factor Ontology"));
        assertThat(resource.getUrl(), equalTo("http://www.ebi.ac.uk/efo/efo.owl"));
        assertThat(resource.getVersion(), equalTo("3.42.0"));
        assertThat(resource.getNamespacePrefix(), equalTo("EFO"));
        assertThat(resource.getIriPrefix(), equalTo("http://purl.obolibrary.org/obo/EFO_"));
    }

    @Test
    public void loadSo() throws IOException {
        ConceptResourceAndHierarchyServices crhs = loadOntologyResource(TestBase.TEST_BASE.resolve("so.module.json"), ConceptResourceLoaders::so);
        IdentifiedConceptResource cr = crhs.conceptResource();

        assertThat(((OntologyConceptResource) cr).ontology(), is(notNullValue(MinimalOntology.class)));

        Resource resource = cr.resource();
        assertThat(resource.getId(), equalTo("so"));
        assertThat(resource.getName(), equalTo("Sequence types and features ontology"));
        assertThat(resource.getUrl(), equalTo("http://purl.obolibrary.org/obo/so.owl"));
        assertThat(resource.getVersion(), equalTo("UNKNOWN")); // TODO - resolve
        assertThat(resource.getNamespacePrefix(), equalTo("SO"));
        assertThat(resource.getIriPrefix(), equalTo("http://purl.obolibrary.org/obo/SO_"));
    }

    @Test
    public void loadNcit() throws IOException {
        ConceptResourceAndHierarchyServices crhs = loadOntologyResource(TestBase.TEST_BASE.resolve("ncit.module.json"), ConceptResourceLoaders::ncit);
        IdentifiedConceptResource cr = crhs.conceptResource();

        assertThat(((OntologyConceptResource) cr).ontology(), is(notNullValue(MinimalOntology.class)));

        Resource resource = cr.resource();
        assertThat(resource.getId(), equalTo("ncit"));
        assertThat(resource.getName(), equalTo("NCI Thesaurus"));
        assertThat(resource.getUrl(), equalTo("http://purl.obolibrary.org/obo/ncit.owl"));
        assertThat(resource.getVersion(), equalTo("22.03d"));
        assertThat(resource.getNamespacePrefix(), equalTo("NCIT"));
        assertThat(resource.getIriPrefix(), equalTo("http://purl.obolibrary.org/obo/NCIT_"));
    }

    @Test
    public void loadGsso() throws IOException {
        ConceptResourceAndHierarchyServices crhs = loadOntologyResource(TestBase.TEST_BASE.resolve("gsso.module.json"), ConceptResourceLoaders::gsso);
        IdentifiedConceptResource cr = crhs.conceptResource();

        assertThat(((OntologyConceptResource) cr).ontology(), is(notNullValue(MinimalOntology.class)));

        Resource resource = cr.resource();
        assertThat(resource.getId(), equalTo("gsso"));
        assertThat(resource.getName(), equalTo("GSSO - the Gender, Sex, and Sexual Orientation ontology"));
        assertThat(resource.getUrl(), equalTo("http://purl.obolibrary.org/obo/gsso.owl"));
        assertThat(resource.getVersion(), equalTo("UNKNOWN"));
        assertThat(resource.getNamespacePrefix(), equalTo("GSSO"));
        assertThat(resource.getIriPrefix(), equalTo("http://purl.obolibrary.org/obo/GSSO_"));
    }
}