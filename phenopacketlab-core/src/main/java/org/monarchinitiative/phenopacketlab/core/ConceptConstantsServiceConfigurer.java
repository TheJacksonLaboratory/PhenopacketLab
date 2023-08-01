package org.monarchinitiative.phenopacketlab.core;

import org.monarchinitiative.phenol.annotations.constants.hpo.HpoOnsetTermIds;
import org.monarchinitiative.phenol.annotations.constants.hpo.HpoSubOntologyRootTermIds;
import org.monarchinitiative.phenol.ontology.data.TermId;
import org.monarchinitiative.phenopacketlab.core.model.OntologyConceptResource;
import org.monarchinitiative.phenopacketlab.core.subtree.CreateSubtree;
import org.monarchinitiative.phenopacketlab.core.subtree.SubtreeNode;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConcept;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConceptResource;
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
    private static final TermId BODY_REGION = TermId.of("NCIT:C12680");
    private static final TermId DISEASE_STAGE_QUALIFIER = TermId.of("NCIT:C28108");
    private static final TermId ROUTE_OF_ADMINISTRATION = TermId.of("NCIT:C38114");
    private static final TermId ADVERSE_EVENT = TermId.of("NCIT:C41331");
    private static final TermId GENERIC_DISTANT_METASTASIS_TNM_FINDING = TermId.of("NCIT:C48883");
    private static final TermId GENERIC_REGIONAL_LYMPH_NODES_TNM_FINDING = TermId.of("NCIT:C48884");
    private static final TermId GENERIC_PRIMARY_TUMOR_TNM_FINDING = TermId.of("NCIT:C48885");
    private static final TermId SCHEDULE_FREQUENCY = TermId.of("NCIT:C64493");
    private static final TermId ALLELIC_STATE = TermId.of("GENO:0000875");
    private static final TermId UNIT = TermId.of("UO:0000000");

    private ConceptConstantsServiceConfigurer() {
    }

    public static ConceptConstantsService configure(ConceptResourceService resourceService,
                                                    OntologyHierarchyServiceRegistry hierarchyServiceRegistry) {
        List<IdentifiedConcept> sexConstants = configureSexConstants(resourceService);
//        List<IdentifiedConcept> genderConstants = configureGenderConstants(resourceService);
        List<Concept> genderConstants = configureGenderConstants();
        List<IdentifiedConcept> allelicStateConstants = configureAllelicStateConstants(resourceService);
        List<IdentifiedConcept> lateralityConstants = configureLateralityConstants(resourceService);
        List<IdentifiedConcept> modifierConstants = configureModifierConstants(resourceService);
        Optional<SubtreeNode> modifierTreeConstants = configureModifierTreeConstants(resourceService, hierarchyServiceRegistry);
        List<IdentifiedConcept> evidenceConstants = configureEvidenceConstants(resourceService);
        Optional<SubtreeNode> evidenceTreeConstants = configureEvidenceTreeConstants(resourceService, hierarchyServiceRegistry);
        List<IdentifiedConcept> severityConstants = configureSeverityConstants(resourceService);
        List<IdentifiedConcept> onsetConstants = configureOnsetConstants(resourceService);
        Optional<SubtreeNode> onsetTreeConstants = configureOnsetTreeConstants(resourceService, hierarchyServiceRegistry);
        Optional<SubtreeNode> tnmTumorTreeConstants = configureTnmTumorTreeConstants(resourceService, hierarchyServiceRegistry);
        Optional<SubtreeNode> tnmNodeTreeConstants = configureTnmNodeTreeConstants(resourceService, hierarchyServiceRegistry);
        Optional<SubtreeNode> tnmMetastasisTreeConstants = configureTnmMetastasisTreeConstants(resourceService, hierarchyServiceRegistry);
        Optional<SubtreeNode> diseaseStagesTreeConstants = configureDiseaseStagesTreeConstants(resourceService, hierarchyServiceRegistry);
        Optional<SubtreeNode> allelicStateTreeConstants = configureAllelicStateTreeConstants(resourceService, hierarchyServiceRegistry);
        List<IdentifiedConcept> structuralTypeConstants = configureStructuralTypeConstants(resourceService);
        Optional<SubtreeNode> structuralTypeTreeConstants = configureStructuralTypeTreeConstants(resourceService, hierarchyServiceRegistry);
        Map<String, List<Concept>> contigConstants = configureContigConstants();
        Optional<SubtreeNode> routeOfAdministrationTreeConstants = configureRouteOfAdministrationTreeConstants(resourceService, hierarchyServiceRegistry);
        Optional<SubtreeNode> scheduleFrequencyTreeConstants = configureScheduleFrequencyTreeConstants(resourceService, hierarchyServiceRegistry);
        Optional<SubtreeNode> adverseEventTreeConstants = configureAdverseEventTreeConstants(resourceService, hierarchyServiceRegistry);
        Optional<SubtreeNode> bodySiteTreeConstants = configureBodySiteTreeConstants(resourceService, hierarchyServiceRegistry);
        Optional<SubtreeNode> unitTreeConstants = configureUnitTreeConstants(resourceService, hierarchyServiceRegistry);

        return new ConceptConstantsServiceImpl(sexConstants,
                genderConstants,
                allelicStateConstants,
                lateralityConstants,
                modifierConstants,
                modifierTreeConstants.orElse(null),
                evidenceConstants,
                evidenceTreeConstants.orElse(null),
                severityConstants,
                onsetConstants,
                onsetTreeConstants.orElse(null),
                tnmTumorTreeConstants.orElse(null),
                tnmNodeTreeConstants.orElse(null),
                tnmMetastasisTreeConstants.orElse(null),
                diseaseStagesTreeConstants.orElse(null),
                allelicStateTreeConstants.orElse(null),
                structuralTypeConstants,
                structuralTypeTreeConstants.orElse(null),
                routeOfAdministrationTreeConstants.orElse(null),
                scheduleFrequencyTreeConstants.orElse(null),
                adverseEventTreeConstants.orElse(null),
                bodySiteTreeConstants.orElse(null),
                unitTreeConstants.orElse(null),
                contigConstants);
    }

    private static List<IdentifiedConcept> configureSexConstants(ConceptResourceService resourceService) {
        Optional<IdentifiedConceptResource> ncitOptional = resourceService.forPrefix("NCIT");
        if (ncitOptional.isEmpty()) {
            LOGGER.warn("Cannot configure sex constants due to missing NCIT concept resource!");
            return List.of();
        }

        List<IdentifiedConcept> concepts = new ArrayList<>(4);

        concepts.add(IdentifiedConcept.of(TermId.of("NCIT:C17998"), "UNKNOWN_SEX", "Not assessed or not available. Maps to NCIT:C17998", Arrays.asList("Unknown", "U", "UNKNOWN", "Not Known", "{Unknown}", "UNK", "Unknown/Not Stated")));
        concepts.add(IdentifiedConcept.of(TermId.of("NCIT:C46113"), "FEMALE", "Female sex. Maps to NCIT:C46113", Arrays.asList("Female", "FEMALE", "Female Phenotype")));
        concepts.add(IdentifiedConcept.of(TermId.of("NCIT:C46112"), "MALE", "Male sex. Maps to NCIT:C46112", Arrays.asList("Male", "MALE", "Male Phenotype")));
        concepts.add(IdentifiedConcept.of(TermId.of("NCIT:C45908"), "OTHER", "It is not possible to accurately assess the applicability of MALE/FEMALE. Maps to NCIT:C45908", Arrays.asList("Intersex", "Intersexed", "UNDIFFERENTIATED")));

        return concepts;
    }

    /**
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

        return List.copyOf(concepts);
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

        return List.copyOf(concepts);
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

        return List.copyOf(concepts);
    }

    private static List<IdentifiedConcept> configureConstants(ConceptResourceService resourceService, String prefix, TermId term) {
        Optional<IdentifiedConceptResource> optional = resourceService.forPrefix(prefix);
        if (optional.isEmpty()) {
            LOGGER.warn("Cannot configure " + term.getId() + "  constants due to missing " + prefix + " concept resource!");
            return List.of();
        }
        IdentifiedConceptResource resource = optional.get();
        if (resource instanceof OntologyConceptResource ocr) {
            return ocr.ontology().graph().getChildrenStream(term, false)
                    .map(resource::conceptForTermId)
                    .flatMap(Optional::stream)
                    .collect(Collectors.toList());
        } else {
            LOGGER.warn("BUG: " + prefix + " concept resource should implement OntologyConceptResource.");
            return List.of();
        }
    }

    private static List<IdentifiedConcept> configureStructuralTypeConstants(ConceptResourceService resourceService) {
        return configureConstants(resourceService, "SO", TermId.of("SO:0001537"));
    }

    private static List<IdentifiedConcept> configureModifierConstants(ConceptResourceService resourceService) {
        return configureConstants(resourceService, "HP", HpoSubOntologyRootTermIds.CLINICAL_MODIFIER);
    }

    private static List<IdentifiedConcept> configureEvidenceConstants(ConceptResourceService resourceService) {
        Optional<IdentifiedConceptResource> ecoOptional = resourceService.forPrefix("ECO");
        if (ecoOptional.isEmpty()) {
            LOGGER.warn("Cannot configure evidence constants due to missing ECO concept resource!");
            return List.of();
        }
        IdentifiedConceptResource eco = ecoOptional.get();
        List<IdentifiedConcept> concepts = new ArrayList<>(5);
        retrieveIdentifiedConcept(eco, "ECO:0006016", concepts, "Missing ECO:0006016");
        retrieveIdentifiedConcept(eco, "ECO:0007339", concepts, "Missing ECO:0007339");
        retrieveIdentifiedConcept(eco, "ECO:0006017", concepts, "Missing ECO:0006017");
        retrieveIdentifiedConcept(eco, "ECO:0000033", concepts, "Missing ECO:0000033");
        retrieveIdentifiedConcept(eco, "ECO:0006154", concepts, "Missing ECO:0006154");

        return List.copyOf(concepts);
    }

    private static List<IdentifiedConcept> configureOnsetConstants(ConceptResourceService resourceService) {
        return configureConstants(resourceService, "HP", HpoOnsetTermIds.ONSET);
    }

    private static Optional<SubtreeNode> configureTreeConstants(ConceptResourceService resourceService,
                                                                OntologyHierarchyServiceRegistry hierarchyServiceRegistry,
                                                                TermId rootTerm,
                                                                String prefix,
                                                                List<TermId> excludedNodes,
                                                                boolean selectable) {
        Optional<IdentifiedConceptResource> optional = resourceService.forPrefix(prefix);
        if (optional.isEmpty()) {
            LOGGER.warn("Cannot configure onset tree constants due to missing " + prefix + " concept resource!");
            return Optional.empty();
        }

        Optional<OntologyHierarchyService> hierarchyService = hierarchyServiceRegistry.forPrefix(prefix);
        if (hierarchyService.isEmpty()) {
            LOGGER.warn("Cannot configure onset tree constants due to missing " + prefix + " ontology hierarchy service!");
            return Optional.empty();
        }

        return CreateSubtree.createSubtree(rootTerm,
                optional.get(),
                hierarchyService.get(),
                Comparator.comparing(SubtreeNode::getLabel),
                excludedNodes,
                selectable);
    }

    private static Optional<SubtreeNode> configureStructuralTypeTreeConstants(ConceptResourceService resourceService,
                                                                              OntologyHierarchyServiceRegistry hierarchyServiceRegistry) {
        return configureTreeConstants(resourceService, hierarchyServiceRegistry, TermId.of("SO:0001537"), "SO", null, true);
    }

    private static Optional<SubtreeNode> configureModifierTreeConstants(ConceptResourceService resourceService,
                                                                        OntologyHierarchyServiceRegistry hierarchyServiceRegistry) {
        // exclude laterality and severity from modifier nodes
        List<TermId> excludedNodes = new ArrayList<>();
        // laterality is present in modifier as shown in example in paper : https://onlinelibrary.wiley.com/doi/10.1002/ggn2.202200016#ggn2202200016-bib-0008
//        excludedNodes.add(TermId.of("HP:0012831")); // Laterality
        excludedNodes.add(TermId.of("HP:0012824")); // Severity
        return configureTreeConstants(resourceService, hierarchyServiceRegistry, TermId.of("HP:0012823"), "HP", excludedNodes, false);
    }

    private static Optional<SubtreeNode> configureEvidenceTreeConstants(ConceptResourceService resourceService,
                                                                        OntologyHierarchyServiceRegistry hierarchyServiceRegistry) {
        return configureTreeConstants(resourceService, hierarchyServiceRegistry, TermId.of("ECO:0000000"), "ECO", null, false);
    }

    private static Optional<SubtreeNode> configureOnsetTreeConstants(ConceptResourceService resourceService,
                                                                     OntologyHierarchyServiceRegistry hierarchyServiceRegistry) {
        return configureTreeConstants(resourceService, hierarchyServiceRegistry,
                HpoOnsetTermIds.ONSET, HpoOnsetTermIds.ONSET.getPrefix(), null, true);
    }

    private static Optional<SubtreeNode> configureTnmTumorTreeConstants(ConceptResourceService resourceService,
                                                                        OntologyHierarchyServiceRegistry hierarchyServiceRegistry) {
        return configureTreeConstants(resourceService, hierarchyServiceRegistry,
                GENERIC_PRIMARY_TUMOR_TNM_FINDING, GENERIC_PRIMARY_TUMOR_TNM_FINDING.getPrefix(), null, true);
    }

    private static Optional<SubtreeNode> configureTnmNodeTreeConstants(ConceptResourceService resourceService,
                                                                       OntologyHierarchyServiceRegistry hierarchyServiceRegistry) {
        return configureTreeConstants(resourceService, hierarchyServiceRegistry,
                GENERIC_REGIONAL_LYMPH_NODES_TNM_FINDING, GENERIC_REGIONAL_LYMPH_NODES_TNM_FINDING.getPrefix(), null, true);
    }

    private static Optional<SubtreeNode> configureTnmMetastasisTreeConstants(ConceptResourceService resourceService,
                                                                             OntologyHierarchyServiceRegistry hierarchyServiceRegistry) {
        return configureTreeConstants(resourceService, hierarchyServiceRegistry,
                GENERIC_DISTANT_METASTASIS_TNM_FINDING, GENERIC_DISTANT_METASTASIS_TNM_FINDING.getPrefix(), null, true);
    }

    private static Optional<SubtreeNode> configureDiseaseStagesTreeConstants(ConceptResourceService resourceService,
                                                                             OntologyHierarchyServiceRegistry hierarchyServiceRegistry) {
        return configureTreeConstants(resourceService, hierarchyServiceRegistry,
                DISEASE_STAGE_QUALIFIER, DISEASE_STAGE_QUALIFIER.getPrefix(), null, true);
    }

    private static Optional<SubtreeNode> configureAllelicStateTreeConstants(ConceptResourceService resourceService,
                                                                            OntologyHierarchyServiceRegistry hierarchyServiceRegistry) {
        return configureTreeConstants(resourceService, hierarchyServiceRegistry,
                ALLELIC_STATE, ALLELIC_STATE.getPrefix(), null, true);
    }

    private static Optional<SubtreeNode> configureRouteOfAdministrationTreeConstants(ConceptResourceService resourceService,
                                                                     OntologyHierarchyServiceRegistry hierarchyServiceRegistry) {
        return configureTreeConstants(resourceService, hierarchyServiceRegistry,
                ROUTE_OF_ADMINISTRATION, ROUTE_OF_ADMINISTRATION.getPrefix(), null, true);
    }

    private static Optional<SubtreeNode> configureScheduleFrequencyTreeConstants(ConceptResourceService resourceService,
                                                                                 OntologyHierarchyServiceRegistry hierarchyServiceRegistry) {
        return configureTreeConstants(resourceService, hierarchyServiceRegistry,
                SCHEDULE_FREQUENCY, SCHEDULE_FREQUENCY.getPrefix(), null, true);
    }

    private static Optional<SubtreeNode> configureAdverseEventTreeConstants(ConceptResourceService resourceService,
                                                                                 OntologyHierarchyServiceRegistry hierarchyServiceRegistry) {
        return configureTreeConstants(resourceService, hierarchyServiceRegistry,
                ADVERSE_EVENT, ADVERSE_EVENT.getPrefix(), null, false);
    }

    private static Optional<SubtreeNode> configureBodySiteTreeConstants(ConceptResourceService resourceService,
                                                                            OntologyHierarchyServiceRegistry hierarchyServiceRegistry) {
        return configureTreeConstants(resourceService, hierarchyServiceRegistry,
                BODY_REGION, BODY_REGION.getPrefix(), null, true);
    }

    private static Optional<SubtreeNode> configureUnitTreeConstants(ConceptResourceService resourceService,
                                                                        OntologyHierarchyServiceRegistry hierarchyServiceRegistry) {
        return configureTreeConstants(resourceService, hierarchyServiceRegistry, UNIT, UNIT.getPrefix(), null, true);
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

        return List.copyOf(concepts);
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
