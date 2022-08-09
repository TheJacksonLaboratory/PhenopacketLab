import { Cohort } from "src/app/models/cohort";
import { Family } from "src/app/models/family";
import { Phenopacket } from "src/app/models/phenopacket";

import covid from 'src/assets/data/covid.json';
import myopathy from 'src/assets/data/bethleem-myopathy.json';

export class FamilyData {
    FAMILY_DATA: Family;
    COHORT_DATA: Cohort;

    constructor() {
        // create new Cohort
        this.COHORT_DATA = new Cohort();
        this.COHORT_DATA.members = [];
        // Load a couple phenopacket data files and add them to Cohort
        let myopathyPhenopacket = Phenopacket.convert(myopathy);
        let covidPhenoPacket = Phenopacket.convert(covid);
        this.COHORT_DATA.members.push(myopathyPhenopacket);
        this.COHORT_DATA.members.push(covidPhenoPacket);
    }

}