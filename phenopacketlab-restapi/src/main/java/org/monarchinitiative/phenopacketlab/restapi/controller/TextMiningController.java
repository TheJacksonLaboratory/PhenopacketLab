package org.monarchinitiative.phenopacketlab.restapi.controller;

import org.monarchinitiative.phenol.ontology.data.Term;
import org.monarchinitiative.phenol.ontology.data.TermId;
import org.monarchinitiative.phenopacketlab.core.miner.TextMiningService;
import org.monarchinitiative.phenopacketlab.core.model.MinedText;
import org.monarchinitiative.phenopacketlab.core.ontology.HpoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;


@RestController
@RequestMapping(value = "${api.version}/textminer", method = RequestMethod.POST)
public class TextMiningController {

    private final TextMiningService textMiningService;
    private final Path phenopacketLabDataDirectory;
    private final HpoService phenotypicFeatureService;

    public TextMiningController(TextMiningService textMiningService, Path phenopacketLabDataDirectory,
                                HpoService phenotypicFeatureService) {
        this.textMiningService = textMiningService;
        this.phenopacketLabDataDirectory = phenopacketLabDataDirectory;
        this.phenotypicFeatureService = phenotypicFeatureService;
    }

    @PostMapping
    public ResponseEntity<MinedText> minedText(@RequestBody String payload) {
        if (payload == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        // TODO we could add isExactMatch as a parameter to the endpoint
        boolean isExactMatch = true;
        MinedText result = textMiningService.mineText(payload,
                phenopacketLabDataDirectory.toString() + "/hp.json", isExactMatch);
        // query hpo for labels
        result.getConcepts().forEach(concept -> {
            TermId phenotypicFeatureId = TermId.of(concept.getId());
            Term term = phenotypicFeatureService.phenotypicFeatureById(phenotypicFeatureId).isPresent()?
                    phenotypicFeatureService.phenotypicFeatureById(phenotypicFeatureId).get():null;
            assert term != null;
            concept.setLabel(term.getName());
        });
        return ResponseEntity.ok(result);
    }

}
