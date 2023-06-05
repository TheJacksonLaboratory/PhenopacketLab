package org.monarchinitiative.phenopacketlab.restapi.controller;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.monarchinitiative.phenopacketlab.core.ConceptResourceService;
import org.monarchinitiative.phenopacketlab.core.model.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "${api.version}/resource")
public class ResourceController {

    private final ConceptResourceService resourceService;

    public ResourceController(ConceptResourceService resourceService) {
        this.resourceService = resourceService;
    }

    @ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Get all known resources") })
    @GetMapping
    public ResponseEntity<List<Resource>> resources() {
        return ResponseEntity.ok(resourceService.resources().toList());
    }

}
