import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const metadataUrl = environment.METADATA_URL;
const resourceUrl = environment.RESOURCE_URL;

@Injectable({
    providedIn: 'root'
})
export class MetadataService {

    constructor(private http: HttpClient) {
    }

    public getPhenopacketMetadata(): Observable<any> {
        return this.http.get(metadataUrl);
    }

    public getPhenopacketMetadataByPrefix(prefix: string): Observable<any> {
        return this.http.get(`${metadataUrl}/${prefix}`);
    }

    public getResourcePrefixesForPhenopacket(phenopacketString: string): Observable<any> {
        const headers = { 'content-type': 'text/plain' };
        return this.http.post(metadataUrl, phenopacketString, {headers});
    }

    public getResourcesForPhenopacket(phenopacketString: string): Observable<any> {
        const headers = { 'content-type': 'text/plain' };
        return this.http.post(resourceUrl, phenopacketString, {headers});
    }

}
