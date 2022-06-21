export class MetaData {
    created: string;
    createdBy: string;
    submittedBy: string;
    resources: Resource;
    updates: Update;
    phenopacketSchemaVersion: string;
    externalReferences: ExternalReference;

    constructor(created: string, createdBy: string, submittedBy: string) {
        this.created = created;
        this.createdBy = createdBy;
        this.submittedBy = submittedBy;
        this.resources = new Resource();
        this.updates = new Update();
        this.externalReferences = new ExternalReference();
    }
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
export class ExternalReference {
    id: string;
    reference: string;
    description: string;
}