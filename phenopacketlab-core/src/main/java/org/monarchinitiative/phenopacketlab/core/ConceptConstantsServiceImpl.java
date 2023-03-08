package org.monarchinitiative.phenopacketlab.core;

import org.monarchinitiative.phenopacketlab.core.subtree.SubtreeNode;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConcept;
import org.monarchinitiative.phenopacketlab.core.model.Concept;

import java.util.List;
import java.util.Map;
import java.util.Optional;

class ConceptConstantsServiceImpl implements ConceptConstantsService {

    private final List<IdentifiedConcept> sexConstants;
    private final List<IdentifiedConcept> genderConstants;
    private final List<IdentifiedConcept> allelicStateConstants;
    private final List<IdentifiedConcept> lateralityConstants;
    private final List<IdentifiedConcept> modifierConstants;
    private final SubtreeNode modifierTreeConstants;
    private final List<IdentifiedConcept> severityConstants;
    private final List<IdentifiedConcept> onsetConstants;
    private final SubtreeNode onsetTreeConstants;
    private final List<Concept> structuralTypeConstants;
    private final Map<String, List<Concept>> contigConstants;

    ConceptConstantsServiceImpl(List<IdentifiedConcept> sexConstants,
                                List<IdentifiedConcept> genderConstants,
                                List<IdentifiedConcept> allelicStateConstants,
                                List<IdentifiedConcept> lateralityConstants,
                                List<IdentifiedConcept> modifierConstants,
                                SubtreeNode modifierTreeConstants,
                                List<IdentifiedConcept> severityConstants,
                                List<IdentifiedConcept> onsetConstants,
                                SubtreeNode onsetTreeConstants,
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
    public Optional<SubtreeNode> onsetTreeConstants() {
        return Optional.ofNullable(onsetTreeConstants);
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
