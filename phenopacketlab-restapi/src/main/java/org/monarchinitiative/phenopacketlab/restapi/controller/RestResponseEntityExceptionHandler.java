package org.monarchinitiative.phenopacketlab.restapi.controller;

import org.monarchinitiative.phenol.base.PhenolRuntimeException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class RestResponseEntityExceptionHandler {

    @ExceptionHandler(value = {PhenolRuntimeException.class})
    protected ResponseEntity<Object> handleConflict(PhenolRuntimeException e) {
        return ResponseEntity.badRequest()
                .body(e.getMessage());
    }

}
