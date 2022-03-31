import { Age, AgeRange, Evidence, GestationalAge, OntologyClass, TimeElement, TimeInterval } from "src/app/models/base";
import { Family } from "src/app/models/family";
import { Individual, KaryotypicSex, Sex } from "src/app/models/individual";
import { Phenopacket } from "src/app/models/phenopacket";
import { PhenotypicFeature } from "src/app/models/phenotypic-feature";

export class FamilyData {
    FAMILY_DATA: Family;

    constructor() {
        

        let phenotypicFeature0 = new PhenotypicFeature();
        phenotypicFeature0.description = 'Any anomaly of a cranial suture, that is one of the six membrane-covered openings in the incompletely ossified skull of the fetus or newborn infant.';
        phenotypicFeature0.type = new OntologyClass('HP:0011329', 'Abnormality of cranial sutures');
        phenotypicFeature0.onset = new TimeElement(new GestationalAge(2, 3), new Age('10'), new AgeRange(new Age('2'), new Age('4')), new OntologyClass('', ''), '', new TimeInterval('', ''));
        phenotypicFeature0.evidence = new Evidence(new OntologyClass('', ''), new OntologyClass('', ''), new TimeElement(new GestationalAge(2, 3), new Age('10'), new AgeRange(new Age('2'), new Age('4')), new OntologyClass('', ''), '', new TimeInterval('', '')));
        phenotypicFeature0.excluded = true;
        phenotypicFeature0.resolution = new TimeElement(new GestationalAge(2, 3), new Age('10'), new AgeRange(new Age('2'), new Age('4')), new OntologyClass('', ''), '', new TimeInterval('', ''));
        phenotypicFeature0.severity = new OntologyClass('', '');
        phenotypicFeature0.modifiers = new OntologyClass('', '');
        
        let phenotypicFeature3 = new PhenotypicFeature();
        phenotypicFeature3.description = 'An increased density in the cranial sutures following obliteration.';
        phenotypicFeature3.type = new OntologyClass('HP:0005441', 'Sclerotic cranial sutures');
        phenotypicFeature3.onset = new TimeElement(new GestationalAge(2, 3), new Age('10'), new AgeRange(new Age('2'), new Age('4')), new OntologyClass('', ''), '', new TimeInterval('', ''));
        phenotypicFeature3.evidence = new Evidence(new OntologyClass('', ''), new OntologyClass('', ''), new TimeElement(new GestationalAge(2, 3), new Age('10'), new AgeRange(new Age('2'), new Age('4')), new OntologyClass('', ''), '', new TimeInterval('', '')));
        phenotypicFeature3.excluded = false;
        phenotypicFeature3.resolution = new TimeElement(new GestationalAge(2, 3), new Age('10'), new AgeRange(new Age('2'), new Age('4')), new OntologyClass('', ''), '', new TimeInterval('', ''));
        phenotypicFeature3.severity = new OntologyClass('', '');
        phenotypicFeature3.modifiers = new OntologyClass('', '');

        let phenotypicFeature4 = new PhenotypicFeature();
        phenotypicFeature4.description = 'An overlap of the bony plates of the skull in an infant, with or without early closure.';
        phenotypicFeature4.type = new OntologyClass('HP:0010823', 'Ridged cranial sutures');
        phenotypicFeature4.onset = new TimeElement(new GestationalAge(2, 3), new Age('10'), new AgeRange(new Age('2'), new Age('4')), new OntologyClass('', ''), '', new TimeInterval('', ''));
        phenotypicFeature4.evidence = new Evidence(new OntologyClass('', ''), new OntologyClass('', ''), new TimeElement(new GestationalAge(2, 3), new Age('10'), new AgeRange(new Age('2'), new Age('4')), new OntologyClass('', ''), '', new TimeInterval('', '')));
        phenotypicFeature4.excluded = false;
        phenotypicFeature4.resolution = new TimeElement(new GestationalAge(2, 3), new Age('10'), new AgeRange(new Age('2'), new Age('4')), new OntologyClass('', ''), '', new TimeInterval('', ''));
        phenotypicFeature4.severity = new OntologyClass('', '');
        phenotypicFeature4.modifiers = new OntologyClass('', '');

        let phenotypicFeature2 = new PhenotypicFeature();
        phenotypicFeature2.description = 'An abnormally increased width of the cranial sutures for age-related norms (generally resulting from delayed closure).';
        phenotypicFeature2.type = new OntologyClass('HP:0010537 ', 'Wide cranial sutures');
        phenotypicFeature2.onset = new TimeElement(new GestationalAge(2, 3), new Age('10'), new AgeRange(new Age('2'), new Age('4')), new OntologyClass('', ''), '', new TimeInterval('', ''));
        phenotypicFeature2.evidence = new Evidence(new OntologyClass('', ''), new OntologyClass('', ''), new TimeElement(new GestationalAge(2, 3), new Age('10'), new AgeRange(new Age('2'), new Age('4')), new OntologyClass('', ''), '', new TimeInterval('', '')));
        phenotypicFeature2.excluded = false;
        phenotypicFeature2.resolution = new TimeElement(new GestationalAge(2, 3), new Age('10'), new AgeRange(new Age('2'), new Age('4')), new OntologyClass('', ''), '', new TimeInterval('', ''));
        phenotypicFeature2.severity = new OntologyClass('', '');
        phenotypicFeature2.modifiers = new OntologyClass('', '');

        let phenopacket1 = new Phenopacket();
        phenopacket1.id = "patient:1";
        phenopacket1.phenotypicFeatures = [];
        phenopacket1.phenotypicFeatures.push(phenotypicFeature2);
        phenopacket1.phenotypicFeatures.push(phenotypicFeature3);
        phenopacket1.subject = new Individual();
        phenopacket1.subject.sex = Sex.MALE;
        phenopacket1.subject.dateOfBirth = new Date("01/01/1990");
        phenopacket1.subject.karyotypicSex = KaryotypicSex.XY;


        let phenopacket2 = new Phenopacket();
        phenopacket2.id = "patient:2";
        phenopacket2.phenotypicFeatures = [];
        phenopacket2.phenotypicFeatures.push(phenotypicFeature3);
        phenopacket2.phenotypicFeatures.push(phenotypicFeature4);
        phenopacket2.subject = new Individual();
        phenopacket2.subject.sex = Sex.FEMALE;
        phenopacket2.subject.dateOfBirth = new Date("01/01/2000");
        phenopacket2.subject.karyotypicSex = KaryotypicSex.XX;
        phenopacket2.subject.gender = new OntologyClass("", "cisgender");

        this.FAMILY_DATA = new Family();
        this.FAMILY_DATA.proband = phenopacket1;
        this.FAMILY_DATA.relatives = [];
        this.FAMILY_DATA.relatives.push(phenopacket2);

    }

}