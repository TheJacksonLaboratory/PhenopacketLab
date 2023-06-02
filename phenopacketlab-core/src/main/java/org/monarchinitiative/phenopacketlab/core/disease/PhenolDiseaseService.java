package org.monarchinitiative.phenopacketlab.core.disease;

import org.monarchinitiative.phenol.annotations.formats.hpo.HpoDisease;
import org.monarchinitiative.phenol.annotations.formats.hpo.HpoDiseases;
import org.monarchinitiative.phenol.ontology.data.TermId;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConcept;

import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Stream;

public class PhenolDiseaseService implements DiseaseService {

    private final HpoDiseases diseases;
    private final Map<TermId, HpoDisease> diseaseById;


    public PhenolDiseaseService(HpoDiseases diseases) {
        this.diseases = diseases;
        this.diseaseById = diseases.diseaseById();
    }

    @Override
    public Optional<IdentifiedConcept> diseaseConceptById(TermId id) {
        return diseases.diseaseById(id)
                .map(toPhenolIdentifiedConcept());
    }

    @Override
    public Stream<IdentifiedConcept> allDiseaseConcepts() {
        return diseases.hpoDiseases()
                .map(toPhenolIdentifiedConcept());
    }

    @Override
    public Optional<HpoDisease> diseaseById(TermId id) {
        return Optional.ofNullable(diseaseById.get(id));
    }

    @Override
    public Stream<HpoDisease> diseases() {
        return diseases.hpoDiseases();
    }

    private static Function<HpoDisease, IdentifiedConcept> toPhenolIdentifiedConcept() {
        return hd -> new PhenolDiseaseIdentifiedConcept(hd.id(), hd.diseaseName());
    }
}
