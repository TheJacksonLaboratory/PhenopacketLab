import { MetaData } from './metadata';
import { Phenopacket } from './phenopacket';

export class Cohort {
    id: string;
    description: string;
    members: Phenopacket[];
    files: File[];
    metaData: MetaData;
}
