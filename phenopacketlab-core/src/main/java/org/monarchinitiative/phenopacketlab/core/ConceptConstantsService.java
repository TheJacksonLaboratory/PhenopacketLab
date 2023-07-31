package org.monarchinitiative.phenopacketlab.core;

import org.monarchinitiative.phenopacketlab.core.subtree.SubtreeNode;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConcept;
import org.monarchinitiative.phenopacketlab.core.model.Concept;

import java.util.List;
import java.util.Optional;

/**
 * The service for providing {@link IdentifiedConcept}s and {@link Concept}s for phenopacket attributes.
 */
public interface ConceptConstantsService {

    List<IdentifiedConcept> sexConstants();

    List<Concept> genderConstants();

    List<IdentifiedConcept> allelicStateConstants();

    List<IdentifiedConcept> lateralityConstants();

    List<IdentifiedConcept> modifierConstants();

    List<IdentifiedConcept> severityConstants();

    List<IdentifiedConcept> onsetConstants();

    Optional<SubtreeNode> modifierTreeConstants();

    List<IdentifiedConcept> evidenceConstants();

    Optional<SubtreeNode> evidenceTreeConstants();

    Optional<SubtreeNode> onsetTreeConstants();

    Optional<SubtreeNode> tnmTumorTreeConstants();

    Optional<SubtreeNode> tnmNodeTreeConstants();

    Optional<SubtreeNode> tnmMetastasisTreeConstants();

    List<IdentifiedConcept> structuralTypeConstants();

    Optional<SubtreeNode> structuralTypeTreeConstants();

    List<Concept> contigConstants(String genomeAssembly);

    Optional<SubtreeNode> diseaseStagesTreeConstants();

    Optional<SubtreeNode> allelicStateTreeConstants();

    Optional<SubtreeNode> routeOfAdministrationTreeConstants();

    Optional<SubtreeNode> scheduleFrequencyTreeConstants();

    Optional<SubtreeNode> adverseEventTreeConstants();

    Optional<SubtreeNode> bodySiteTreeConstants();

    Optional<SubtreeNode> unitTreeConstants();
}
