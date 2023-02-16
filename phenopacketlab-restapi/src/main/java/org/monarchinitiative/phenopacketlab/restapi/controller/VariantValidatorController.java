package org.monarchinitiative.phenopacketlab.restapi.controller;

import org.monarchinitiative.phenopacketlab.core.variantvalidator.VariantValidatorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/v1/variantvalidator")
public class VariantValidatorController {

    private VariantValidatorService variantValidatorService;

    public VariantValidatorController(VariantValidatorService variantValidatorService) {
        this.variantValidatorService = variantValidatorService;
    }

    @GetMapping
    public ResponseEntity<String> variantValidator(@RequestParam(defaultValue = "empty") String build,
                                                   @RequestParam(defaultValue = "empty") String description,
                                                   @RequestParam(defaultValue = "empty") String transcript) {
        String response;
        try {
            response = variantValidatorService.variantValidator(build, description, transcript);
        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.ok(response);
    }
}
