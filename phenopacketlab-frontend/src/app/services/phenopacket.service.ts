import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Phenopacket } from '../models/phenopacket';
import { DownloadService } from './download-service';

const phenopacketValidateUrl = environment.PHENO_VALIDATE_URL;

@Injectable({
    providedIn: 'root'
})
export class PhenopacketService {

    private phenopacketListSubject = new BehaviorSubject<Phenopacket[]>([]);

    constructor(private http: HttpClient) {
    }

    setPhenopaketList(phenopacketList: Phenopacket[]) {
        this.phenopacketListSubject.next(phenopacketList);
    }
    getPhenopacketList(): Observable<Phenopacket[]> {
        return this.phenopacketListSubject.asObservable();
    }

    addPhenopacket(phenopacket: Phenopacket) {
        const list = this.phenopacketListSubject.getValue();
        list.push(phenopacket);
        this.phenopacketListSubject.next(list);
    }

    removePhenopacket(phenopacket: Phenopacket) {
        const list = this.phenopacketListSubject.getValue();
        for (let i = list.length - 1; i >= 0; --i) {
            if (list[i].id === phenopacket.id) {
                list.splice(i, 1);
            }
        }
        this.phenopacketListSubject.next(list);
    }

    updatePhenopacket(phenopacket: Phenopacket) {
        const list = this.phenopacketListSubject.getValue();
        for (let i = list.length - 1; i >= 0; --i) {
            if (list[i].id === phenopacket.id) {
                list[i] = phenopacket;
            }
        }
        this.phenopacketListSubject.next(list);
    }

    validatePhenopacket(phenopacket: string): Observable<any> {
        const headers = { 'content-type': 'text/plain' };
        return this.http.post(phenopacketValidateUrl, phenopacket, { headers });
    }

    savePhenopacketRemote(phenopacket: string): Observable<any> {
        const headers = { 'content-type': 'text/plain' };
        return this.http.put(environment.PHENOPACKET_URL, phenopacket, { headers });
    }

    updatePhenopacketRemote(id: number, phenopacket: string) {
        const headers = { 'content-type': 'text/plain' };
        return this.http.post(environment.PHENOPACKET_URL, phenopacket,
            { headers, params: new HttpParams().set('id', id) });
    }

    fetchAllPhenopacketsRemote(): Observable<Phenopacket[]> {
        return this.http.get<Phenopacket[]>(environment.PHENOPACKET_URL).pipe(map((phenopacketList: any[]) => {
            return phenopacketList.map((result) => {
                result.phenopacket.dbId = result.id;
                return result.phenopacket;
            });
        }));
    }

    deletePhenopacketRemote(id): Observable<any> {
        const params = new HttpParams().append('id', id);
        return this.http.delete(environment.PHENOPACKET_URL, {params});
    }
}

