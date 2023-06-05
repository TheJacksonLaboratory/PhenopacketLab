package org.monarchinitiative.phenopacketlab.restapi.controller;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import org.monarchinitiative.phenopacketlab.core.ConceptResourceService;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConceptResource;
import org.monarchinitiative.phenopacketlab.core.PhenopacketLabMetadata;

import org.monarchinitiative.phenopacketlab.core.model.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "${api.version}/metadata")
public class MetadataController {

    private final PhenopacketLabMetadata metadata;
    private final ConceptResourceService conceptResourceService;


    public MetadataController(PhenopacketLabMetadata metadata,
                              ConceptResourceService conceptResourceService) {
        this.metadata = metadata;
        this.conceptResourceService = conceptResourceService;
    }

    @ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Get resource metadata given one of the accepted prefixes") })
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
                .map(IdentifiedConceptResource::resource)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());
    }

    @ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Get all known resources metadata ") })
    @GetMapping
    public ResponseEntity<List<Resource>> metadata() {
        return ResponseEntity.ok(conceptResourceService.conceptResources().toList());
    }

    @GetMapping(value="version")
    public ResponseEntity<String> phenopacketVersion() {
        return ResponseEntity.ok(metadata.phenopacketSchemaVersion());
    }

    @ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Get Missing resource prefixes for phenopacket") })
    @PostMapping
    public ResponseEntity<List<String>> resourcePrefixesForPhenopacket(@RequestBody String phenopacketString) {
        return ResponseEntity.ok(conceptResourceService.resourcesPrefixesForPhenopacket(phenopacketString).toList());
    }

}
