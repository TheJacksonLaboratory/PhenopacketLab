package org.monarchinitiative.phenopacketlab.core.subtree;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.monarchinitiative.phenol.io.OntologyLoader;
import org.monarchinitiative.phenol.ontology.data.Ontology;
import org.monarchinitiative.phenol.ontology.data.TermId;
import org.monarchinitiative.phenopacketlab.core.OntologyHierarchyService;
import org.monarchinitiative.phenopacketlab.core.PhenolOntologyHierarchyService;
import org.monarchinitiative.phenopacketlab.core.TestUtils;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConceptResource;
import org.monarchinitiative.phenopacketlab.core.model.OntologyConceptResource;
import org.monarchinitiative.phenopacketlab.core.model.Resource;

import java.nio.file.Path;
import java.util.Comparator;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

public class CreateSubtreeTest {

    private static final Path TOY_HPO_PATH = TestUtils.PHENOPACKET_LAB_CORE_TEST_DIR.resolve("ontology/hpo_toy.json");

    private static Ontology HPO;

    @BeforeAll
    public static void beforeAll() {
        HPO = OntologyLoader.loadOntology(TOY_HPO_PATH.toFile());
    }

    private OntologyHierarchyService hierarchyService;
    private IdentifiedConceptResource conceptResource;

    @BeforeEach
    public void setUp() {
        hierarchyService = new PhenolOntologyHierarchyService("HP", HPO);
        conceptResource = OntologyConceptResource.of(HPO,
                Resource.of("hp",
                        "human phenotype ontology",
                        "http://purl.obolibrary.org/obo/hp.owl",
                        "2018-03-08",
                        "HP",
                        "http://purl.obolibrary.org/obo/HP_"));
    }

    @Test
    public void createSubtree() {
        TermId onset = TermId.of("HP:0003674");
        Optional<SubtreeNode> root = CreateSubtree.createSubtree(onset, conceptResource, hierarchyService, null, null, true);
        assertThat(root.isPresent(), equalTo(true));
        assertThat(root.get().getKey(), equalTo(onset.getValue()));
        assertThat(root.get().getLabel(), equalTo("Onset"));
        assertThat(root.get().getChildren(), hasSize(6));
        assertThat(root.get().getChildren().stream()
                .map(SubtreeNode::getLabel)
                .toList(),
                hasItems("Antenatal onset", "Adult onset", "Congenital onset",
                        "Neonatal onset", "Puerpural onset", "Pediatric onset"));
    }

    @Test
    public void createSortedSubtree() {
        TermId onset = TermId.of("HP:0003674");
        Optional<SubtreeNode> root = CreateSubtree.createSubtree(onset, conceptResource, hierarchyService, Comparator.comparing(SubtreeNode::getLabel), null, true);
        assertThat(root.isPresent(), equalTo(true));
        assertThat(root.get().getKey(), equalTo(onset.getValue()));
        assertThat(root.get().getLabel(), equalTo("Onset"));
        assertThat(root.get().getChildren().stream()
                        .map(SubtreeNode::getLabel)
                        .toList(),
                hasItems("Antenatal onset", "Adult onset", "Congenital onset",
                        "Neonatal onset", "Puerpural onset", "Pediatric onset"));
    }
}