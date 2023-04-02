package org.monarchinitiative.phenopacketlab.io;

import org.junit.jupiter.api.Test;
import org.monarchinitiative.phenol.ontology.data.Dbxref;
import org.monarchinitiative.phenol.ontology.data.Ontology;
import org.monarchinitiative.phenol.ontology.data.Term;
import org.monarchinitiative.phenol.ontology.data.TermId;
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

    private static OntologyConceptResource loadOntologyResource(Path ontologyPath, Function<InputStream, OntologyConceptResource> loader) throws IOException {
        try (InputStream is = Files.newInputStream(ontologyPath)) {
            return loader.apply(is);
        }
    }

    @Test
    public void loadMondo() throws IOException {
        OntologyConceptResource or = loadOntologyResource(TestBase.TEST_BASE.resolve("mondo.module.json"), ConceptResourceLoaders::mondo);

        // Test the `Ontology`.
        Ontology ontology = or.getOntology();
        assertThat(ontology.countAllTerms(), equalTo(7));
        TermId achooSyndromeId = TermId.of("MONDO:0007038");
        assertThat(ontology.containsTerm(achooSyndromeId), equalTo(true));
        Term term = ontology.getTermMap().get(achooSyndromeId);
        assertThat(term.id(), equalTo(achooSyndromeId));
        assertThat(term.getName(), equalTo("Achoo syndrome"));
        assertThat(term.getXrefs(), hasSize(5));
        assertThat(term.getXrefs(), hasItems(new Dbxref("UMLS:C1863416", null, Map.of()), new Dbxref("OMIM:100820", null, Map.of())));


        // Test the `Resource`.
        Resource resource = or.getResource();
        assertThat(resource.getId(), equalTo("mondo"));
        assertThat(resource.getName(), equalTo("MONDO Disease Ontology"));
        assertThat(resource.getUrl(), equalTo("http://purl.obolibrary.org/obo/mondo.json"));
        assertThat(resource.getVersion(), equalTo("2022-05-02"));
        assertThat(resource.getNamespacePrefix(), equalTo("MONDO"));
        assertThat(resource.getIriPrefix(), equalTo("http://purl.obolibrary.org/obo/MONDO_"));
    }

    @Test
    public void loadHpo() throws IOException {
        OntologyConceptResource or = loadOntologyResource(TestBase.TEST_BASE.resolve("hp.module.json"), ConceptResourceLoaders::hpo);

        assertThat(or.getOntology(), is(notNullValue(Ontology.class)));

        Resource resource = or.getResource();
        assertThat(resource.getId(), equalTo("hp"));
        assertThat(resource.getName(), equalTo("Human Phenotype Ontology"));
        assertThat(resource.getUrl(), equalTo("http://purl.obolibrary.org/obo/hp.json"));
        assertThat(resource.getVersion(), equalTo("2021-06-08"));
        assertThat(resource.getNamespacePrefix(), equalTo("HP"));
        assertThat(resource.getIriPrefix(), equalTo("http://purl.obolibrary.org/obo/HP_"));
    }

    @Test
    public void loadGeno() throws IOException {
        OntologyConceptResource or = loadOntologyResource(TestBase.TEST_BASE.resolve("geno.json"), ConceptResourceLoaders::geno);

        assertThat(or.getOntology(), is(notNullValue(Ontology.class)));

        Resource resource = or.getResource();
        assertThat(resource.getId(), equalTo("geno"));
        assertThat(resource.getName(), equalTo("Genotype Ontology"));
        assertThat(resource.getUrl(), equalTo("http://purl.obolibrary.org/obo/geno.json"));
        assertThat(resource.getVersion(), equalTo("2022-03-05"));
        assertThat(resource.getNamespacePrefix(), equalTo("GENO"));
        assertThat(resource.getIriPrefix(), equalTo("http://purl.obolibrary.org/obo/GENO_"));
    }

    @Test
    public void loadUberon() throws IOException {
        OntologyConceptResource or = loadOntologyResource(TestBase.TEST_BASE.resolve("uberon.module.json"), ConceptResourceLoaders::uberon);

        assertThat(or.getOntology(), is(notNullValue(Ontology.class)));

        Resource resource = or.getResource();
        assertThat(resource.getId(), equalTo("uberon"));
        assertThat(resource.getName(), equalTo("Uber-anatomy ontology"));
        assertThat(resource.getUrl(), equalTo("http://purl.obolibrary.org/obo/uberon.json"));
        assertThat(resource.getVersion(), equalTo("2022-04-18"));
        assertThat(resource.getNamespacePrefix(), equalTo("UBERON"));
        assertThat(resource.getIriPrefix(), equalTo("http://purl.obolibrary.org/obo/UBERON_"));
    }

    @Test
    public void loadUo() throws IOException {
        OntologyConceptResource or = loadOntologyResource(TestBase.TEST_BASE.resolve("uo.json"), ConceptResourceLoaders::uo);

        assertThat(or.getOntology(), is(notNullValue(Ontology.class)));

        Resource resource = or.getResource();
        assertThat(resource.getId(), equalTo("uo"));
        assertThat(resource.getName(), equalTo("Units of measurement ontology"));
        assertThat(resource.getUrl(), equalTo("http://purl.obolibrary.org/obo/uo.owl"));
        assertThat(resource.getVersion(), equalTo("UNKNOWN")); // TODO - resolve
        assertThat(resource.getNamespacePrefix(), equalTo("UO"));
        assertThat(resource.getIriPrefix(), equalTo("http://purl.obolibrary.org/obo/UO_"));
    }

    @Test
    public void loadEfo() throws IOException {
        OntologyConceptResource or = loadOntologyResource(TestBase.TEST_BASE.resolve("efo.module.json"), ConceptResourceLoaders::efo);

        assertThat(or.getOntology(), is(notNullValue(Ontology.class)));

        Resource resource = or.getResource();
        assertThat(resource.getId(), equalTo("efo"));
        assertThat(resource.getName(), equalTo("Experimental Factor Ontology"));
        assertThat(resource.getUrl(), equalTo("http://www.ebi.ac.uk/efo/efo.owl"));
        assertThat(resource.getVersion(), equalTo("3.42.0"));
        assertThat(resource.getNamespacePrefix(), equalTo("EFO"));
        assertThat(resource.getIriPrefix(), equalTo("http://www.ebi.ac.uk/efo/EFO_"));
    }

    @Test
    public void loadSo() throws IOException {
        OntologyConceptResource or = loadOntologyResource(TestBase.TEST_BASE.resolve("so.module.json"), ConceptResourceLoaders::so);

        assertThat(or.getOntology(), is(notNullValue(Ontology.class)));

        Resource resource = or.getResource();
        assertThat(resource.getId(), equalTo("so"));
        assertThat(resource.getName(), equalTo("Sequence types and features ontology"));
        assertThat(resource.getUrl(), equalTo("http://purl.obolibrary.org/obo/so.owl"));
        assertThat(resource.getVersion(), equalTo("UNKNOWN")); // TODO - resolve
        assertThat(resource.getNamespacePrefix(), equalTo("SO"));
        assertThat(resource.getIriPrefix(), equalTo("http://purl.obolibrary.org/obo/SO_"));
    }

    @Test
    public void loadNcit() throws IOException {
        OntologyConceptResource or = loadOntologyResource(TestBase.TEST_BASE.resolve("ncit.module.json"), ConceptResourceLoaders::ncit);

        assertThat(or.getOntology(), is(notNullValue(Ontology.class)));

        Resource resource = or.getResource();
        assertThat(resource.getId(), equalTo("ncit"));
        assertThat(resource.getName(), equalTo("NCI Thesaurus"));
        assertThat(resource.getUrl(), equalTo("http://purl.obolibrary.org/obo/ncit.owl"));
        assertThat(resource.getVersion(), equalTo("22.03d"));
        assertThat(resource.getNamespacePrefix(), equalTo("NCIT"));
        assertThat(resource.getIriPrefix(), equalTo("http://purl.obolibrary.org/obo/NCIT_"));
    }

    @Test
    public void loadGsso() throws IOException {
        OntologyConceptResource or = loadOntologyResource(TestBase.TEST_BASE.resolve("gsso.module.json"), ConceptResourceLoaders::gsso);

        assertThat(or.getOntology(), is(notNullValue(Ontology.class)));

        Resource resource = or.getResource();
        assertThat(resource.getId(), equalTo("gsso"));
        assertThat(resource.getName(), equalTo("GSSO - the Gender, Sex, and Sexual Orientation ontology"));
        assertThat(resource.getUrl(), equalTo("http://purl.obolibrary.org/obo/gsso.owl"));
        assertThat(resource.getVersion(), equalTo("UNKNOWN"));
        assertThat(resource.getNamespacePrefix(), equalTo("GSSO"));
        assertThat(resource.getIriPrefix(), equalTo("http://purl.obolibrary.org/obo/GSSO_"));
    }
}