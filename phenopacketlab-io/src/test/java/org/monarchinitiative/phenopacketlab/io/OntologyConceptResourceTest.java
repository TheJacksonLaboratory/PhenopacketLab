package org.monarchinitiative.phenopacketlab.io;

import org.junit.jupiter.api.Test;
import org.monarchinitiative.phenol.ontology.data.Dbxref;
import org.monarchinitiative.phenol.ontology.data.Ontology;
import org.monarchinitiative.phenol.ontology.data.Term;
import org.monarchinitiative.phenol.ontology.data.TermId;
import org.monarchinitiative.phenopacketlab.model.OntologyConceptResource;
import org.monarchinitiative.phenopacketlab.model.Resource;

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
        Ontology ontology = or.ontology();
        assertThat(ontology.countAllTerms(), equalTo(7));
        TermId achooSyndromeId = TermId.of("MONDO:0007038");
        assertThat(ontology.containsTerm(achooSyndromeId), equalTo(true));
        Term term = ontology.getTermMap().get(achooSyndromeId);
        assertThat(term.id(), equalTo(achooSyndromeId));
        assertThat(term.getName(), equalTo("Achoo syndrome"));
        assertThat(term.getXrefs(), hasSize(5));
        assertThat(term.getXrefs(), hasItems(new Dbxref("UMLS:C1863416", null, Map.of()), new Dbxref("OMIM:100820", null, Map.of())));


        // Test the `Resource`.
        Resource resource = or.resource();
        assertThat(resource.id(), equalTo("mondo"));
        assertThat(resource.name(), equalTo("MONDO Disease Ontology"));
        assertThat(resource.url(), equalTo("http://purl.obolibrary.org/obo/mondo.json"));
        assertThat(resource.version(), equalTo("2022-05-02"));
        assertThat(resource.namespacePrefix(), equalTo("MONDO"));
        assertThat(resource.iriPrefix(), equalTo("http://purl.obolibrary.org/obo/MONDO_"));
    }

    @Test
    public void loadHpo() throws IOException {
        OntologyConceptResource or = loadOntologyResource(TestBase.TEST_BASE.resolve("hp.module.json"), ConceptResourceLoaders::hpo);

        assertThat(or.ontology(), is(notNullValue(Ontology.class)));

        Resource resource = or.resource();
        assertThat(resource.id(), equalTo("hp"));
        assertThat(resource.name(), equalTo("Human Phenotype Ontology"));
        assertThat(resource.url(), equalTo("http://purl.obolibrary.org/obo/hp.json"));
        assertThat(resource.version(), equalTo("2021-06-08"));
        assertThat(resource.namespacePrefix(), equalTo("HP"));
        assertThat(resource.iriPrefix(), equalTo("http://purl.obolibrary.org/obo/HP_"));
    }

    @Test
    public void loadGeno() throws IOException {
        OntologyConceptResource or = loadOntologyResource(TestBase.TEST_BASE.resolve("geno.json"), ConceptResourceLoaders::geno);

        assertThat(or.ontology(), is(notNullValue(Ontology.class)));

        Resource resource = or.resource();
        assertThat(resource.id(), equalTo("geno"));
        assertThat(resource.name(), equalTo("Genotype Ontology"));
        assertThat(resource.url(), equalTo("http://purl.obolibrary.org/obo/geno.json"));
        assertThat(resource.version(), equalTo("2022-03-05"));
        assertThat(resource.namespacePrefix(), equalTo("GENO"));
        assertThat(resource.iriPrefix(), equalTo("http://purl.obolibrary.org/obo/GENO_"));
    }

    @Test
    public void loadUberon() throws IOException {
        OntologyConceptResource or = loadOntologyResource(TestBase.TEST_BASE.resolve("uberon.module.json"), ConceptResourceLoaders::uberon);

        assertThat(or.ontology(), is(notNullValue(Ontology.class)));

        Resource resource = or.resource();
        assertThat(resource.id(), equalTo("uberon"));
        assertThat(resource.name(), equalTo("Uber-anatomy ontology"));
        assertThat(resource.url(), equalTo("http://purl.obolibrary.org/obo/uberon.json"));
        assertThat(resource.version(), equalTo("2022-04-18"));
        assertThat(resource.namespacePrefix(), equalTo("UBERON"));
        assertThat(resource.iriPrefix(), equalTo("http://purl.obolibrary.org/obo/UBERON_"));
    }

    @Test
    public void loadUo() throws IOException {
        OntologyConceptResource or = loadOntologyResource(TestBase.TEST_BASE.resolve("uo.json"), ConceptResourceLoaders::uo);

        assertThat(or.ontology(), is(notNullValue(Ontology.class)));

        Resource resource = or.resource();
        assertThat(resource.id(), equalTo("uo"));
        assertThat(resource.name(), equalTo("Units of measurement ontology"));
        assertThat(resource.url(), equalTo("http://purl.obolibrary.org/obo/uo.owl"));
        assertThat(resource.version(), equalTo("UNKNOWN")); // TODO - resolve
        assertThat(resource.namespacePrefix(), equalTo("UO"));
        assertThat(resource.iriPrefix(), equalTo("http://purl.obolibrary.org/obo/UO_"));
    }

    @Test
    public void loadEfo() throws IOException {
        OntologyConceptResource or = loadOntologyResource(TestBase.TEST_BASE.resolve("efo.module.json"), ConceptResourceLoaders::efo);

        assertThat(or.ontology(), is(notNullValue(Ontology.class)));

        Resource resource = or.resource();
        assertThat(resource.id(), equalTo("efo"));
        assertThat(resource.name(), equalTo("Experimental Factor Ontology"));
        assertThat(resource.url(), equalTo("http://www.ebi.ac.uk/efo/efo.owl"));
        assertThat(resource.version(), equalTo("3.42.0"));
        assertThat(resource.namespacePrefix(), equalTo("EFO"));
        assertThat(resource.iriPrefix(), equalTo("http://www.ebi.ac.uk/efo/EFO_"));
    }

    @Test
    public void loadSo() throws IOException {
        OntologyConceptResource or = loadOntologyResource(TestBase.TEST_BASE.resolve("so.module.json"), ConceptResourceLoaders::so);

        assertThat(or.ontology(), is(notNullValue(Ontology.class)));

        Resource resource = or.resource();
        assertThat(resource.id(), equalTo("so"));
        assertThat(resource.name(), equalTo("Sequence types and features ontology"));
        assertThat(resource.url(), equalTo("http://purl.obolibrary.org/obo/so.owl"));
        assertThat(resource.version(), equalTo("UNKNOWN")); // TODO - resolve
        assertThat(resource.namespacePrefix(), equalTo("SO"));
        assertThat(resource.iriPrefix(), equalTo("http://purl.obolibrary.org/obo/SO_"));
    }

    @Test
    public void loadNcit() throws IOException {
        OntologyConceptResource or = loadOntologyResource(TestBase.TEST_BASE.resolve("ncit.module.json"), ConceptResourceLoaders::ncit);

        assertThat(or.ontology(), is(notNullValue(Ontology.class)));

        Resource resource = or.resource();
        assertThat(resource.id(), equalTo("ncit"));
        assertThat(resource.name(), equalTo("NCI Thesaurus"));
        assertThat(resource.url(), equalTo("http://purl.obolibrary.org/obo/ncit.owl"));
        assertThat(resource.version(), equalTo("22.03d"));
        assertThat(resource.namespacePrefix(), equalTo("NCIT"));
        assertThat(resource.iriPrefix(), equalTo("http://purl.obolibrary.org/obo/NCIT_"));
    }

    @Test
    public void loadGsso() throws IOException {
        OntologyConceptResource or = loadOntologyResource(TestBase.TEST_BASE.resolve("gsso.module.json"), ConceptResourceLoaders::gsso);

        assertThat(or.ontology(), is(notNullValue(Ontology.class)));

        Resource resource = or.resource();
        assertThat(resource.id(), equalTo("gsso"));
        assertThat(resource.name(), equalTo("GSSO - the Gender, Sex, and Sexual Orientation ontology"));
        assertThat(resource.url(), equalTo("http://purl.obolibrary.org/obo/gsso.owl"));
        assertThat(resource.version(), equalTo("UNKNOWN"));
        assertThat(resource.namespacePrefix(), equalTo("GSSO"));
        assertThat(resource.iriPrefix(), equalTo("http://purl.obolibrary.org/obo/GSSO_"));
    }
}