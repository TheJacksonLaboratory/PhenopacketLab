package org.monarchinitiative.phenopacketlab.restapi.controller;

import org.monarchinitiative.phenol.annotations.formats.hpo.HpoDisease;
import org.monarchinitiative.phenol.ontology.data.TermId;
import org.monarchinitiative.phenopacketlab.core.disease.DiseaseService;
import org.monarchinitiative.phenopacketlab.restapi.controller.dto.DiseaseDto;
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

    private static Function<HpoDisease, DiseaseDto> diseaseToDto() {
        return d -> new DiseaseDto(d.id().getValue(), d.getDiseaseName());
    }

    @GetMapping("{id}")
    public ResponseEntity<DiseaseDto> diseaseById(@PathVariable("id") String id) {
        TermId diseaseId = TermId.of(id);
        return ResponseEntity.of(diseaseService.diseaseById(diseaseId)
                .map(diseaseToDto()));
    }

    @GetMapping
    public ResponseEntity<List<DiseaseDto>> allDiseases() {
        return ResponseEntity.ok(diseaseService.diseases()
                .map(diseaseToDto())
                .collect(Collectors.toList()));
    }

}
