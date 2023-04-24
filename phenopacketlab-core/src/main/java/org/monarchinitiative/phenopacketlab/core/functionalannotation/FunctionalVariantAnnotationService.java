package org.monarchinitiative.phenopacketlab.core.functionalannotation;

import org.monarchinitiative.phenopacketlab.core.model.VariantMetadata;

import java.util.stream.Stream;

public interface FunctionalVariantAnnotationService {

    Stream<VariantMetadata> annotate(String genomeBuild, String description, TranscriptSelection selection);
}
