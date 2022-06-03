package org.monarchinitiative.phenopacketlab.restapi.controller;


import org.monarchinitiative.phenopacketlab.core.ConceptConstantsService;
import org.monarchinitiative.phenopacketlab.model.Concept;
import org.monarchinitiative.phenopacketlab.model.IdentifiedConcept;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "${api.version}/constants")
public class ConceptConstantsController {

    private final ConceptConstantsService conceptConstantsService;

    public ConceptConstantsController(ConceptConstantsService conceptConstantsService) {
        this.conceptConstantsService = conceptConstantsService;
    }

    @GetMapping(value = "structural", headers = "Accept=application/json")
    public ResponseEntity<List<Concept>> getStructuralType() {
        return ResponseEntity.ok(conceptConstantsService.structuralTypeConstants());
    }

    @GetMapping(value = "allelic_state", headers = "Accept=application/json")
    public ResponseEntity<List<IdentifiedConcept>> getAllelicStateValues() {
        return ResponseEntity.ok(conceptConstantsService.allelicStateConstants());
    }

    @GetMapping(value = "laterality", headers = "Accept=application/json")
    public ResponseEntity<List<IdentifiedConcept>> getLateralityConstants() {
        return ResponseEntity.ok(conceptConstantsService.lateralityConstants());
    }

    @GetMapping(value = "sex", headers = "Accept=application/json")
    public ResponseEntity<List<IdentifiedConcept>> getSexValues() {
        return ResponseEntity.ok(conceptConstantsService.sexConstants());
    }

    @GetMapping(value = "gender", headers = "Accept=application/json")
    public ResponseEntity<List<IdentifiedConcept>> getGenderValues() {
        return ResponseEntity.ok(conceptConstantsService.genderConstants());
    }

    @GetMapping(value = "modifier", headers = "Accept=application/json")
    public ResponseEntity<List<IdentifiedConcept>> getModifierConstants() {
        return ResponseEntity.ok(conceptConstantsService.modifierConstants());
    }

    @GetMapping(value = "severity", headers = "Accept=application/json")
    public ResponseEntity<List<IdentifiedConcept>> getSeverityValues() {
        return ResponseEntity.ok(conceptConstantsService.severityConstants());
    }

    @GetMapping(value = "onset", headers = "Accept=application/json")
    public ResponseEntity<List<IdentifiedConcept>> getOnsetValues() {
        return ResponseEntity.ok(conceptConstantsService.onsetConstants());
    }

    @GetMapping(value = "contigs/{genomeAssembly}", headers = "Accept=application/json")
    public ResponseEntity<List<Concept>> getContigs(@PathVariable("genomeAssembly") String genomeAssembly) {
        List<Concept> concepts = conceptConstantsService.contigConstants(genomeAssembly);
        if (concepts.isEmpty())
            // TODO - is this OK?
            return ResponseEntity.notFound().build();
        else
            return ResponseEntity.ok(concepts);
    }

}
