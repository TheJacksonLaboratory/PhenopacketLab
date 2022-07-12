package org.monarchinitiative.phenopacketlab.restapi.controller;

import org.monarchinitiative.phenol.annotations.base.Ratio;
import org.monarchinitiative.phenol.annotations.base.temporal.TemporalInterval;
import org.monarchinitiative.phenol.annotations.formats.AnnotationReference;
import org.monarchinitiative.phenol.annotations.formats.hpo.HpoDiseaseAnnotation;
import org.monarchinitiative.phenol.ontology.data.TermId;

import java.util.List;

/**
 * The {@link HpoDiseaseAnnotation} API is still a WIP. Thus, we need this implementation.
 */
public class TestHpoDiseaseAnnotation implements HpoDiseaseAnnotation {

    private final TermId id;
    private final Ratio ratio;
    private final List<TemporalInterval> observationIntervals;
    private final List<TermId> modifiers;
    private final List<AnnotationReference> references;

    public TestHpoDiseaseAnnotation(TermId id,
                                    Ratio ratio,
                                    List<TemporalInterval> observationIntervals,
                                    List<TermId> modifiers,
                                    List<AnnotationReference> references) {
        this.id = id;
        this.ratio = ratio;
        this.observationIntervals = observationIntervals;
        this.modifiers = modifiers;
        this.references = references;
    }

    @Override
    public TermId id() {
        return id;
    }

    @Override
    public Ratio ratio() {
        return ratio;
    }

    @Override
    public Iterable<TemporalInterval> observationIntervals() {
        return observationIntervals;
    }

    @Override
    public Ratio observedInInterval(TemporalInterval interval) {
        return ratio;
    }

    @Override
    public List<TermId> modifiers() {
        return modifiers;
    }

    @Override
    public List<AnnotationReference> references() {
        return references;
    }
}
