package org.monarchinitiative.phenopacketlab.restapi.controller;


import org.monarchinitiative.phenopacketlab.core.ConceptConstantsService;
import org.monarchinitiative.phenopacketlab.core.TaxonomyService;
import org.monarchinitiative.phenopacketlab.core.subtree.SubtreeNode;
import org.monarchinitiative.phenopacketlab.core.model.Concept;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConcept;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * The controller for serving requests for <em>constant</em> values required in the frontend UI elements that allow
 * a pre-defined range of options (i.e. contigs of a genome assembly for describing variant's position).
 */
@RestController
@RequestMapping(value = "${api.version}/constants")
public class ConceptConstantsController {

    private final ConceptConstantsService conceptConstantsService;
    private final TaxonomyService taxonomyService;

    public ConceptConstantsController(ConceptConstantsService conceptConstantsService, TaxonomyService taxonomyService) {
        this.conceptConstantsService = conceptConstantsService;
        this.taxonomyService = taxonomyService;
    }

    @GetMapping(value = "structural", headers = "Accept=application/json")
    public ResponseEntity<List<IdentifiedConcept>> getStructuralType() {
        return ResponseEntity.ok(conceptConstantsService.structuralTypeConstants());
    }

    @GetMapping(value = "tree-structural", headers = "Accept=application/json")
    public ResponseEntity<SubtreeNode> getStructuralTypeTreeValues() {
        Optional<SubtreeNode> node = conceptConstantsService.structuralTypeTreeConstants();
        return node.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
    }

    @GetMapping(value = "allelic-states", headers = "Accept=application/json")
    public ResponseEntity<List<IdentifiedConcept>> getAllelicStateValues() {
        return ResponseEntity.ok(conceptConstantsService.allelicStateConstants());
    }

    @GetMapping(value = "laterality", headers = "Accept=application/json")
    public ResponseEntity<List<IdentifiedConcept>> getLateralityConstants() {
        return ResponseEntity.ok(conceptConstantsService.lateralityConstants());
    }

    @GetMapping(value = "sex", headers = "Accept=application/json")
    public ResponseEntity<List<IdentifiedConcept>> getSexValues() {
        return ResponseEntity.ok(conceptConstantsService.sexConstants());
    }

    @GetMapping(value = "gender", headers = "Accept=application/json")
    public ResponseEntity<List<Concept>> getGenderValues() {
        return ResponseEntity.ok(conceptConstantsService.genderConstants());
    }

    @GetMapping(value = "modifier", headers = "Accept=application/json")
    public ResponseEntity<List<IdentifiedConcept>> getModifierConstants() {
        return ResponseEntity.ok(conceptConstantsService.modifierConstants());
    }

    @GetMapping(value = "evidence", headers = "Accept=application/json")
    public ResponseEntity<List<IdentifiedConcept>> getEvidenceConstants() {
        return ResponseEntity.ok(conceptConstantsService.evidenceConstants());
    }

    @GetMapping(value = "treemodifier", headers = "Accept=application/json")
    public ResponseEntity<SubtreeNode> getModifierTreeValues() {
        Optional<SubtreeNode> node = conceptConstantsService.modifierTreeConstants();
        return node.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
    }

    @GetMapping(value = "evidencetree", headers = "Accept=application/json")
    public ResponseEntity<SubtreeNode> getEvidenceTreeValues() {
        Optional<SubtreeNode> node = conceptConstantsService.evidenceTreeConstants();
        return node.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
    }

    @GetMapping(value = "severity", headers = "Accept=application/json")
    public ResponseEntity<List<IdentifiedConcept>> getSeverityValues() {
        return ResponseEntity.ok(conceptConstantsService.severityConstants());
    }

    @GetMapping(value = "onset", headers = "Accept=application/json")
    public ResponseEntity<List<IdentifiedConcept>> getOnsetValues() {
        return ResponseEntity.ok(conceptConstantsService.onsetConstants());
    }

    @GetMapping(value = "treeonset", headers = "Accept=application/json")
    public ResponseEntity<SubtreeNode> getOnsetTreeValues() {
        Optional<SubtreeNode> node = conceptConstantsService.onsetTreeConstants();
        return node.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
    }

    @GetMapping(value = "tree-tnm-tumor", headers = "Accept=application/json")
    public ResponseEntity<SubtreeNode> getTnmTumorTreeValues() {
        Optional<SubtreeNode> node = conceptConstantsService.tnmTumorTreeConstants();
        return node.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
    }

    @GetMapping(value = "tree-tnm-node", headers = "Accept=application/json")
    public ResponseEntity<SubtreeNode> getTnmNodesTreeValues() {
        Optional<SubtreeNode> node = conceptConstantsService.tnmNodeTreeConstants();
        return node.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
    }

    @GetMapping(value = "tree-tnm-metastasis", headers = "Accept=application/json")
    public ResponseEntity<SubtreeNode> getTnmMetastasisTreeValues() {
        Optional<SubtreeNode> node = conceptConstantsService.tnmMetastasisTreeConstants();
        return node.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
    }

    @GetMapping(value = "tree-disease-stages", headers = "Accept=application/json")
    public ResponseEntity<SubtreeNode> getDiseaseStagesTreeValues() {
        Optional<SubtreeNode> node = conceptConstantsService.diseaseStagesTreeConstants();
        return node.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
    }

    @GetMapping(value = "tree-allelic-states", headers = "Accept=application/json")
    public ResponseEntity<SubtreeNode> getAllelicStatesTreeValues() {
        Optional<SubtreeNode> node = conceptConstantsService.allelicStateTreeConstants();
        return node.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
    }

    @GetMapping(value = "tree-route-administration", headers = "Accept=application/json")
    public ResponseEntity<SubtreeNode> getRouteOfAdministrationTreeValues() {
        Optional<SubtreeNode> node = conceptConstantsService.routeOfAdministrationTreeConstants();
        return node.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
    }

    @GetMapping(value = "tree-schedule-frequency", headers = "Accept=application/json")
    public ResponseEntity<SubtreeNode> getScheduleFrequencyTreeValues() {
        Optional<SubtreeNode> node = conceptConstantsService.scheduleFrequencyTreeConstants();
        return node.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
    }

    @GetMapping(value = "tree-adverse-event", headers = "Accept=application/json")
    public ResponseEntity<SubtreeNode> getAdverseEventTreeValues() {
        Optional<SubtreeNode> node = conceptConstantsService.adverseEventTreeConstants();
        return node.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
    }

    @GetMapping(value = "tree-body-site", headers = "Accept=application/json")
    public ResponseEntity<SubtreeNode> getBodySiteTreeValues() {
        Optional<SubtreeNode> node = conceptConstantsService.bodySiteTreeConstants();
        return node.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
    }

    @GetMapping(value = "tree-treatment-status", headers = "Accept=application/json")
    public ResponseEntity<SubtreeNode> getTreatmentStatusTreeValues() {
        Optional<SubtreeNode> node = conceptConstantsService.treatmentStatusTreeConstants();
        return node.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
    }

    @GetMapping(value = "tree-unit", headers = "Accept=application/json")
    public ResponseEntity<SubtreeNode> geUnitTreeValues() {
        Optional<SubtreeNode> node = conceptConstantsService.unitTreeConstants();
        return node.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
    }

    @GetMapping(value = {"homosapiens"},headers = "Accept=application/json")
    public ResponseEntity<IdentifiedConcept> getHomoSapiensTaxonomy() {
        return ResponseEntity.of(taxonomyService.homoSapiensNCBIConcept());
    }

    @GetMapping(value = "contigs/{genomeAssembly}", headers = "Accept=application/json")
    public ResponseEntity<List<Concept>> getContigs(@PathVariable("genomeAssembly") String genomeAssembly) {
        List<Concept> concepts = conceptConstantsService.contigConstants(genomeAssembly);
        if (concepts.isEmpty())
            // TODO - is this OK?
            return ResponseEntity.notFound().build();
        else
            return ResponseEntity.ok(concepts);
    }

}
