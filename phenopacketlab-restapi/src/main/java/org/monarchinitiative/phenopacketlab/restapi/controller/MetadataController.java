package org.monarchinitiative.phenopacketlab.restapi.controller;

import org.monarchinitiative.phenopacketlab.core.PhenopacketLabMetadata;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "${api.version}/metadata")
public class MetadataController {

    private final PhenopacketLabMetadata metadata;

    public MetadataController(PhenopacketLabMetadata metadata) {
        this.metadata = metadata;
     }

    @GetMapping(value="version")
    public ResponseEntity<String> phenopacketVersion() {
        return ResponseEntity.ok(metadata.phenopacketSchemaVersion());
    }

}
