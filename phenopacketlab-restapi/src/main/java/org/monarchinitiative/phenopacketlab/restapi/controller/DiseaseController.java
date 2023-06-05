package org.monarchinitiative.phenopacketlab.restapi.controller;

import org.monarchinitiative.phenol.ontology.data.TermId;
import org.monarchinitiative.phenopacketlab.core.DiseaseService;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConcept;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "${api.version}/diseases")
public class DiseaseController {

    private final DiseaseService diseaseService;

    public DiseaseController(DiseaseService diseaseService) {
        this.diseaseService = diseaseService;
    }

    @GetMapping("{id}")
    public ResponseEntity<IdentifiedConcept> diseaseById(@PathVariable("id") String id) {
        TermId diseaseId = TermId.of(id);
        return ResponseEntity.of(diseaseService.diseaseConceptById(diseaseId));
    }

    @GetMapping
    public ResponseEntity<List<IdentifiedConcept>> allDiseases() {
        return ResponseEntity.ok(diseaseService.allDiseaseConcepts().toList());
    }

}
