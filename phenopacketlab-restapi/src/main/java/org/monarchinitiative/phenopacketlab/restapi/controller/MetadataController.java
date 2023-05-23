package org.monarchinitiative.phenopacketlab.restapi.controller;

import io.swagger.v3.oas.annotations.Parameter;
import org.monarchinitiative.phenopacketlab.core.PhenopacketLabMetadata;
import org.monarchinitiative.phenopacketlab.core.model.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "${api.version}/metadata")
public class MetadataController {

    private final PhenopacketLabMetadata metadataService;

    public MetadataController(PhenopacketLabMetadata metadataService) {
        this.metadataService = metadataService;
    }

    @GetMapping("{prefix}")
    public ResponseEntity<Resource> metadataByPrefix(@PathVariable("prefix") @Parameter(description = """
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
                                                       """) String prefix) {
        List<String> acceptedPrefix = Arrays.asList("HP", "EFO", "GENO", "MONDO", "SO", "UBERON", "HGNC", "NCIT", "GSSO");
        if (!acceptedPrefix.contains(prefix.toUpperCase())) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.of(metadataService.resourceByPrefix(prefix));
    }

    @GetMapping
    public ResponseEntity<List<Resource>> metadata() {
        return ResponseEntity.ok(metadataService.resources()
                .collect(Collectors.toList()));
    }

    @GetMapping(value="version")
    public ResponseEntity<String> phenopacketVersion() {
        return ResponseEntity.ok(metadataService.phenopacketSchemaVersion());
    }
}
