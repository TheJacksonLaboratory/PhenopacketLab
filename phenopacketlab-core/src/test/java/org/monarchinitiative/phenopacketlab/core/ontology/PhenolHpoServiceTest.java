package org.monarchinitiative.phenopacketlab.core.ontology;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.monarchinitiative.phenol.io.OntologyLoader;
import org.monarchinitiative.phenol.ontology.data.Ontology;
import org.monarchinitiative.phenol.ontology.data.Term;
import org.monarchinitiative.phenol.ontology.data.TermId;
import org.monarchinitiative.phenopacketlab.core.TestUtils;

import java.nio.file.Path;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.hasItems;
import static org.hamcrest.Matchers.hasSize;

public class PhenolHpoServiceTest {

    private static final Path TOY_HPO_PATH = TestUtils.PHENOPACKET_LAB_CORE_TEST_DIR.resolve("ontology/hpo_toy.json");

    private static Ontology hpo;

    private PhenolHpoService service;

    @BeforeAll
    public static void beforeAll() {
        hpo = OntologyLoader.loadOntology(TOY_HPO_PATH.toFile());
    }

    @BeforeEach
    public void setUp() {
        service = new PhenolHpoService(hpo);
    }

    @Test
    public void severities() {
        Collection<Term> severities = service.severities();

        assertThat(severities, hasSize(5));

        List<String> severityTermIds = severities.stream()
                .map(Term::id)
                .map(TermId::getValue)
                .collect(Collectors.toList());
        assertThat(severityTermIds, hasItems("HP:0012825", "HP:0012826", "HP:0012827", "HP:0012828", "HP:0012829"));
    }

    @Test
    public void onsets() {
        Collection<Term> onsets = service.onsets();

        assertThat(onsets, hasSize(14));

        List<String> onsetTermIds = onsets.stream()
                .map(Term::id)
                .map(TermId::getValue)
                .collect(Collectors.toList());
        assertThat(onsetTermIds, hasItems(
                "HP:0030674", "HP:0011461", "HP:0011460", // Antenatal & descendents
                "HP:0003577", // Congenital
                "HP:4000040", // Puerpural
                "HP:0003623", // Neonatal
                "HP:0410280", "HP:0003593", "HP:0003621", "HP:0011463", // Pediatric & descendents
                "HP:0003581", "HP:0003584", "HP:0011462", "HP:0003596"  // Adult & descendents
        ));
    }
}