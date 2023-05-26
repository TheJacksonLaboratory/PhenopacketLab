package org.monarchinitiative.phenopacketlab.restapi.controller;

import io.swagger.v3.oas.annotations.Parameter;
import org.monarchinitiative.phenopacketlab.core.ConceptResourceService;
import org.monarchinitiative.phenopacketlab.core.PhenopacketLabMetadata;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConceptResource;
import org.monarchinitiative.phenopacketlab.core.model.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "${api.version}/metadata")
public class MetadataController {

    private final PhenopacketLabMetadata metadataService;
    private final ConceptResourceService conceptResourceService;


    public MetadataController(PhenopacketLabMetadata metadataService,
                              ConceptResourceService conceptResourceService) {
        this.metadataService = metadataService;
        this.conceptResourceService = conceptResourceService;
    }

    @GetMapping("{prefix}")
    public ResponseEntity<Resource> metadataByPrefix(@PathVariable("prefix")
    // TODO - update the description string
                                                         @Parameter(description = """
                                                       __Accepted:__

                                                       * HP
                                                       * EFO
                                                       * GENO
                                                       * MONDO
                                                       * SO
                                                       * UBERON
                                                       * HGNC
                                                       * NCIT
                                                       * GSSO
                                                       * ECO
                                                       """) String prefix) {
        return conceptResourceService.forPrefix(prefix.toUpperCase())
                .map(IdentifiedConceptResource::getResource)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());
    }

    @GetMapping
    public ResponseEntity<List<Resource>> metadata() {
        return ResponseEntity.ok(conceptResourceService.resources().toList());
    }

    @GetMapping(value="version")
    public ResponseEntity<String> phenopacketVersion() {
        return ResponseEntity.ok(metadataService.phenopacketSchemaVersion());
    }
}
