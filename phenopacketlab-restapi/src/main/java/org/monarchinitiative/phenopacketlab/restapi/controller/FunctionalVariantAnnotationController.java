package org.monarchinitiative.phenopacketlab.restapi.controller;

import io.swagger.v3.oas.annotations.Parameter;
import org.monarchinitiative.phenopacketlab.core.functionalannotation.FunctionalVariantAnnotationService;
import org.monarchinitiative.phenopacketlab.core.functionalannotation.TranscriptSelection;
import org.monarchinitiative.phenopacketlab.core.model.VariantMetadata;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping(value = "${api.version}/functional-annotation/{build}/{description}/{transcript}")
//@Tag(name = "Variant endpoint", description = "Given a genome build, an HGVS description and a transcript id, the endpoint will return a Variant object.")
public class FunctionalVariantAnnotationController {

    private FunctionalVariantAnnotationService functionalAnnotationVariantService;

    public FunctionalVariantAnnotationController(FunctionalVariantAnnotationService functionalAnnotationVariantService) {
        this.functionalAnnotationVariantService = functionalAnnotationVariantService;
    }

    @GetMapping
    public ResponseEntity<List<VariantMetadata>> annotate(@PathVariable()
                                               @Parameter(description = """
                                                       __Accepted:__

                                                       * GRCh37
                                                       * GRCh38
                                                       * hg19
                                                       * hg38
                                                       """) String build,
                                                          @PathVariable() @Parameter(description = """
                                                                  __HGVS__

                                                                  * NM_000088.3:c.589G>T
                                                                  * NC_000017.10:g.48275363C>A
                                                                  * NG_007400.1:g.8638G>T
                                                                  * LRG_1:g.8638G>T
                                                                  * LRG_1t1:c.589G>T

                                                                  __Pseudo-VCF__

                                                                  * 17-50198002-C-A
                                                                  * 17:50198002:C:A
                                                                  * GRCh38-17-50198002-C-A
                                                                  * GRCh38:17:50198002:C:A

                                                                  __Hybrid__

                                                                  * chr17:50198002C>A
                                                                  * chr17:50198002C>A(GRCh38)
                                                                  * chr17(GRCh38):50198002C>A
                                                                  * chr17:g.50198002C>A
                                                                  * chr17:g.50198002C>A(GRCh38)
                                                                  * chr17(GRCh38):g.50198002C>A""")
                                                   String description,
                                                          @PathVariable() @Parameter(description= """
                                                                  __Return all possible transcripts__

                                                                  all

                                                                  __Return only 'select' transcripts__

                                                                  prefered
                                                                  """)
//                                                   "* mane_select\n" +
//                                                   "* refseq_select\n\n" +
//                                                   "__Single__\n\n" +
//                                                   "NM_000093.4\n\n" +
//                                                   "__Multiple__\n\n" +
//                                                   "NM_000093.4|NM_001278074.1|NM_000093.3")
                                               String transcript) {
        if (transcript.equals("prefered")) {
            return ResponseEntity.ok(functionalAnnotationVariantService.annotate(build, description, TranscriptSelection.PREFERRED).collect(Collectors.toList()));
        } else if (transcript.equals("all")) {
            return ResponseEntity.ok(functionalAnnotationVariantService.annotate(build, description, TranscriptSelection.ALL).collect(Collectors.toList()));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}
