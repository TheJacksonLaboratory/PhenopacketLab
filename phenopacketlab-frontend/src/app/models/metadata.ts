import { Convert, ExternalReference } from './base';

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
        if ('created' in obj) {
            metaData.created = obj['created'];
        }
        if ('createdBy' in obj) {
            metaData.createdBy = obj['createdBy'];
        }
        if ('submittedBy' in obj) {
            metaData.submittedBy = obj['submittedBy'];
        }
        if ('resources' in obj) {
            metaData.resources = Resource.convert(obj['resources']);
        }
        if ('updates' in obj) {
            metaData.updates = Update.convert(obj['updates']);
        }
        if ('phenopacketSchemaVersion' in obj) {
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
        if(obj) {
            const resource = new Resource();
            if ('id' in obj) {
                resource.id = obj['id'];
            }
            if ('name' in obj) {
                resource.name = obj['name'];
            }
            if ('url' in obj) {
                resource.url = obj['url'];
            }
            if ('version' in obj) {
                resource.version = obj['version'];
            }
            if ('namespacePrefix' in obj) {
                resource.namespacePrefix = obj['namespacePrefix'];
            }   
            if ('iriPrefix' in obj) {
                resource.iriPrefix = obj['iriPrefix'];
            }
            return resource;
        }
    }
}
export class Update extends Convert {
    timestamp: string;
    updatedBy: string;
    comment: string;

    static create(obj: any): Update {
        const update = new Update();
        if ('timestamp' in obj) {
            update.timestamp = obj['timestamp'];
        }
        if ('updatedBy' in obj) {
            update.updatedBy = obj['updatedBy'];
        }
        if ('comment' in obj) {
            update.comment = obj['comment'];
        }
        return update;
    }
}
