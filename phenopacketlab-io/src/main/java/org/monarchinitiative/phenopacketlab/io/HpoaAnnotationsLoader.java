package org.monarchinitiative.phenopacketlab.io;

import org.monarchinitiative.phenol.annotations.io.hpo.*;
import org.monarchinitiative.phenol.ontology.data.TermId;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConcept;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConceptResource;
import org.monarchinitiative.phenopacketlab.core.model.Resource;
import org.phenopackets.phenopackettools.builder.builders.Resources;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * A utility class for loading {@link org.monarchinitiative.phenopacketlab.core.model.IdentifiedConcept}s
 * from HPO annotations file.
 */
public class HpoaAnnotationsLoader {

    private HpoaAnnotationsLoader() {
    }

    public static List<IdentifiedConceptResource> load(InputStream is,
                                                       List<DiseaseDatabase> databases) {
        HpoaDiseaseDataLoader loader = HpoaDiseaseDataLoader.of(Set.copyOf(databases));
        HpoaDiseaseDataContainer diseaseData;
        try {
            diseaseData = loader.loadDiseaseData(is);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        Map<String, List<IdentifiedConcept>> conceptsByPrefix = diseaseData.stream()
                .map(toHpoaIdentifiedConcept())
                .collect(Collectors.groupingBy(ic -> ic.id().getPrefix()));

        return conceptsByPrefix.entrySet().stream()
                .map(e -> IdentifiedConceptResource.of(e.getValue(), getResource(e.getKey(), diseaseData)))
                .toList();
    }

    private static Resource getResource(String namespacePrefix, HpoaDiseaseDataContainer diseaseData) {
        return switch (namespacePrefix) {
            case "OMIM" -> new PhenopacketResource(Resources.omimVersion(diseaseData.version().orElse("UNKNOWN_VERSION")));
            case "ORPHA" -> Resource.of("orpha",
                    "Orphanet",
                    "https://www.orpha.net",
                    diseaseData.version().orElse("UNKNOWN_VERSION"),
                    "ORPHA",
                    "https://www.orpha.net/consor/cgi-bin/OC_Exp.php?Lng=GB&Expert=");
            case "DECIPHER" -> Resource.of("decipher",
                    "Decipher",
                    "https://www.deciphergenomics.org/",
                    diseaseData.version().orElse("UNKNOWN_VERSION"),
                    "DECIPHER",
                    "https://www.deciphergenomics.org/syndrome/");

            default -> throw new IllegalStateException("Unexpected value: " + namespacePrefix);
        };
    }

    private static Function<HpoaDiseaseData, IdentifiedConcept> toHpoaIdentifiedConcept() {
        return dd -> new HpoaIdentifiedConcept(dd.id(), dd.name());
    }

    private record HpoaIdentifiedConcept(TermId id, String name) implements IdentifiedConcept {

        @Override
        public String getName() {
            return name;
        }

        @Override
        public String getDefinition() {
            return null;
        }

        @Override
        public List<String> getSynonyms() {
            return List.of();
        }
    }
}
