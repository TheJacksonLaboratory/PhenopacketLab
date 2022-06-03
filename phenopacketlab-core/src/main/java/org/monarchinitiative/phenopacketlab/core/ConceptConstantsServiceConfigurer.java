package org.monarchinitiative.phenopacketlab.core;

import org.monarchinitiative.phenol.constants.hpo.HpoOnsetTermIds;
import org.monarchinitiative.phenol.constants.hpo.HpoSubOntologyRootTermIds;
import org.monarchinitiative.phenol.ontology.algo.OntologyAlgorithm;
import org.monarchinitiative.phenol.ontology.data.Ontology;
import org.monarchinitiative.phenol.ontology.data.TermId;
import org.monarchinitiative.phenopacketlab.model.IdentifiedConcept;
import org.monarchinitiative.phenopacketlab.model.IdentifiedConceptResource;
import org.monarchinitiative.phenopacketlab.model.OntologyConceptResource;
import org.monarchinitiative.phenopacketlab.model.Concept;
import org.monarchinitiative.svart.Contig;
import org.monarchinitiative.svart.assembly.GenomicAssemblies;
import org.monarchinitiative.svart.assembly.GenomicAssembly;
import org.monarchinitiative.svart.assembly.SequenceRole;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * A utility class for creating {@link ConceptConstantsService} using {@link ConceptResourceService}.
 */
public class ConceptConstantsServiceConfigurer {

    private static final Logger LOGGER = LoggerFactory.getLogger(ConceptConstantsServiceConfigurer.class);

    public static ConceptConstantsService configure(ConceptResourceService resourceService) {
        List<IdentifiedConcept> sexConstants = configureSexConstants(resourceService);
        List<IdentifiedConcept> genderConstants = configureGenderConstants(resourceService);
        List<IdentifiedConcept> allelicStateConstants = configureAllelicStateConstants(resourceService);
        List<IdentifiedConcept> lateralityConstants = configureLateralityConstants(resourceService);
        List<IdentifiedConcept> modifierConstants = configureModifierConstants(resourceService);
        List<IdentifiedConcept> severityConstants = configureSeverityConstants(resourceService);
        List<IdentifiedConcept> onsetConstants = configureOnsetConstants(resourceService);
        List<Concept> structuralTypeConstants = configureStructuralTypes();
        Map<String, List<Concept>> contigConstants = configureContigConstants();

        return new ConceptConstantsServiceImpl(sexConstants,
                genderConstants,
                allelicStateConstants,
                lateralityConstants,
                modifierConstants,
                severityConstants,
                onsetConstants,
                structuralTypeConstants,
                contigConstants);
    }

    private static List<IdentifiedConcept> configureSexConstants(ConceptResourceService resourceService) {
        Optional<IdentifiedConceptResource> ncitOptional = resourceService.forPrefix("NCIT");
        if (ncitOptional.isEmpty()) {
            LOGGER.warn("Cannot configure sex constants due to missing NCIT concept resource!");
            return List.of();
        }

        IdentifiedConceptResource ncit = ncitOptional.get();
        List<IdentifiedConcept> concepts = new ArrayList<>(4);

        retrieveIdentifiedConcept(ncit, "NCIT:C20197", concepts, "Missing Male sex NCIT:C20197");
        retrieveIdentifiedConcept(ncit, "NCIT:C16576", concepts, "Missing Female sex NCIT:C16576");
        retrieveIdentifiedConcept(ncit, "NCIT:C41438", concepts, "Missing Undifferentiated sex NCIT:C41438");
        retrieveIdentifiedConcept(ncit, "NCIT:C17998", concepts, "Missing Unknown sex NCIT:C17998");

        return Collections.unmodifiableList(concepts);
    }

