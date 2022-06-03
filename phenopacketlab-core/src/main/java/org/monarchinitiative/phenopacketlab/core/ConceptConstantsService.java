package org.monarchinitiative.phenopacketlab.core;

import org.monarchinitiative.phenopacketlab.model.IdentifiedConcept;
import org.monarchinitiative.phenopacketlab.model.Concept;

import java.util.List;

public interface ConceptConstantsService {

    List<IdentifiedConcept> sexConstants();

    List<IdentifiedConcept> genderConstants();

    List<IdentifiedConcept> allelicStateConstants();

    List<IdentifiedConcept> lateralityConstants();

    List<IdentifiedConcept> modifierConstants();

    List<Concept> structuralTypeConstants();

    List<Concept> contigConstants(String genomeAssembly);

}
