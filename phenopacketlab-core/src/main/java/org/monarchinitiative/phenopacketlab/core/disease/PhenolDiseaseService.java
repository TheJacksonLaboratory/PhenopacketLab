package org.monarchinitiative.phenopacketlab.core.disease;

import org.monarchinitiative.phenol.annotations.formats.hpo.HpoDisease;
import org.monarchinitiative.phenol.annotations.formats.hpo.HpoDiseases;
import org.monarchinitiative.phenol.ontology.data.TermId;

import java.util.Map;
import java.util.Optional;
import java.util.stream.Stream;

public class PhenolDiseaseService implements DiseaseService {

    private final HpoDiseases diseases;
    private final Map<TermId, HpoDisease> diseaseById;


    public PhenolDiseaseService(HpoDiseases diseases) {
        this.diseases = diseases;
        this.diseaseById = diseases.diseaseById();
    }

    @Override
    public Optional<HpoDisease> diseaseById(TermId id) {
        return Optional.ofNullable(diseaseById.get(id));
    }

    @Override
    public Stream<HpoDisease> diseases() {
        return diseases.hpoDiseases();
    }
}
