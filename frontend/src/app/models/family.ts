import { MetaData } from "./metadata";
import { Phenopacket } from "./phenopacket";

export class Family {
    id: string;
    proband: Phenopacket;
    relatives: Phenopacket[];
    metaData: MetaData;
}