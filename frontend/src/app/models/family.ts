import { Meta } from "@angular/platform-browser";
import { Params } from "@angular/router";
import { MetaData } from "./metadata";
import { Pedigree } from "./pedigree";
import { Phenopacket } from "./phenopacket";

export class Family {
    id: string;
    proband: Phenopacket;
    relatives: Map<String, Phenopacket>;
    pedigree: Pedigree;
    files: File[];
    metaData: MetaData;

    constructor(id: string) {
        this.id = id;
        this.relatives = new Map<String, Phenopacket>();
        this.pedigree = new Pedigree();
        this.files = [];
        this.metaData = new MetaData();
        this.metaData.created = new Date().toISOString();
    }

}