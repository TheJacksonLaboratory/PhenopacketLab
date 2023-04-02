package org.monarchinitiative.phenopacketlab.core;

import org.monarchinitiative.phenopacketlab.core.subtree.SubtreeNode;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConcept;
import org.monarchinitiative.phenopacketlab.core.model.Concept;

import java.util.List;
import java.util.Map;
import java.util.Optional;

class ConceptConstantsServiceImpl implements ConceptConstantsService {

    private final List<IdentifiedConcept> sexConstants;
    private final List<Concept> genderConstants;
    private final List<IdentifiedConcept> allelicStateConstants;
    private final List<IdentifiedConcept> lateralityConstants;
    private final List<IdentifiedConcept> modifierConstants;
    private final SubtreeNode modifierTreeConstants;
    private final List<IdentifiedConcept> severityConstants;
    private final List<IdentifiedConcept> onsetConstants;
    private final SubtreeNode onsetTreeConstants;
    private final SubtreeNode tnmTumorTreeConstants;
    private final SubtreeNode tnmNodeTreeConstants;
    private final SubtreeNode tnmMetastasisTreeConstants;
    private final SubtreeNode diseaseStagesTreeConstants;
    private final SubtreeNode allelicStateTreeConstants;
    private final List<IdentifiedConcept> structuralTypeConstants;
    private final SubtreeNode structuralTypeTreeConstants;
    private final Map<String, List<Concept>> contigConstants;

    ConceptConstantsServiceImpl(List<IdentifiedConcept> sexConstants,
                                List<Concept> genderConstants,
                                List<IdentifiedConcept> allelicStateConstants,
                                List<IdentifiedConcept> lateralityConstants,
                                List<IdentifiedConcept> modifierConstants,
                                SubtreeNode modifierTreeConstants,
                                List<IdentifiedConcept> severityConstants,
                                List<IdentifiedConcept> onsetConstants,
                                SubtreeNode onsetTreeConstants,
                                SubtreeNode tnmTumorTreeConstants,
                                SubtreeNode tnmNodeTreeConstants,
                                SubtreeNode tnmMetastasisTreeConstants,
                                SubtreeNode diseaseStagesTreeConstants,
                                SubtreeNode allelicStateTreeConstants,
                                List<IdentifiedConcept> structuralTypeConstants,
                                SubtreeNode structuralTypeTreeConstants,
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
        this.diseaseStagesTreeConstants = diseaseStagesTreeConstants;
        this.allelicStateTreeConstants = allelicStateTreeConstants;
        this.structuralTypeConstants = structuralTypeConstants;
        this.structuralTypeTreeConstants = structuralTypeTreeConstants;
        this.contigConstants = contigConstants;
    }

    @Override
    public List<IdentifiedConcept> sexConstants() {
        return sexConstants;
    }

    @Override
    public List<Concept> genderConstants() {
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
        return Optional.ofNullable(modifierTreeConstants);
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
    public Optional<SubtreeNode> tnmTumorTreeConstants() { return Optional.ofNullable(tnmTumorTreeConstants); }

    @Override
    public Optional<SubtreeNode> tnmNodeTreeConstants() { return Optional.ofNullable(tnmNodeTreeConstants); }

    @Override
    public Optional<SubtreeNode> tnmMetastasisTreeConstants() { return Optional.ofNullable(tnmMetastasisTreeConstants); }

    @Override
    public Optional<SubtreeNode> diseaseStagesTreeConstants() { return Optional.ofNullable(diseaseStagesTreeConstants); }

    @Override
    public Optional<SubtreeNode> onsetTreeConstants() { return Optional.ofNullable(onsetTreeConstants); }

    @Override
    public Optional<SubtreeNode> allelicStateTreeConstants() { return Optional.ofNullable(allelicStateTreeConstants); }

    @Override
    public List<IdentifiedConcept> structuralTypeConstants() {
        return structuralTypeConstants;
    }

    @Override
    public Optional<SubtreeNode> structuralTypeTreeConstants() { return Optional.ofNullable(structuralTypeTreeConstants); }

    @Override
    public List<Concept> contigConstants(String genomeAssembly) {
        return contigConstants.getOrDefault(genomeAssembly, List.of());
    }
}
