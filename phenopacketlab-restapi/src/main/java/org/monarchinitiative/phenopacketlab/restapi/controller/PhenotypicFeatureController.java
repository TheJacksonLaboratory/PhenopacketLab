package org.monarchinitiative.phenopacketlab.restapi.controller;

import org.monarchinitiative.phenol.ontology.data.Term;
import org.monarchinitiative.phenol.ontology.data.TermId;
import org.monarchinitiative.phenopacketlab.core.ontology.HpoService;
import org.monarchinitiative.phenopacketlab.restapi.controller.dto.OntologyClassDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "${api.version}/phenotypic-features")
public class PhenotypicFeatureController {

    private final HpoService phenotypicFeatureService;

    public PhenotypicFeatureController(HpoService phenotypicFeatureService) {
        this.phenotypicFeatureService = phenotypicFeatureService;
    }

    private static Function<Term, OntologyClassDto> phenotypicFeatureToDto() {
        return d -> new OntologyClassDto(d.id().getValue(), d.getName());
    }

    @GetMapping("{id}")
    public ResponseEntity<OntologyClassDto> phenotypicFeatureById(@PathVariable("id") String id) {
        TermId phenotypicFeatureId = TermId.of(id);
        return ResponseEntity.of(phenotypicFeatureService.phenotypicFeatureById(phenotypicFeatureId)
                .map(phenotypicFeatureToDto()));
    }

    @GetMapping
    public ResponseEntity<List<OntologyClassDto>> allPhenotypicFeatures() {
        return ResponseEntity.ok(phenotypicFeatureService.phenotypicFeatures()
                .map(phenotypicFeatureToDto())
                .collect(Collectors.toList()));
    }

}
