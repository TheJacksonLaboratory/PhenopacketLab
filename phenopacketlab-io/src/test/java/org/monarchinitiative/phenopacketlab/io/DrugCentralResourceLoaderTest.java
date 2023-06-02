package org.monarchinitiative.phenopacketlab.io;

import org.junit.jupiter.api.Test;
import org.monarchinitiative.phenol.ontology.data.TermId;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConcept;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConceptResource;
import org.monarchinitiative.phenopacketlab.core.model.Resource;

import java.io.BufferedReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

import static org.hamcrest.MatcherAssert.*;
import static org.hamcrest.Matchers.*;

public class DrugCentralResourceLoaderTest {

    @Test
    public void load() throws Exception {
        Path resolve = TestBase.TEST_BASE.resolve("drugcentral.csv");
        IdentifiedConceptResource cr;
        try (BufferedReader br = Files.newBufferedReader(resolve)) {
            cr = DrugCentralResourceLoader.load(br);
        }

        assertThat(cr.size(), equalTo(8));

        LinkedList<IdentifiedConcept> concepts = cr.stream()
                .collect(Collectors.toCollection(LinkedList::new));

        assertThat(concepts.getFirst(), equalTo(IdentifiedConcept.of(TermId.of("DrugCentral:5392"), "capmatinib", "Capmatinib is a kinase inhibitor indicated for the treatment of adult patients with metastatic non-small cell lung cancer (NSCLC) whose tumors have a mutation that leads to mesenchymal-epithelial transition (MET) exon 14 skipping as detected by an FDA-approved test.", List.of())));
        assertThat(concepts.getLast(), equalTo(IdentifiedConcept.of(TermId.of("DrugCentral:5376"), "remdesivir", "Remdesivir is an investigational nucleotide analog with broad-spectrum antiviral activity. Remdesivir has demonstrated in vitro and in vivo activity in animal models against the viral pathogens MERS and SARS, which are also coronaviruses and are structurally similar to COVID-19. The limited preclinical data on remdesivir in MERS and SARS indicate that remdesivir may have potential activity against COVID-19. The only direct-acting antiviral (DAA) currently approved by FDA for the treatment of COVID-19 in certain populations.", List.of())));
        // Check the special case when the definition is absent.
        assertThat(concepts.get(5).getDefinition(), is(nullValue()));


        Resource resource = cr.getResource();
        assertThat(resource.getId(), equalTo("drugcentral"));
        assertThat(resource.getName(), equalTo("DrugCentral: online drug information resource"));
        assertThat(resource.getUrl(), equalTo("https://unmtid-shinyapps.net/download/drugcentral.dump.010_05_2021.sql.gz"));
        assertThat(resource.getVersion(), equalTo("2021-10-05"));
        assertThat(resource.getNamespacePrefix(), equalTo("DrugCentral"));
        assertThat(resource.getIriPrefix(), equalTo("https://drugcentral.org/drugcard/"));
    }
}