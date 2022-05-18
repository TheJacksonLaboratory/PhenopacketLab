package org.monarchinitiative.phenopacketlab.io;

import org.junit.jupiter.api.Test;
import org.monarchinitiative.phenol.ontology.data.TermId;
import org.monarchinitiative.phenopacketlab.model.Concept;
import org.monarchinitiative.phenopacketlab.model.ConceptResource;
import org.phenopackets.schema.v2.core.Resource;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;
import static org.hamcrest.MatcherAssert.*;
import static org.hamcrest.Matchers.*;

public class HgncConceptLoaderTest {

    @Test
    public void load() throws IOException {
        Path resolve = TestBase.TEST_BASE.resolve("hgnc_complete_set.head10_and_special.tsv");
        ConceptResource cr;
        try (BufferedReader br = Files.newBufferedReader(resolve)) {
            cr = HgncConceptLoader.load(br, "2022-05-17");
        }

        assertThat(cr.size(), equalTo(11));

        LinkedList<Concept> concepts = cr.stream().collect(Collectors.toCollection(LinkedList::new));
        assertThat(concepts.getFirst(), equalTo(Concept.of(TermId.of("HGNC:5"), "A1BG", "alpha-1-B glycoprotein", List.of())));
        assertThat(concepts.getLast(), equalTo(Concept.of(TermId.of("HGNC:21"), "AATK", "apoptosis associated tyrosine kinase", List.of("lemur tyrosine kinase 1", "protein phosphatase 1, regulatory subunit 77"))));

        Resource resource = cr.resource();
        assertThat(resource.getId(), equalTo("hgnc"));
        assertThat(resource.getName(), equalTo("HUGO Gene Nomenclature Committee"));
        assertThat(resource.getUrl(), equalTo("http://ftp.ebi.ac.uk/pub/databases/genenames/hgnc/tsv/hgnc_complete_set.txt"));
        assertThat(resource.getVersion(), equalTo("2022-05-17"));
        assertThat(resource.getNamespacePrefix(), equalTo("HGNC"));
        assertThat(resource.getIriPrefix(), equalTo("http://identifiers.org/hgnc/HGNC:"));
    }
}