package org.monarchinitiative.phenopacketlab.restapi.controller;

import org.monarchinitiative.phenopacketlab.core.ValidateService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "${api.version}/validate", method = RequestMethod.POST)
public class ValidateController {

    private final ValidateService validateService;

    public ValidateController(ValidateService validateService) {
        this.validateService = validateService;
    }

    @PostMapping
    public ResponseEntity<String> validatePhenopacket(@RequestBody String phenopacketString) {
        if (phenopacketString == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        String result = validateService.validate(phenopacketString);
        return ResponseEntity.ok(result);
    }
}