    private static List<IdentifiedConcept> configureGenderConstants(ConceptResourceService resourceService) {
        Optional<IdentifiedConceptResource> gssoOpt = resourceService.forPrefix("GSSO");
        if (gssoOpt.isEmpty()) {
            LOGGER.warn("Cannot configure gender constants due to missing GSSO concept resource!");
            return List.of();
        }

        IdentifiedConceptResource gsso = gssoOpt.get();
        List<IdentifiedConcept> concepts = new ArrayList<>(6);
        retrieveIdentifiedConcept(gsso, "GSSO:009469", concepts, "Missing adgender GSSO:009469");
        retrieveIdentifiedConcept(gsso, "GSSO:004240", concepts, "Missing cisgender GSSO:004240");
        retrieveIdentifiedConcept(gsso, "GSSO:009470", concepts, "Missing integragender GSSO:009470");
        retrieveIdentifiedConcept(gsso, "GSSO:009471", concepts, "Missing ipsogender GSSO:009471");
        retrieveIdentifiedConcept(gsso, "GSSO:000096", concepts, "Missing transgender GSSO:000096");
        retrieveIdentifiedConcept(gsso, "GSSO:009472", concepts, "Missing ultergender GSSO:009472");

        return Collections.unmodifiableList(concepts);
    }

    private static List<IdentifiedConcept> configureAllelicStateConstants(ConceptResourceService resourceService) {
        Optional<IdentifiedConceptResource> genoOpt = resourceService.forPrefix("GENO");
        if (genoOpt.isEmpty()) {
            LOGGER.warn("Cannot configure allelic state constants due to missing GENO concept resource!");
            return List.of();
        }

        IdentifiedConceptResource geno = genoOpt.get();
        List<IdentifiedConcept> concepts = new ArrayList<>(4);

        retrieveIdentifiedConcept(geno, "GENO:0000136", concepts, "Missing homozygous allelic state GENO:0000136");
        retrieveIdentifiedConcept(geno, "GENO:0000135", concepts, "Missing heterozygous allelic state GENO:0000135");
        retrieveIdentifiedConcept(geno, "GENO:0000134", concepts, "Missing hemizygous allelic state GENO:0000134");

        return Collections.unmodifiableList(concepts);
    }

    private static List<IdentifiedConcept> configureLateralityConstants(ConceptResourceService resourceService) {
        Optional<IdentifiedConceptResource> hpOptional = resourceService.forPrefix("HP");
        if (hpOptional.isEmpty()) {
            LOGGER.warn("Cannot configure laterality constants due to missing HP concept resource!");
            return List.of();
        }

        IdentifiedConceptResource hp = hpOptional.get();
        List<IdentifiedConcept> concepts = new ArrayList<>(4);

        retrieveIdentifiedConcept(hp, "HP:0012832", concepts, "Missing Bilateral HP:0012832");
        retrieveIdentifiedConcept(hp, "HP:0012834", concepts, "Missing Right HP:0012834");
        retrieveIdentifiedConcept(hp, "HP:0012835", concepts, "Missing Left HP:0012835");
        retrieveIdentifiedConcept(hp, "HP:0012833", concepts, "Missing Unilateral HP:0012833");

        return Collections.unmodifiableList(concepts);
    }

    private static List<IdentifiedConcept> configureModifierConstants(ConceptResourceService resourceService) {
        Optional<IdentifiedConceptResource> hpOptional = resourceService.forPrefix("HP");
        if (hpOptional.isEmpty()) {
            LOGGER.warn("Cannot configure modifier constants due to missing HP concept resource!");
            return List.of();
        }


        IdentifiedConceptResource hp = hpOptional.get();
        if (hp instanceof OntologyConceptResource) {
            Ontology hpo = ((OntologyConceptResource) hp).getOntology();
            Set<TermId> modifierIds = OntologyAlgorithm.getChildTerms(hpo, HpoSubOntologyRootTermIds.CLINICAL_MODIFIER, false);

            return modifierIds.stream()
                    .map(hp::conceptForTermId)
                    .flatMap(Optional::stream)
                    .collect(Collectors.toList());
        } else {
            LOGGER.warn("BUG: HP concept resource should implement OntologyConceptResource.");
            return List.of();
        }
    }

