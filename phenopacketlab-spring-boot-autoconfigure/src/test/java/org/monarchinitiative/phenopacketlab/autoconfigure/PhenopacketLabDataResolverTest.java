package org.monarchinitiative.phenopacketlab.autoconfigure;

import org.junit.jupiter.api.Test;
import org.monarchinitiative.phenopacketlab.autoconfigure.exception.MissingPhenopacketLabResourceException;

import java.nio.file.Files;
import java.nio.file.Path;

import static org.hamcrest.MatcherAssert.*;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class PhenopacketLabDataResolverTest {

    @Test
    public void test() throws Exception {
        PhenopacketLabDataResolver resolver = new PhenopacketLabDataResolver(AbstractAutoConfigurationTest.DATA_DIR);

        assertThat(Files.isRegularFile(resolver.genoJsonPath()), equalTo(true));
        assertThat(Files.isRegularFile(resolver.hgncCompleteSetPath()), equalTo(true));
        assertThat(Files.isRegularFile(resolver.hpJsonPath()), equalTo(true));
        assertThat(Files.isRegularFile(resolver.mondoJsonPath()), equalTo(true));
        assertThat(Files.isRegularFile(resolver.hpoAnnotationPath()), equalTo(true));
        assertThat(Files.isRegularFile(resolver.soJsonPath()), equalTo(true));
        assertThat(Files.isRegularFile(resolver.uberonJsonPath()), equalTo(true));
        assertThat(Files.isRegularFile(resolver.ncitJsonPath()), equalTo(true));
        assertThat(Files.isRegularFile(resolver.ecoJsonPath()), equalTo(true));

    }

    @Test
    public void error() {
        MissingPhenopacketLabResourceException e = assertThrows(MissingPhenopacketLabResourceException.class, () -> new PhenopacketLabDataResolver(Path.of("")));
        assertThat(e.getMessage(), equalTo("The following files are missing in the data directory: 'geno.json', 'hgnc_complete_set.txt', 'hp.json', 'mondo.json', 'phenotype.hpoa', 'so.json', 'uberon.json', 'uo.json', 'ncit.json', 'drugcentral.csv', 'eco.json', 'chebi.json', 'oae.json'."));
    }
}