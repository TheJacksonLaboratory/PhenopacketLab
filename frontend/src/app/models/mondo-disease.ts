import { TimeElement } from "./base";
import { Disease } from "./disease";

export class MondoDisease {
    id: string;
    name: string;
    qualifier: boolean;
    hpoId: string;
    reference: string;
    evidence: string;
    onset: TimeElement;
    frequency: string;
    sex: string;
    aspect: string;
    biocuration: string;
    description: string;
    synonyms: string[];
    xrefs: string[];
    isA: string;
    excluded: boolean;

    constructor(obj?: any) {
        this.id = obj?.id ?? '';
        this.name = obj?.name ?? '';
        // set default to false
        this.excluded = false;
    }

    /**
     * Returns the corresponding pheno Disease
     */
    public getPhenoDisease(): Disease {
        let disease = new Disease(this.id, this.name);
        disease.excluded = this.excluded;
        disease.onset = this.onset;
        disease.description = this.description;
        disease.isA = this.isA;
        return disease;
    }
}