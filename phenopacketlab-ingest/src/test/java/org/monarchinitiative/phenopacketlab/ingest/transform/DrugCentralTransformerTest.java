package org.monarchinitiative.phenopacketlab.ingest.transform;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.monarchinitiative.phenopacketlab.ingest.TestBase;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

import static org.hamcrest.MatcherAssert.*;
import static org.hamcrest.Matchers.*;

public class DrugCentralTransformerTest {

    @TempDir
    public Path tempDir;

    @Test
    public void transform() throws Exception {
        Path input = TestBase.TEST_BASE.resolve("transform").resolve("drugcentral.dump.excerpt.sql.gz");
        Path destination = tempDir.resolve("drugcentral.concepts.csv");
        String url = "https://unmtid-shinyapps.net/download/drugcentral.dump.010_05_2021.sql.gz";
        String version = "2020-10-05";

        assertThat(Files.isRegularFile(destination), equalTo(false));

        DrugCentralTransformer.transform(input, destination, url, version);

        assertThat(Files.isRegularFile(destination), equalTo(true));
        List<String> lines = TestBase.readLines(destination);
        lines.forEach(System.err::println);
        assertThat(lines, hasSize(12));
        assertThat(lines.get(0), equalTo(String.format("# url=%s;version=%s", url, version)));
        assertThat(lines.get(1), equalTo("id,label,definition")); // header
        assertThat(lines.get(2), equalTo("5392,capmatinib,Capmatinib is a kinase inhibitor indicated for the treatment of adult patients with metastatic non-small cell lung cancer (NSCLC) whose tumors have a mutation that leads to mesenchymal-epithelial transition (MET) exon 14 skipping as detected by an FDA-approved test."));
        assertThat(lines.get(11), equalTo("5435,naxitamab,\"Naxitamab-gqgk is a glycolipid disialoganglioside (GD2)-binding recombinant humanized monoclonal IgG1 antibody, that contains human framework regions and murine complementarity-determining regions. Naxitamab-gqgk binds to the glycolipid GD2. GD2 is a disialoganglioside that is overexpressed on neuroblastoma cells and other cells of neuroectodermal origin, including the central nervous system and peripheral nerves. In vitro, naxitamab-gqgk was able to bind to cell surface GD2 and induce complement dependent cytotoxicity (CDC) and antibody dependent cell-mediated cytotoxicity (ADCC).\""));
    }
}