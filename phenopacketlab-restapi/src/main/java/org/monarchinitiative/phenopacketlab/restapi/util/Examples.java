package org.monarchinitiative.phenopacketlab.restapi.util;

import com.google.protobuf.Timestamp;
import com.google.protobuf.util.JsonFormat;
import org.ga4gh.vrsatile.v1.VariationDescriptor;
import org.ga4gh.vrsatile.v1.VcfRecord;
import org.phenopackets.schema.v2.Cohort;
import org.phenopackets.schema.v2.Family;
import org.phenopackets.schema.v2.Phenopacket;
import org.phenopackets.schema.v2.core.*;

import java.io.*;
import java.time.Instant;

public class Examples {

    private static final JsonFormat.Parser PARSER = JsonFormat.parser();

    private Examples() {
    }

    public static class Phenopackets {

        private Phenopackets() {
        }

        private static final String BASEDIR = "/examples/phenopackets";

        private static final Phenopacket AML = readPhenopacket("acute-myeloid-leukemia.json");
        private static final Phenopacket BETHLEM_MYOPATHY = readPhenopacket("bethlem-myopathy.json");
        private static final Phenopacket COVID = readPhenopacket("covid.json");
        private static final Phenopacket MARFAN = readPhenopacket("marfan.json");
        private static final Phenopacket SQUAMOUS_CELL_ESOPHAGEAL_CARCINOMA = readPhenopacket("squamous-cell-esophageal-carcinoma.json");
        private static final Phenopacket THROMBOCYTOPENIA2 = readPhenopacket("thrombocytopenia2.json");
        private static final Phenopacket UROTHELIAL_CANCER = readPhenopacket("urothelial-cancer.json");

