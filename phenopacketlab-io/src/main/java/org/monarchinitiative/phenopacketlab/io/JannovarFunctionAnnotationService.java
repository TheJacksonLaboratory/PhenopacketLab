package org.monarchinitiative.phenopacketlab.io;

import org.monarchinitiative.phenopacketlab.core.functionalannotation.FunctionalVariantAnnotationService;
import org.monarchinitiative.phenopacketlab.core.functionalannotation.TranscriptSelection;
import org.monarchinitiative.phenopacketlab.core.model.VariantMetadata;

import java.util.stream.Stream;

public class JannovarFunctionAnnotationService implements FunctionalVariantAnnotationService {
    @Override
    public Stream<VariantMetadata> annotate(String genomeBuild, String description, TranscriptSelection selection) {
        // TODO
        throw new RuntimeException("Not yet implemented");
    }

}
