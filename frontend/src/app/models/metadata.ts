import { ExternalReference } from "@angular/compiler";

export class MetaData {
    created: string;
    createdBy: string;
    submittedBy: string;
    resources: Resource;
    updates: Update;
    phenopacketSchemaVersion: string;
    externalReferences: ExternalReference;
}

export class Resource {
    id: string;
    name: string;
    url: string;
    version: string;
    namespacePrefix: string;
    iriPrefix: string;
}
export class Update {
    timestamp: string;
    updatedBy: string;
    comment: string;
}