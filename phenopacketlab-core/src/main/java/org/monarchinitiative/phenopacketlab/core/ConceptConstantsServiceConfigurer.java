package org.monarchinitiative.phenopacketlab.core;

import org.monarchinitiative.phenol.annotations.constants.hpo.HpoOnsetTermIds;
import org.monarchinitiative.phenol.annotations.constants.hpo.HpoSubOntologyRootTermIds;
import org.monarchinitiative.phenol.ontology.algo.OntologyAlgorithm;
import org.monarchinitiative.phenol.ontology.data.Ontology;
import org.monarchinitiative.phenol.ontology.data.TermId;
import org.monarchinitiative.phenopacketlab.core.subtree.CreateSubtree;
import org.monarchinitiative.phenopacketlab.core.subtree.SubtreeNode;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConcept;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConceptResource;
import org.monarchinitiative.phenopacketlab.core.model.OntologyConceptResource;
import org.monarchinitiative.phenopacketlab.core.model.Concept;
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
//        List<IdentifiedConcept> genderConstants = configureGenderConstants(resourceService);
        List<Concept> genderConstants = configureGenderConstants();
        List<IdentifiedConcept> allelicStateConstants = configureAllelicStateConstants(resourceService);
        List<IdentifiedConcept> lateralityConstants = configureLateralityConstants(resourceService);
        List<IdentifiedConcept> modifierConstants = configureModifierConstants(resourceService);
        Optional<SubtreeNode> modifierTreeConstants = configureModifierTreeConstants(resourceService);
        List<IdentifiedConcept> severityConstants = configureSeverityConstants(resourceService);
        List<IdentifiedConcept> onsetConstants = configureOnsetConstants(resourceService);
        Optional<SubtreeNode> onsetTreeConstants = configureOnsetTreeConstants(resourceService);
        Optional<SubtreeNode> tnmTumorTreeConstants = configureTnmTumorTreeConstants(resourceService);
        Optional<SubtreeNode> tnmNodeTreeConstants = configureTnmNodeTreeConstants(resourceService);
        Optional<SubtreeNode> tnmMetastasisTreeConstants = configureTnmMetastasisTreeConstants(resourceService);
        Optional<SubtreeNode> diseaseStagesTreeConstants = configureDiseaseStagesTreeConstants(resourceService);
        Optional<SubtreeNode> allelicStateTreeConstants = configureAllelicStateTreeConstants(resourceService);
        List<Concept> structuralTypeConstants = configureStructuralTypes();
        Map<String, List<Concept>> contigConstants = configureContigConstants();

        return new ConceptConstantsServiceImpl(sexConstants,
                genderConstants,
                allelicStateConstants,
                lateralityConstants,
                modifierConstants,
                modifierTreeConstants.orElse(null),
                severityConstants,
                onsetConstants,
                onsetTreeConstants.orElse(null),
                tnmTumorTreeConstants.orElse(null),
                tnmNodeTreeConstants.orElse(null),
                tnmMetastasisTreeConstants.orElse(null),
                diseaseStagesTreeConstants.orElse(null),
                allelicStateTreeConstants.orElse(null),
                structuralTypeConstants,
                contigConstants);
    }

    private static List<IdentifiedConcept> configureSexConstants(ConceptResourceService resourceService) {
        Optional<IdentifiedConceptResource> ncitOptional = resourceService.forPrefix("NCIT");
        if (ncitOptional.isEmpty()) {
            LOGGER.warn("Cannot configure sex constants due to missing NCIT concept resource!");
            return List.of();
        }

        List<IdentifiedConcept> concepts = new ArrayList<>(4);

        concepts.add(IdentifiedConcept.of(TermId.of("NCIT:C17998"), "UNKNOWN_SEX", "Not known, observed, recorded; or reported as unknown by the data contributor.", Arrays.asList("Unknown", "U", "UNKNOWN", "Not Known", "{Unknown}", "UNK", "Unknown/Not Stated")));
        concepts.add(IdentifiedConcept.of(TermId.of("NCIT:C46113"), "FEMALE", "An animal who is observed by researcher or clinician to be female, the sex that ordinarily produces ova.", Arrays.asList("Female", "FEMALE", "Female Phenotype")));
        concepts.add(IdentifiedConcept.of(TermId.of("NCIT:C46112"), "MALE", "An animal who is observed by researcher or clinician to be male, the sex that ordinarily produces sperm.", Arrays.asList("Male", "MALE", "Male Phenotype")));
        concepts.add(IdentifiedConcept.of(TermId.of("NCIT:C45908"), "OTHER", "A person (one of unisexual specimens) who is born with genitalia and/or secondary sexual characteristics of indeterminate sex, or which combine features of both sexes.", Arrays.asList("Intersex", "Intersexed", "UNDIFFERENTIATED")));

        return concepts;
    }

    /**
     * @deprecated
     * Use {@link #configureGenderConstants()} instead which returns LOINC terms.
     * @param resourceService resource
     * @return GSSO terms
     */
    @Deprecated
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

    private static List<Concept> configureGenderConstants() {
        Concept identifiesAsMale = Concept.of("Identifies as male", "LOINC:LA22878-5", List.of());
        Concept identifiesAsFemale = Concept.of("Identifies as female", "LOINC:LA22879-3", List.of());
        Concept femaleToMaleTranssexual = Concept.of("Female-to-male transsexual", "LOINC:LA22880-1", List.of());
        Concept maleToFemaleTranssexual = Concept.of("Male-to-female transsexual", "LOINC:LA22881-9", List.of());
        Concept identifiesAsNonConforming = Concept.of("Identifies as non-conforming", "LOINC:LA22882-7", List.of());
        Concept otherGender = Concept.of("other", "LOINC:LA46-8", List.of());
        Concept askedButUnknown = Concept.of("Asked but unknown", "LOINC:LA20384-6", List.of());
        return List.of(identifiesAsMale, identifiesAsFemale, femaleToMaleTranssexual, maleToFemaleTranssexual,
                identifiesAsNonConforming, otherGender, askedButUnknown);
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

    private static Optional<SubtreeNode> configureTreeConstants(ConceptResourceService resourceService, TermId rootTerm,
                                                                String prefix, List<TermId> excludedNodes) {
        Optional<IdentifiedConceptResource> optional = resourceService.forPrefix(prefix);
        if (optional.isEmpty()) {
            LOGGER.warn("Cannot configure onset tree constants due to missing " + prefix + " concept resource!");
            return Optional.empty();
        }

        IdentifiedConceptResource resource = optional.get();
        if (resource instanceof OntologyConceptResource) {
            Ontology onto = ((OntologyConceptResource) resource).getOntology();
            return CreateSubtree.createSubtree(rootTerm, onto, Comparator.comparing(SubtreeNode::getLabel), excludedNodes);
        } else {
            LOGGER.warn("BUG: " + prefix + " concept resource should implement OntologyConceptResource.");
            return Optional.empty();
        }
    }

    private static Optional<SubtreeNode> configureModifierTreeConstants(ConceptResourceService resourceService) {
        // exclude laterality and severity from modifier nodes
        List<TermId> excludedNodes = new ArrayList<>();
        excludedNodes.add(TermId.of("HP:0012831")); // Laterality
        excludedNodes.add(TermId.of("HP:0012824")); // Severity
        return configureTreeConstants(resourceService, TermId.of("HP:0012823"), "HP", excludedNodes);
    }

    private static Optional<SubtreeNode> configureOnsetTreeConstants(ConceptResourceService resourceService) {
        return configureTreeConstants(resourceService, HpoOnsetTermIds.ONSET, "HP", null);
    }

    private static Optional<SubtreeNode> configureTnmTumorTreeConstants(ConceptResourceService resourceService) {
        return configureTreeConstants(resourceService, TermId.of("NCIT:C48885"), "NCIT", null);
    }

    private static Optional<SubtreeNode> configureTnmNodeTreeConstants(ConceptResourceService resourceService) {
        return configureTreeConstants(resourceService, TermId.of("NCIT:C48884"), "NCIT", null);
    }

    private static Optional<SubtreeNode> configureTnmMetastasisTreeConstants(ConceptResourceService resourceService) {
        return configureTreeConstants(resourceService, TermId.of("NCIT:C48883"), "NCIT", null);
    }

    private static Optional<SubtreeNode> configureDiseaseStagesTreeConstants(ConceptResourceService resourceService) {
        return configureTreeConstants(resourceService, TermId.of("NCIT:C28108"), "NCIT", null);
    }

    private static Optional<SubtreeNode> configureAllelicStateTreeConstants(ConceptResourceService resourceService) {
        return configureTreeConstants(resourceService, TermId.of("GENO:0000875"), "GENO", null);
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
