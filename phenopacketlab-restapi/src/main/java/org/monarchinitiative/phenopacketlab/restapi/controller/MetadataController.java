package org.monarchinitiative.phenopacketlab.restapi.controller;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import org.monarchinitiative.phenopacketlab.core.PhenopacketLabMetadataService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "${api.version}/metadata")
public class MetadataController {

    private final PhenopacketLabMetadataService metadataService;

    public MetadataController(PhenopacketLabMetadataService metadataService) {
        this.metadataService = metadataService;
    }

    @GetMapping(value="version")
    public ResponseEntity<String> phenopacketVersion() {
        return ResponseEntity.ok(metadataService.phenopacketSchemaVersion());
    }

    @ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Get Missing resource prefixes for phenopacket") })
    @PostMapping
    public ResponseEntity<List<String>> resourcePrefixesForPhenopacket(@RequestBody String phenopacketString) {
        return ResponseEntity.ok(metadataService.resourcesPrefixesForPhenopacket(phenopacketString).toList());
    }

}
