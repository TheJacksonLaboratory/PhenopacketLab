package org.monarchinitiative.phenopacketlab.core;

import org.monarchinitiative.phenopacketlab.core.subtree.SubtreeNode;
import org.monarchinitiative.phenopacketlab.model.IdentifiedConcept;
import org.monarchinitiative.phenopacketlab.model.Concept;

import java.util.List;
import java.util.Optional;

/**
 * The service for providing {@link IdentifiedConcept}s and {@link Concept}s for phenopacket attributes.
 */
public interface ConceptConstantsService {

    List<IdentifiedConcept> sexConstants();

    List<IdentifiedConcept> genderConstants();

    List<IdentifiedConcept> allelicStateConstants();

    List<IdentifiedConcept> lateralityConstants();

    List<IdentifiedConcept> modifierConstants();

    Optional<SubtreeNode> modifierTreeConstants();

    List<IdentifiedConcept> severityConstants();

    List<IdentifiedConcept> onsetConstants();

    Optional<SubtreeNode> onsetTreeConstants();

    Optional<SubtreeNode> tnmTumorTreeConstants();

    Optional<SubtreeNode> tnmNodeTreeConstants();

    Optional<SubtreeNode> tnmMetastasisTreeConstants();

    List<Concept> structuralTypeConstants();

    List<Concept> contigConstants(String genomeAssembly);

}
