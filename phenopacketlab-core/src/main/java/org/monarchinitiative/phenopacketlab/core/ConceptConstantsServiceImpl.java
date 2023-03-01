package org.monarchinitiative.phenopacketlab.core;

import org.monarchinitiative.phenopacketlab.core.subtree.SubtreeNode;
import org.monarchinitiative.phenopacketlab.model.IdentifiedConcept;
import org.monarchinitiative.phenopacketlab.model.Concept;

import java.util.List;
import java.util.Map;
import java.util.Optional;

class ConceptConstantsServiceImpl implements ConceptConstantsService {

    private final List<IdentifiedConcept> sexConstants;
    private final List<IdentifiedConcept> genderConstants;
    private final List<IdentifiedConcept> allelicStateConstants;
    private final List<IdentifiedConcept> lateralityConstants;
    private final List<IdentifiedConcept> modifierConstants;
    private final Optional<SubtreeNode> modifierTreeConstants;
    private final List<IdentifiedConcept> severityConstants;
    private final List<IdentifiedConcept> onsetConstants;
    private final Optional<SubtreeNode> onsetTreeConstants;
    private final Optional<SubtreeNode> tnmTumorTreeConstants;
    private final Optional<SubtreeNode> tnmNodeTreeConstants;
    private final Optional<SubtreeNode> tnmMetastasisTreeConstants;
    private final List<Concept> structuralTypeConstants;
    private final Map<String, List<Concept>> contigConstants;

    ConceptConstantsServiceImpl(List<IdentifiedConcept> sexConstants,
                                List<IdentifiedConcept> genderConstants,
                                List<IdentifiedConcept> allelicStateConstants,
                                List<IdentifiedConcept> lateralityConstants,
                                List<IdentifiedConcept> modifierConstants,
                                Optional<SubtreeNode> modifierTreeConstants,
                                List<IdentifiedConcept> severityConstants,
                                List<IdentifiedConcept> onsetConstants,
                                Optional<SubtreeNode> onsetTreeConstants,
                                Optional<SubtreeNode> tnmTumorTreeConstants,
                                Optional<SubtreeNode> tnmNodeTreeConstants,
                                Optional<SubtreeNode> tnmMetastasisTreeConstants,
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
        this.tnmTumorTreeConstants = tnmTumorTreeConstants;
        this.tnmNodeTreeConstants = tnmNodeTreeConstants;
        this.tnmMetastasisTreeConstants = tnmMetastasisTreeConstants;
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

    @Override
    public Optional<SubtreeNode> modifierTreeConstants() {
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
    public Optional<SubtreeNode> tnmTumorTreeConstants() { return tnmTumorTreeConstants; }

    @Override
    public Optional<SubtreeNode> tnmNodeTreeConstants() { return tnmNodeTreeConstants; }

    @Override
    public Optional<SubtreeNode> tnmMetastasisTreeConstants() { return tnmMetastasisTreeConstants; }

    @Override
    public Optional<SubtreeNode> onsetTreeConstants() {
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
