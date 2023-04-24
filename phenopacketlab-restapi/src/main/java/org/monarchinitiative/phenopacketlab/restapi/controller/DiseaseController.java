package org.monarchinitiative.phenopacketlab.restapi.controller;

import org.monarchinitiative.phenol.annotations.formats.hpo.HpoDisease;
import org.monarchinitiative.phenol.ontology.data.TermId;
import org.monarchinitiative.phenopacketlab.core.disease.DiseaseService;
import org.monarchinitiative.phenopacketlab.restapi.controller.dto.OntologyClassDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "${api.version}/diseases")
public class DiseaseController {

    private final DiseaseService diseaseService;

    public DiseaseController(DiseaseService diseaseService) {
        this.diseaseService = diseaseService;
    }

    private static Function<HpoDisease, OntologyClassDto> diseaseToDto() {
        return d -> new OntologyClassDto(d.id().getValue(), d.diseaseName());
    }

    @GetMapping("{id}")
    public ResponseEntity<OntologyClassDto> diseaseById(@PathVariable("id") String id) {
        TermId diseaseId = TermId.of(id);
        return ResponseEntity.of(diseaseService.diseaseById(diseaseId)
                .map(diseaseToDto()));
    }

    @GetMapping
    public ResponseEntity<List<OntologyClassDto>> allDiseases() {
        return ResponseEntity.ok(diseaseService.diseases()
                .map(diseaseToDto())
                .collect(Collectors.toList()));
    }

}
