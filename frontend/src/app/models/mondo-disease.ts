import { TimeElement } from "./base";

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

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        // set default to false
        this.excluded = false;
    }
}