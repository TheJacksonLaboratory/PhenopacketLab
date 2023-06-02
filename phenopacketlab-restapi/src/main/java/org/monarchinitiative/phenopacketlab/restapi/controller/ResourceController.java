package org.monarchinitiative.phenopacketlab.restapi.controller;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.monarchinitiative.phenopacketlab.core.ConceptResourceService;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConceptResource;
import org.monarchinitiative.phenopacketlab.core.model.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

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

    @ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Get resource metadata given one of the accepted prefixes (Separated by comma)") })
    @GetMapping("{prefixes}")
    public ResponseEntity<List<Resource>> resourcesByPrefixes(@PathVariable("prefixes")
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
                                                       * CHEBI
                                                       
                                                      Example: HP,GENO,ECO
                                                       """) String[] prefixes) {
        return ResponseEntity.ok(resourceService.conceptResourcesForPrefixes(List.of(prefixes))
                .map(IdentifiedConceptResource::getResource)
                .collect(Collectors.toList()));

    }
}
