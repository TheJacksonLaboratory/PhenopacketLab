import { Convert, ExternalReference } from "./base";

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
        if (obj['created']) {
            metaData.created = obj['created'];
        }
        if (obj['createdBy']) {
            metaData.createdBy = obj['createdBy'];
        }
        if (obj['submittedBy']) {
            metaData.submittedBy = obj['submittedBy'];
        }
        if (obj['resources']) {
            metaData.resources = Resource.convert(obj['resources']);
        }
        if (obj['updates']) {
            metaData.updates = Update.convert(obj['updates']);
        }
        if (obj['phenopacketSchemaVersion']) {
            metaData.phenopacketSchemaVersion = obj['phenopacketSchemaVersion'];
        }
        if (obj['externalReferences']) {
            metaData.externalReferences = ExternalReference.convert(obj['externalReferences']);
        }
        
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
        if (obj['id']) {
            resource.id = obj['id'];
        }
        if (obj['name']) {
            resource.name = obj['name'];
        }
        if (obj['url']) {
            resource.url = obj['url'];
        }
        if (obj['version']) {
            resource.version = obj['version'];
        }
        if (obj['namespacePrefix']) {
            resource.namespacePrefix = obj['namespacePrefix'];
        }
        if (obj['iriPrefix']) {
            resource.iriPrefix = obj['iriPrefix'];
        }
        return resource;
    }
}
export class Update extends Convert {
    timestamp: string;
    updatedBy: string;
    comment: string;

    static create(obj: any): Update {
        const update = new Update();
        if (obj['timestamp']) {
            update.timestamp = obj['timestamp'];
        }
        if (obj['updatedBy']) {
            update.updatedBy = obj['updatedBy'];
        }
        if (obj['comment']) {
            update.comment = obj['comment'];
        }
        return update;
    }
}