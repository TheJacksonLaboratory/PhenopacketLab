package org.monarchinitiative.phenopacketlab.core.subtree;

import com.google.common.collect.Comparators;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.monarchinitiative.phenol.io.OntologyLoader;
import org.monarchinitiative.phenol.ontology.data.Ontology;
import org.monarchinitiative.phenol.ontology.data.TermId;
import org.monarchinitiative.phenopacketlab.core.TestUtils;

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


    @Test
    public void createSubtree() {
        TermId onset = TermId.of("HP:0003674");
        Optional<SubtreeNode> root = CreateSubtree.createSubtree(onset, HPO, null, null);
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
        Optional<SubtreeNode> root = CreateSubtree.createSubtree(onset, HPO, Comparator.comparing(SubtreeNode::getLabel), null);
        assertThat(root.isPresent(), equalTo(true));
        assertThat(root.get().getKey(), equalTo(onset.getValue()));
        assertThat(root.get().getLabel(), equalTo("Onset"));
        assertThat(Comparators.isInOrder(root.get().getChildren(), Comparator.comparing(SubtreeNode::getLabel)), equalTo(true));
        assertThat(root.get().getChildren().stream()
                        .map(SubtreeNode::getLabel)
                        .toList(),
                hasItems("Antenatal onset", "Adult onset", "Congenital onset",
                        "Neonatal onset", "Puerpural onset", "Pediatric onset"));
    }
}