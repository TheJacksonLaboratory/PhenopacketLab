import { Age, AgeRange, Evidence, GestationalAge, OntologyClass, TimeElement, TimeInterval } from 'src/app/models/base';
import { PhenotypicFeature } from 'src/app/models/phenotypic-feature';

export class PhenotypicFeatureData {
    PHENOTYPIC_DATA: PhenotypicFeature[] = [];

    constructor() {
        const phenotypicFeature1 = new PhenotypicFeature();
        phenotypicFeature1.description = 'Craniosynostosis refers to the premature closure of the cranial sutures. Primary craniosynostosis refers to the closure of one or more sutures due to abnormalities in skull development, and secondary craniosynostosis results from failure of brain growth.';
        phenotypicFeature1.type = new OntologyClass('HP:0001363', 'Craniosynostosis');
        phenotypicFeature1.onset = new TimeElement(new GestationalAge(2, 3));
        phenotypicFeature1.evidences = [new Evidence(new OntologyClass('', ''))];
        phenotypicFeature1.excluded = true;
        phenotypicFeature1.resolution = new TimeElement(new Age('10'));
        phenotypicFeature1.severity = new OntologyClass('', '');
        phenotypicFeature1.modifiers = [new OntologyClass('', '')];

        const phenotypicFeature0 = new PhenotypicFeature();
        phenotypicFeature0.description = 'Any anomaly of a cranial suture, that is one of the six membrane-covered openings in the incompletely ossified skull of the fetus or newborn infant.';
        phenotypicFeature0.type = new OntologyClass('HP:0011329', 'Abnormality of cranial sutures');
        phenotypicFeature0.onset = new TimeElement(new AgeRange(new Age('2'), new Age('4')));
        phenotypicFeature0.evidences = [new Evidence(new OntologyClass('', ''))];
        phenotypicFeature0.excluded = true;
        phenotypicFeature0.resolution = new TimeElement(new OntologyClass('', ''));
        phenotypicFeature0.severity = new OntologyClass('', '');
        phenotypicFeature0.modifiers = [new OntologyClass('', '')];

        const phenotypicFeature3 = new PhenotypicFeature();
        phenotypicFeature3.description = 'An increased density in the cranial sutures following obliteration.';
        phenotypicFeature3.type = new OntologyClass('HP:0005441', 'Sclerotic cranial sutures');
        phenotypicFeature3.onset = new TimeElement(new AgeRange(new Age('2'), new Age('4')));
        phenotypicFeature3.evidences = [new Evidence(new OntologyClass('', ''))];
        phenotypicFeature3.excluded = false;
        phenotypicFeature3.resolution = new TimeElement(new TimeInterval('', ''));
        phenotypicFeature3.severity = new OntologyClass('', '');
        phenotypicFeature3.modifiers = [new OntologyClass('', '')];

        const phenotypicFeature4 = new PhenotypicFeature();
        phenotypicFeature4.description = 'An overlap of the bony plates of the skull in an infant, with or without early closure.';
        phenotypicFeature4.type = new OntologyClass('HP:0010823', 'Ridged cranial sutures');
        phenotypicFeature4.onset = new TimeElement(new TimeInterval('', ''));
        phenotypicFeature4.evidences = [new Evidence(new OntologyClass('', ''))];
        phenotypicFeature4.excluded = false;
        phenotypicFeature4.resolution = new TimeElement(new TimeInterval('', ''));
        phenotypicFeature4.severity = new OntologyClass('', '');
        phenotypicFeature4.modifiers = [new OntologyClass('', '')];

        const phenotypicFeature2 = new PhenotypicFeature();
        phenotypicFeature2.description = 'An abnormally increased width of the cranial sutures for age-related norms (generally resulting from delayed closure).';
        phenotypicFeature2.type = new OntologyClass('HP:0010537 ', 'Wide cranial sutures');
        phenotypicFeature2.onset = new TimeElement(new OntologyClass('', ''));
        phenotypicFeature2.evidences = [new Evidence(new OntologyClass('', ''))];
        phenotypicFeature2.excluded = false;
        phenotypicFeature2.resolution = new TimeElement('');
        phenotypicFeature2.severity = new OntologyClass('', '');
        phenotypicFeature2.modifiers = [new OntologyClass('', '')];

        this.PHENOTYPIC_DATA.push(phenotypicFeature0);
        this.PHENOTYPIC_DATA.push(phenotypicFeature1);
        this.PHENOTYPIC_DATA.push(phenotypicFeature2);
        this.PHENOTYPIC_DATA.push(phenotypicFeature3);
        this.PHENOTYPIC_DATA.push(phenotypicFeature4);

    }

}
