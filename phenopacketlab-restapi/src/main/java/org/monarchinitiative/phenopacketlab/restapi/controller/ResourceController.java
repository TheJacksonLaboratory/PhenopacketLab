package org.monarchinitiative.phenopacketlab.restapi.controller;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.monarchinitiative.phenopacketlab.core.ConceptResourceService;
import org.monarchinitiative.phenopacketlab.core.PhenopacketResourceService;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConceptResource;
import org.monarchinitiative.phenopacketlab.core.model.PrefixResource;
import org.monarchinitiative.phenopacketlab.core.model.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(value = "${api.version}/resource")
public class ResourceController {

    private final ConceptResourceService resourceService;
    private final PhenopacketResourceService phenopacketResourceService;

    public ResourceController(ConceptResourceService resourceService,
                              PhenopacketResourceService phenopacketResourceService) {
        this.resourceService = resourceService;
        this.phenopacketResourceService = phenopacketResourceService;
    }

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
            description = "Get all known resources")
    })
    @GetMapping
    public ResponseEntity<List<Resource>> resources() {
        return ResponseEntity.ok(resourceService.conceptResources().toList());
    }

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
            description = "Get resource metadata given an ontology namespace prefix (e.g. `MONDO`)")
    })
    @GetMapping("{prefix}")
    public ResponseEntity<Resource> resourceByPrefix(@PathVariable("prefix") String prefix) {
        return ResponseEntity.of(resourceService.forPrefix(prefix)
                .map(IdentifiedConceptResource::resource));
    }


    @ApiResponses(value = { @ApiResponse(responseCode = "200",
            description = """
                          Get a list of resources to put into Metadata for given top-level element of phenopacket.
                          """) })
    @PostMapping
    // TODO - handle the exception
    public ResponseEntity<List<PrefixResource>> resourcePrefixesForPhenopacketElement(@RequestBody String phenopacketElementJson) throws IOException {
        return ResponseEntity.ok(phenopacketResourceService.getPrefixResourcesForPhenopacketElement(phenopacketElementJson));
    }
}
