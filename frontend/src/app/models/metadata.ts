import { Convert } from "./base";

export class MetaData {
    created: string;
    createdBy: string;
    submittedBy: string;
    resources: Resource[];
    updates: Update[];
    phenopacketSchemaVersion: string;
    externalReferences: ExternalReference[];

    static convert(obj: any): MetaData {
        const metaData = new MetaData();
        metaData.created = obj['created'];
        metaData.createdBy = obj['createdBy'];
        metaData.submittedBy = obj['submittedBy'];
        metaData.resources = Resource.convert(obj['resources']);
        metaData.updates = Update.convert(obj['updates']);
        metaData.phenopacketSchemaVersion = obj['phenopacketSchemaVersion'];
        metaData.externalReferences = ExternalReference.convert(obj['externalReferences']);
        return metaData;
    }
}

export class Resource extends Convert {
    id: string;
    name: string;
    url: string;
    version: string;
    namespacePrefix: string;
    iriPrefix: string;

    static create(obj: any): Resource {
        const resource = new Resource();
        resource.id = obj['id'];
        resource.name = obj['name'];
        resource.url = obj['url'];
        resource.version = obj['version'];
        resource.namespacePrefix = obj['namespacePrefix'];
        resource.iriPrefix = obj['iriPrefix'];
        return resource;
    }
}
export class Update extends Convert {
    timestamp: string;
    updatedBy: string;
    comment: string;

    static create(obj: any): Update {
        const update = new Update();
        update.timestamp = obj['timestamp'];
        update.updatedBy = obj['updatedBy'];
        update.comment = obj['comment'];
        return update;
    }
}
export class ExternalReference extends Convert {
    id: string;
    reference: string;
    description: string;

    static create(obj: any): ExternalReference {
        const externalReference = new ExternalReference();
        externalReference.id = obj['id'];
        externalReference.reference = obj['reference'];
        externalReference.description = obj['description'];
        return externalReference;
    }
}