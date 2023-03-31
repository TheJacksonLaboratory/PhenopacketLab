import { Convert, OntologyClass, TimeElement } from './base';

export class Disease extends Convert {
    // key parameter not part of the phenopacket schema, used for primeng table
    key?: number;

    term: OntologyClass;
    excluded: boolean;
    onset: TimeElement;
    resolution: TimeElement;
    diseaseStage: OntologyClass[];
    clinicalTnmFinding: OntologyClass[];
    primarySite: OntologyClass;
    laterality: OntologyClass;
    // not from the phenopacket schema
    description: string;
    isA: string;

    constructor(id?: string, label?: string) {
        super();
        this.term = new OntologyClass(id, label);
        this.diseaseStage = [];
        this.clinicalTnmFinding = [];
    }

    static create(obj: any): Disease {
        const disease = new Disease();
        if (obj['term']) {
            disease.term = OntologyClass.convert(obj['term']);
        } else {
            throw new Error(`Phenopacket file is missing 'term' field in 'disease' object.`);
        }
        if (obj['excluded']) {
            disease.excluded = obj['excluded'];
        }
        if (obj['onset']) {
            disease.onset = TimeElement.convert(obj['onset']);
        }
        if (obj['resolution']) {
            disease.resolution = TimeElement.convert(obj['resolution']);
        }
        if (obj['diseaseStage']) {
            disease.diseaseStage = OntologyClass.convert(obj['diseaseStage']);
            disease.diseaseStage.forEach(stage => {
                stage.url = Disease.getDiseaseURL(stage.id);
            });
        }
        if (obj['clinicalTnmFinding']) {
            disease.clinicalTnmFinding = OntologyClass.convert(obj['clinicalTnmFinding']);
        }
        if (obj['primarySite']) {
            disease.primarySite = OntologyClass.convert(obj['primarySite']);
        }
        if (obj['laterality']) {
            disease.laterality = OntologyClass.convert(obj['laterality']);
            disease.laterality.url = `https://hpo.jax.org/app/browse/term/${disease.laterality.id}`;
        }
        if (obj['description']) {
            disease.description = obj['description'];
        }

        return disease;
    }

    public static getDiseaseURL(id: string) {
        if (id?.startsWith('OMIM')) {
          return `https://www.omim.org/entry/${id.split(':')[1]}`;
        } else if (id?.startsWith('ORPHA')) {
          return `https://hpo.jax.org/app/browse/disease/${id}`;
        }
        return id;
      }
}

export class Laterality {
    static VALUES = [new OntologyClass('HP:0012834', 'Right'),
                new OntologyClass('HP:0012835', 'Left'),
                new OntologyClass('HP:0012833', 'Unilateral'),
                new OntologyClass('HP:0012832', 'Bilateral')];
}
export class Onset {
    static VALUES = [new OntologyClass('HP:0030674', 'Antenatal onset'),
                new OntologyClass('HP:0011460', 'Embryonal onset'),
                new OntologyClass('HP:0011461', 'Fetal onset'),
                new OntologyClass('HP:0034199', 'Late first trimester onset'),
                new OntologyClass('HP:0034198', 'Second trimester onset'),
                new OntologyClass('HP:0034197', 'Third trimester onset'),
                new OntologyClass('HP:0003577', 'Congenital onset'),
                new OntologyClass('HP:0003623', 'Neonatal onset'),
                new OntologyClass('HP:0003593', 'Infantile onset'),
                new OntologyClass('HP:0011463', 'Childhood onset'),
                new OntologyClass('HP:0003621', 'Juvenile onset'),
                new OntologyClass('HP:0003581', 'Adult onset'),
                new OntologyClass('HP:0011462', 'Young adult onset'),
                new OntologyClass('HP:0025708', 'Early young adult onset'),
                new OntologyClass('HP:0025709', 'Intermediate young adult onset'),
                new OntologyClass('HP:0025710', 'Late young adult onset'),
                new OntologyClass('HP:0003596', 'Middle age onset'),
                new OntologyClass('HP:0003584', 'Late onset')];
}
export class Severities {
    static VALUES = [
        new OntologyClass('HP:0012827', 'Borderline'),
        new OntologyClass('HP:0012825', 'Mild'),
        new OntologyClass('HP:0012826', 'Moderate'),
        new OntologyClass('HP:0012828', 'Severe'),
        new OntologyClass('HP:0012829', 'Profound')

    ];
}
export class Stages {
    static VALUES = [
        new OntologyClass('st-0', 'Stage 0 - carcinoma in situ'),
        new OntologyClass('st-1', 'Stage I - localized cancer'),
        new OntologyClass('st-2', 'Stage II - locally advanced cancer, early stages'),
        new OntologyClass('st-3', 'Stage III - locally advanced cancer, later stages'),
        new OntologyClass('st-4', 'Stage IV - metastatic cancer')
    ];
}
