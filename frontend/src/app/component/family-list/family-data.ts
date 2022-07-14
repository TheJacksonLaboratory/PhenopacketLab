import { Age, AgeRange, Evidence, GestationalAge, OntologyClass, TimeElement, TimeInterval } from "src/app/models/base";
import { Cohort } from "src/app/models/cohort";
import { Family } from "src/app/models/family";
import { Individual, KaryotypicSex, Sex } from "src/app/models/individual";
import { Phenopacket } from "src/app/models/phenopacket";
import { PhenotypicFeature } from "src/app/models/phenotypic-feature";

export class FamilyData {
    FAMILY_DATA: Family;
    COHORT_DATA: Cohort;

    constructor() {
        

        let phenotypicFeature0 = new PhenotypicFeature();
        phenotypicFeature0.description = 'Any anomaly of a cranial suture, that is one of the six membrane-covered openings in the incompletely ossified skull of the fetus or newborn infant.';
        phenotypicFeature0.type = {id: 'HP:0011329', label: 'Abnormality of cranial sutures'};
        phenotypicFeature0.onset = new TimeElement(new GestationalAge(2, 3), new Age('10'), new AgeRange(new Age('2'), new Age('4')), {id: '', label: ''}, '', new TimeInterval('', ''));
        phenotypicFeature0.evidence = new Evidence({id: '', label: ''}, {id: '', label: ''}, new TimeElement(new GestationalAge(2, 3), new Age('10'), new AgeRange(new Age('2'), new Age('4')), {id: '', label: ''}, '', new TimeInterval('', '')));
        phenotypicFeature0.excluded = true;
        phenotypicFeature0.resolution = new TimeElement(new GestationalAge(2, 3), new Age('10'), new AgeRange(new Age('2'), new Age('4')), {id: '', label: ''}, '', new TimeInterval('', ''));
        phenotypicFeature0.severity = {id: '', label: ''};
        phenotypicFeature0.modifiers = {id: '', label: ''};
        
        let phenotypicFeature3 = new PhenotypicFeature();
        phenotypicFeature3.description = 'An increased density in the cranial sutures following obliteration.';
        phenotypicFeature3.type = {id: 'HP:0005441', label: 'Sclerotic cranial sutures'};
        phenotypicFeature3.onset = new TimeElement(new GestationalAge(2, 3), new Age('10'), new AgeRange(new Age('2'), new Age('4')), {id: '', label: ''}, '', new TimeInterval('', ''));
        phenotypicFeature3.evidence = new Evidence({id: '', label: ''}, {id: '', label: ''}, new TimeElement(new GestationalAge(2, 3), new Age('10'), new AgeRange(new Age('2'), new Age('4')), {id: '', label: ''}, '', new TimeInterval('', '')));
        phenotypicFeature3.excluded = false;
        phenotypicFeature3.resolution = new TimeElement(new GestationalAge(2, 3), new Age('10'), new AgeRange(new Age('2'), new Age('4')), {id: '', label: ''}, '', new TimeInterval('', ''));
        phenotypicFeature3.severity = {id: '', label: ''};
        phenotypicFeature3.modifiers = {id: '', label: ''};

        let phenotypicFeature4 = new PhenotypicFeature();
        phenotypicFeature4.description = 'An overlap of the bony plates of the skull in an infant, with or without early closure.';
        phenotypicFeature4.type = {id: 'HP:0010823', label: 'Ridged cranial sutures'};
        phenotypicFeature4.onset = new TimeElement(new GestationalAge(2, 3), new Age('10'), new AgeRange(new Age('2'), new Age('4')), {id: '', label: ''}, '', new TimeInterval('', ''));
        phenotypicFeature4.evidence = new Evidence({id: '', label: ''}, {id: '', label: ''}, new TimeElement(new GestationalAge(2, 3), new Age('10'), new AgeRange(new Age('2'), new Age('4')), {id: '', label: ''}, '', new TimeInterval('', '')));
        phenotypicFeature4.excluded = false;
        phenotypicFeature4.resolution = new TimeElement(new GestationalAge(2, 3), new Age('10'), new AgeRange(new Age('2'), new Age('4')), {id: '', label: ''}, '', new TimeInterval('', ''));
        phenotypicFeature4.severity = {id: '', label: ''};
        phenotypicFeature4.modifiers = {id: '', label: ''};

        let phenotypicFeature2 = new PhenotypicFeature();
        phenotypicFeature2.description = 'An abnormally increased width of the cranial sutures for age-related norms (generally resulting from delayed closure).';
        phenotypicFeature2.type = {id: 'HP:0010537 ', label: 'Wide cranial sutures'};
        phenotypicFeature2.onset = new TimeElement(new GestationalAge(2, 3), new Age('10'), new AgeRange(new Age('2'), new Age('4')), {id: '', label: ''}, '', new TimeInterval('', ''));
        phenotypicFeature2.evidence = new Evidence({id: '', label: ''}, {id: '', label: ''}, new TimeElement(new GestationalAge(2, 3), new Age('10'), new AgeRange(new Age('2'), new Age('4')), {id: '', label: ''}, '', new TimeInterval('', '')));
        phenotypicFeature2.excluded = false;
        phenotypicFeature2.resolution = new TimeElement(new GestationalAge(2, 3), new Age('10'), new AgeRange(new Age('2'), new Age('4')), {id: '', label: ''}, '', new TimeInterval('', ''));
        phenotypicFeature2.severity = {id: '', label: ''};
        phenotypicFeature2.modifiers = {id: '', label: ''};

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
        phenopacket2.subject.gender = {id: "", label: "cisgender"};

        this.COHORT_DATA = new Cohort();
        this.COHORT_DATA.members = [];
        this.COHORT_DATA.members.push(phenopacket1);
        this.COHORT_DATA.members.push(phenopacket2);
    }

}