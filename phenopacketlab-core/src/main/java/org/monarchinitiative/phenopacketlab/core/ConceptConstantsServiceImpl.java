package org.monarchinitiative.phenopacketlab.core;

import org.monarchinitiative.phenopacketlab.core.subtree.SubtreeNode;
import org.monarchinitiative.phenopacketlab.model.IdentifiedConcept;
import org.monarchinitiative.phenopacketlab.model.Concept;

import java.util.List;
import java.util.Map;

class ConceptConstantsServiceImpl implements ConceptConstantsService {

    private final List<IdentifiedConcept> sexConstants;
    private final List<IdentifiedConcept> genderConstants;
    private final List<IdentifiedConcept> allelicStateConstants;
    private final List<IdentifiedConcept> lateralityConstants;
    private final List<IdentifiedConcept> modifierConstants;
    private final List<SubtreeNode> modifierTreeConstants;
    private final List<IdentifiedConcept> severityConstants;
    private final List<IdentifiedConcept> onsetConstants;
    private final List<SubtreeNode> onsetTreeConstants;
    private final List<Concept> structuralTypeConstants;
    private final Map<String, List<Concept>> contigConstants;

    ConceptConstantsServiceImpl(List<IdentifiedConcept> sexConstants,
                                List<IdentifiedConcept> genderConstants,
                                List<IdentifiedConcept> allelicStateConstants,
                                List<IdentifiedConcept> lateralityConstants,
                                List<IdentifiedConcept> modifierConstants,
                                List<SubtreeNode> modifierTreeConstants,
                                List<IdentifiedConcept> severityConstants,
                                List<IdentifiedConcept> onsetConstants,
                                List<SubtreeNode> onsetTreeConstants,
                                List<Concept> structuralTypeConstants,
                                Map<String, List<Concept>> contigConstants) {
        this.sexConstants = sexConstants;
        this.genderConstants = genderConstants;
        this.allelicStateConstants = allelicStateConstants;
        this.lateralityConstants = lateralityConstants;
        this.modifierConstants = modifierConstants;
        this.modifierTreeConstants = modifierTreeConstants;
        this.severityConstants = severityConstants;
        this.onsetConstants = onsetConstants;
        this.onsetTreeConstants = onsetTreeConstants;
        this.structuralTypeConstants = structuralTypeConstants;
        this.contigConstants = contigConstants;
    }

    @Override
    public List<IdentifiedConcept> sexConstants() {
        return sexConstants;
    }

    @Override
    public List<IdentifiedConcept> genderConstants() {
        return genderConstants;
    }

    @Override
    public List<IdentifiedConcept> allelicStateConstants() {
        return allelicStateConstants;
    }

    @Override
    public List<IdentifiedConcept> lateralityConstants() {
        return lateralityConstants;
    }

    @Override
    public List<IdentifiedConcept> modifierConstants() {
        return modifierConstants;
    }
    public List<SubtreeNode> modifierTreeConstants() {
        return modifierTreeConstants;
    }

    @Override
    public List<IdentifiedConcept> severityConstants() {
        return severityConstants;
    }

    @Override
    public List<IdentifiedConcept> onsetConstants() {
        return onsetConstants;
    }

    @Override
    public List<SubtreeNode> onsetTreeConstants() {
        return onsetTreeConstants;
    }

    @Override
    public List<Concept> structuralTypeConstants() {
        return structuralTypeConstants;
    }

    @Override
    public List<Concept> contigConstants(String genomeAssembly) {
        return contigConstants.getOrDefault(genomeAssembly, List.of());
    }
}