        private static Phenopacket readPhenopacket(String name) {
            try (Reader is = new BufferedReader(new InputStreamReader(Examples.class.getResourceAsStream(BASEDIR + "/" + name)))) {
                Phenopacket.Builder builder = Phenopacket.newBuilder();
                PARSER.merge(is, builder);
                return builder.build();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        public static Phenopacket acuteMyeloidLeukemia() {
            return AML;
        }

        public static Phenopacket bethlemMyopathy() {
            return BETHLEM_MYOPATHY;
        }

        public static Phenopacket covid() {
            return COVID;
        }

        public static Phenopacket marfan() {
            return MARFAN;
        }

        public static Phenopacket squamousCellEsophagealCarcinoma() {
            return SQUAMOUS_CELL_ESOPHAGEAL_CARCINOMA;
        }

        public static Phenopacket thrombocytopenia2() {
            return THROMBOCYTOPENIA2;
        }

        public static Phenopacket urothelialCancer() {
            return UROTHELIAL_CANCER;
        }
    }

    public static class Families {
        private static final Instant CREATED = Instant.parse("2019-07-21T00:25:54.662Z");
        private Families() {
        }

        public static Family toyLeighSyndromeTrio() {
            return Family.newBuilder()
                    .setId("toy-leigh-syndrome-trio")
                    .setProband(Phenopacket.newBuilder()
                            .setId("II:1")
                            .setSubject(Individual.newBuilder()
                                    .setId("Patient 1")
                                    .addAlternateIds("SYN:3554")
                                    .setTimeAtLastEncounter(isoAge("P1M2D"))
                                    .setVitalStatus(VitalStatus.newBuilder()
                                            .setStatus(VitalStatus.Status.DECEASED)
                                            .setCauseOfDeath(ontologyClass("OMIM:256000", "LEIGH SYNDROME; LS"))
                                            .setTimeOfDeath(isoAge("P1Y"))
                                            .build())
                                    .setSex(Sex.MALE)
                                    .setKaryotypicSex(KaryotypicSex.XY)
                                    .setTaxonomy(ontologyClass("NCBITaxon:9606", "Homo sapiens"))
                                    .build())
                            .addPhenotypicFeatures(PhenotypicFeature.newBuilder()
                                    .setType(ontologyClass("HP:0002490", "Increased CSF lactate"))
                                    .setExcluded(false)
                                    .setSeverity(ontologyClass("HP:0012828", "Severe"))
                                    .addModifiers(ontologyClass("HP:0031915", "Stable"))
                                    .setOnset(isoAge("P2D"))
                                    .addEvidence(Evidence.newBuilder().setEvidenceCode(ontologyClass("ECO:0000269", "experimental evidence used in manual assertion")).build())
                                    .build())
                            .addPhenotypicFeatures(PhenotypicFeature.newBuilder()
                                    .setType(ontologyClass("HP:0002151", "Increased serum lactate"))
                                    .setExcluded(true)
                                    .setOnset(isoAge("P2D")) // TODO(ielis) is this logical?
                                    .build())
                            .addMeasurements(Measurement.newBuilder()
                                    .setDescription("Platelet count measurement")
                                    .setAssay(ontologyClass("LOINC:26515-7", "Platelets [#/volume] in Blood"))
                                    .setValue(Value.newBuilder()
                                            .setQuantity(Quantity.newBuilder()
                                                    .setUnit(ontologyClass("UO:0000316", "cells per microliter"))
                                                    .setValue(2.4E4)
                                                    .setReferenceRange(ReferenceRange.newBuilder()
                                                            .setUnit(ontologyClass("UO:0000316", "cells per microliter"))
                                                            .setLow(15.E4)
                                                            .setHigh(45.E4)
                                                            .build())
                                                    .build())
                                            .build())
                                    .setTimeObserved(isoAge("P3D"))
                                    .setProcedure(Procedure.newBuilder()
                                            .setCode(ontologyClass("NCIT:C17610", "Blood Sample"))
                                            .setBodySite(ontologyClass("UBERON:0015875", "heel"))
                                            .setPerformed(isoAge("P3D"))
                                            .build())
                                    .build())
                            .addMeasurements(Measurement.newBuilder()
                                    .setDescription("Cytochrome C oxidase activity in skeletal muscle")
                                    .setAssay(ontologyClass("LOINC:18366-5", "Cytochrome C oxidase [Enzymatic activity/mass] in Tissue"))
                                    .setValue(Value.newBuilder()
                                            .setQuantity(Quantity.newBuilder()
                                                    .setUnit(ontologyClass("UO:0000181", "enzyme unit")) // TODO - this may be wrong
                                                    .setValue(.123E-2) // the value was made up
                                                    .build())
                                            .build())
                                    .setTimeObserved(isoAge("P11M"))
                                    .setProcedure(Procedure.newBuilder()
                                            .setCode(ontologyClass("NCIT:C28743", "Punch Biopsy"))
                                            .setBodySite(ontologyClass("UBERON:0001134", "skeletal muscle tissue"))
                                            .setPerformed(isoAge("P11M"))
                                            .build())
                                    .build())
                            .addInterpretations(Interpretation.newBuilder()
                                    .setId("case-interpretation-id")
                                    .setProgressStatus(Interpretation.ProgressStatus.SOLVED)
                                    .setDiagnosis(Diagnosis.newBuilder()
                                            .setDisease(ontologyClass("OMIM:256000", "LEIGH SYNDROME; LS"))
                                            .addGenomicInterpretations(GenomicInterpretation.newBuilder()
                                                    .setSubjectOrBiosampleId("I:1")
                                                    .setInterpretationStatus(GenomicInterpretation.InterpretationStatus.CONTRIBUTORY)
                                                    .setVariantInterpretation(VariantInterpretation.newBuilder()
                                                            .setAcmgPathogenicityClassification(AcmgPathogenicityClassification.PATHOGENIC)
                                                            .setVariationDescriptor(VariationDescriptor.newBuilder()
                                                                    .setId("NM_003172.3:c.845_846del")
                                                                    .setVcfRecord(VcfRecord.newBuilder()
                                                                            .setGenomeAssembly("GRCH38.p13")
                                                                            .setChrom("9")
                                                                            .setPos(133351969)
                                                                            .setId("NM_003172.3:c.845_846del")
                                                                            .setRef("CAG")
                                                                            .setAlt("C")
                                                                            .setQual("100")
                                                                            .setFilter("PASS")
                                                                            .build())
                                                                    .setAllelicState(ontologyClass("GENO:0000135", "heterozygous"))
                                                                    .build())
                                                            .build())
                                                    .build())
                                            .addGenomicInterpretations(GenomicInterpretation.newBuilder()
                                                    .setSubjectOrBiosampleId("I:1")
                                                    .setInterpretationStatus(GenomicInterpretation.InterpretationStatus.CONTRIBUTORY)
                                                    .setVariantInterpretation(VariantInterpretation.newBuilder()
                                                            .setAcmgPathogenicityClassification(AcmgPathogenicityClassification.PATHOGENIC)
                                                            .setVariationDescriptor(VariationDescriptor.newBuilder()
                                                                    .setId("NM_003172.3:c.823_833+7del")
                                                                    .setVcfRecord(VcfRecord.newBuilder()
                                                                            .setGenomeAssembly("GRCH38.p13")
                                                                            .setChrom("9")
                                                                            .setPos(133352053)
                                                                            .setId("NM_003172.3:c.823_833+7del")
                                                                            .setRef("GGACTCACCAGGTCACGAT")
                                                                            .setAlt("C")
                                                                            .setQual("100")
                                                                            .setFilter("PASS")
                                                                            .build())
                                                                    .setAllelicState(ontologyClass("GENO:0000135", "heterozygous"))
                                                                    .build())
                                                            .build())
                                                    .build())
                                            .build())
                                    .build())
                            .addDiseases(Disease.newBuilder()
                                    .setTerm(ontologyClass("OMIM:256000", "LEIGH SYNDROME; LS"))
                                    .setExcluded(false)
                                    .setOnset(isoAge("P6M"))
                                    .build())
                            .build())
                    // TODO(ielis) - is there a way to indicate the carrier status for the parents?
                    .addRelatives(Phenopacket.newBuilder() // father
                            .setId("I:1")
                            .setSubject(Individual.newBuilder()
                                    .setId("I:1")
                                    .setVitalStatus(VitalStatus.newBuilder()
                                            .setStatus(VitalStatus.Status.ALIVE)
                                            .build())
                                    .setSex(Sex.MALE)
                                    .setKaryotypicSex(KaryotypicSex.XY)
                                    .setTaxonomy(ontologyClass("NCBITaxon:9606", "Homo sapiens"))
                                    .build())
                            .build())
                    .addRelatives(Phenopacket.newBuilder() // mother
                            .setId("I:2")
                            .setSubject(Individual.newBuilder()
                                    .setId("I:2")
                                    .setVitalStatus(VitalStatus.newBuilder()
                                            .setStatus(VitalStatus.Status.ALIVE)
                                            .build())
                                    .setSex(Sex.FEMALE)
                                    .setKaryotypicSex(KaryotypicSex.XX)
                                    .setTaxonomy(ontologyClass("NCBITaxon:9606", "Homo sapiens"))
                                    .build())
                            .build())
                    .setPedigree(Pedigree.newBuilder()
                            .addPersons(Pedigree.Person.newBuilder() // father
                                    .setFamilyId("Family1")
                                    .setIndividualId("I:1")
                                    .setPaternalId("")
                                    .setMaternalId("")
                                    .setSex(Sex.MALE)
                                    .setAffectedStatus(Pedigree.Person.AffectedStatus.UNAFFECTED)
                                    .build())
                            .addPersons(Pedigree.Person.newBuilder() // mother
                                    .setFamilyId("Family1")
                                    .setIndividualId("I:2")
                                    .setPaternalId("")
                                    .setMaternalId("")
                                    .setSex(Sex.FEMALE)
                                    .setAffectedStatus(Pedigree.Person.AffectedStatus.UNAFFECTED)
                                    .build())
                            .addPersons(Pedigree.Person.newBuilder() // proband
                                    .setFamilyId("Family1")
                                    .setIndividualId("II:1")
                                    .setPaternalId("I:1")
                                    .setMaternalId("I:2")
                                    .setSex(Sex.MALE)
                                    .setAffectedStatus(Pedigree.Person.AffectedStatus.AFFECTED)
                                    .build())
                            .build())
                    .setMetaData(MetaData.newBuilder()
                            .setCreated(Timestamp.newBuilder()
                                    .setSeconds(CREATED.getEpochSecond())
                                    .setNanos(CREATED.getNano())
                                    .build())
                            .setCreatedBy("Daniel D.")
                            .addResources(Resource.newBuilder()
                                    .setId("hp")
                                    .setName("human phenotype ontology")
                                    .setNamespacePrefix("HP")
                                    .setUrl("http://purl.obolibrary.org/obo/hp.owl")
                                    .setVersion("2022-02-14")
                                    .setIriPrefix("http://purl.obolibrary.org/obo/HP_")
                                    .build())
                            .addResources(Resource.newBuilder()
                                    .setId("ncbitaxon")
                                    .setName("NCBI organismal classification")
                                    .setNamespacePrefix("NCBITaxon")
                                    .setUrl("http://purl.obolibrary.org/obo/ncbitaxon.owl")
                                    .setVersion("2022-02-14")
                                    .setIriPrefix("http://purl.obolibrary.org/obo/NCBITaxon_")
                                    .build())
                            .addResources(Resource.newBuilder()
                                    .setId("ncit")
                                    .setName("NCI Thesaurus")
                                    .setNamespacePrefix("NCIT")
                                    .setUrl("http://purl.obolibrary.org/obo/ncit.owl")
                                    .setVersion("2022-02-14")
                                    .setIriPrefix("http://purl.obolibrary.org/obo/NCIT_")
                                    .build())
                            .addResources(Resource.newBuilder()
                                    .setId("omim")
                                    .setName("Online Mendelian Inheritance in Man")
                                    .setNamespacePrefix("OMIM")
                                    .setUrl("https://www.omim.org")
                                    .setVersion("2021-11-18")
                                    .setIriPrefix("https://www.omim.org/entry/")
                                    .build())
                            .addResources(Resource.newBuilder()
                                    .setId("loinc")
                                    .setName("Logical Observation Identifiers Names and Codes")
                                    .setNamespacePrefix("LOINC")
                                    .setUrl("https://loinc.org")
                                    .setVersion("2022-02-14")
                                    .setIriPrefix("https://loinc.org/")
                                    .build())
                            .addResources(Resource.newBuilder()
                                    .setId("uberon")
                                    .setName("Uber-anatomy ontology")
                                    .setNamespacePrefix("UBERON")
                                    .setUrl("http://purl.obolibrary.org/obo/uberon.owl")
                                    .setVersion("2022-02-14")
                                    .setIriPrefix("http://purl.obolibrary.org/obo/UBERON_")
                                    .build())
                            .addResources(Resource.newBuilder()
                                    .setId("uo")
                                    .setName("Units of measurement ontology")
                                    .setNamespacePrefix("UO")
                                    .setUrl("http://purl.obolibrary.org/obo/uo.owl")
                                    .setVersion("2022-02-14")
                                    .setIriPrefix("http://purl.obolibrary.org/obo/UO_")
                                    .build())
                            .setPhenopacketSchemaVersion("2.0.0")
                            .addExternalReferences(ExternalReference.newBuilder()
                                    .setId("PMID:29715184")
                                    .setDescription("Mutations in SURF1 are important genetic causes of Leigh syndrome in Slovak patients.")
                                    .setReference("https://pubmed.ncbi.nlm.nih.gov/29715184")
                                    .build())
                            .build())
                    .build();
        }

    }

    private static TimeElement isoAge(String iso8601Duration) {
        return TimeElement.newBuilder().setAge(Age.newBuilder().setIso8601Duration(iso8601Duration).build()).build();
    }

    private static OntologyClass ontologyClass(String id, String label) {
        return OntologyClass.newBuilder().setId(id).setLabel(label).build();
    }

    public static class Cohorts {
        private Cohorts() {
        }

        public static Cohort abc() {
            // TODO - improve
            return Cohort.newBuilder()
                    .setId("cohort")
                    .build();
        }
    }
}