    private static List<IdentifiedConcept> configureOnsetConstants(ConceptResourceService resourceService) {
        Optional<IdentifiedConceptResource> hpOptional = resourceService.forPrefix("HP");
        if (hpOptional.isEmpty()) {
            LOGGER.warn("Cannot configure onset constants due to missing HP concept resource!");
            return List.of();
        }

        IdentifiedConceptResource hp = hpOptional.get();
        if (hp instanceof OntologyConceptResource) {
            Ontology hpo = ((OntologyConceptResource) hp).getOntology();
            Set<TermId> onsetIds = OntologyAlgorithm.getChildTerms(hpo, HpoOnsetTermIds.ONSET, false);

            return onsetIds.stream()
                    .map(hp::conceptForTermId)
                    .flatMap(Optional::stream)
                    .collect(Collectors.toList());
        } else {
            LOGGER.warn("BUG: HP concept resource should implement OntologyConceptResource.");
            return List.of();
        }
    }

    private static List<IdentifiedConcept> configureSeverityConstants(ConceptResourceService resourceService) {
        Optional<IdentifiedConceptResource> hpOptional = resourceService.forPrefix("HP");
        if (hpOptional.isEmpty()) {
            LOGGER.warn("Cannot configure severity constants due to missing HP concept resource!");
            return List.of();
        }

        IdentifiedConceptResource hp = hpOptional.get();
        List<IdentifiedConcept> concepts = new ArrayList<>(5);

        retrieveIdentifiedConcept(hp, "HP:0012829", concepts, "Missing Profound HP:0012829");
        retrieveIdentifiedConcept(hp, "HP:0012828", concepts, "Missing Severe HP:0012828");
        retrieveIdentifiedConcept(hp, "HP:0012826", concepts, "Missing Moderate HP:0012826");
        retrieveIdentifiedConcept(hp, "HP:0012825", concepts, "Missing Mild HP:0012825");
        retrieveIdentifiedConcept(hp, "HP:0012827", concepts, "Missing Borderline HP:0012827");

        return Collections.unmodifiableList(concepts);
    }

    private static List<Concept> configureStructuralTypes() {
        Concept del = Concept.of("DEL", "Deletion.", List.of());
        Concept ins = Concept.of("INS", "Insertion.", List.of());
        Concept dup = Concept.of("DUP", "Duplication.", List.of());
        Concept inv = Concept.of("INV", "Inversion.", List.of());
        Concept cnv = Concept.of("CNV", "Copy number variation.", List.of());
        Concept bnd = Concept.of("BND", "Breakend.", List.of());

        return List.of(del, ins, dup, inv, cnv, bnd);
    }

    private static Map<String, List<Concept>> configureContigConstants() {
        GenomicAssembly hg19Assembly = GenomicAssemblies.GRCh37p13();
        List<Concept> hg19 = prepareContigConcepts(hg19Assembly);

        GenomicAssembly hg38Assembly = GenomicAssemblies.GRCh38p13();
        List<Concept> hg38 = prepareContigConcepts(hg38Assembly);

        return Map.of(
                hg19Assembly.name(), hg19,
                hg38Assembly.name(), hg38
        );
    }

    private static List<Concept> prepareContigConcepts(GenomicAssembly assembly) {
        return assembly.contigs().stream()
                .filter(c -> c.sequenceRole().equals(SequenceRole.ASSEMBLED_MOLECULE))
                .sorted(Contig::compare)
                .map(toConcept())
                .collect(Collectors.toList());
    }

    private static Function<Contig, Concept> toConcept() {
        return contig -> Concept.of(contig.name(), contig.ucscName(), List.of(contig.genBankAccession(), contig.refSeqAccession()));
    }

    private static void retrieveIdentifiedConcept(IdentifiedConceptResource resource,
                                                  String termId,
                                                  List<IdentifiedConcept> concepts,
                                                  String messageOnMissing) {
        resource.conceptForTermId(TermId.of(termId))
                .ifPresentOrElse(concepts::add, () -> LOGGER.warn(messageOnMissing));
    }

}
