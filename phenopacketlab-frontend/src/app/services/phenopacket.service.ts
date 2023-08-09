import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Phenopacket } from '../models/phenopacket';
import { User } from '@auth0/auth0-angular';
import { MessageService } from 'primeng/api';
import { DownloadService } from './download-service';

const phenopacketValidateUrl = environment.PHENO_VALIDATE_URL;

@Injectable({
    providedIn: 'root'
})
export class PhenopacketService {

    private phenopacketListSubject = new BehaviorSubject<Phenopacket[]>([]);

    constructor(private http: HttpClient,
        private downloadService: DownloadService,
        private messageService: MessageService) {
    }

    setPhenopacketList(phenopacketList: Phenopacket[]) {
        this.phenopacketListSubject.next(phenopacketList);
    }
    getPhenopacketList(): Observable<Phenopacket[]> {
        return this.phenopacketListSubject.asObservable();
    }

    /**
     * If User is null we are in anonymous mode, and we do not persist the phenopacket
     * @param phenopacket 
     * @param user 
     */
    public addPhenopacket(phenopacket: Phenopacket, user: User) {
        if (user) {
            this._savePhenopacketRemote(this.downloadService.saveAsJson(phenopacket, false)).subscribe((phenoSaved) => {
                // retrieve the db id of the phenopacket that has been saved
                phenopacket.dbId = phenoSaved.id;
                this._addPhenopacket(phenopacket);
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: `Phenopacket ${phenopacket.id} added.` });
            }, (error) => {
                console.log(error);
                this.messageService.add({
                    severity: 'error', summary: 'Failed.',
                    detail: `Phenopacket ${phenopacket.id} failed to be added due to the following error: ${error.message}`
                });
            });
        } else {
            this._addPhenopacket(phenopacket);
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: `Phenopacket ${phenopacket.id} added.` });
        }
    }

    private _addPhenopacket(phenopacket: Phenopacket) {
        const list = this.phenopacketListSubject.getValue();
        list.push(phenopacket);
        this.phenopacketListSubject.next(list);
    }

    /**
     * If User is null we are in anonymous mode and we do not persist the phenopacket
     * @param phenopacket 
     * @param user 
     */
    public removePhenopacket(phenopacket: Phenopacket, user: User) {
        if (user) {
            this._deletePhenopacketRemote(phenopacket.dbId).subscribe(() => {
                this._removePhenopacket(phenopacket);
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: `Phenopacket ${phenopacket.id} removed.` });
            }, () => {
                this.messageService.add({
                    severity: 'error', summary: 'Failed.',
                    detail: `Phenopacket ${phenopacket.id} failed to be removed.`
                });
            });
        } else {
            // Remove them from the cohort.
            this._removePhenopacket(phenopacket);
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: `Phenopacket ${phenopacket.id} removed.` });
        }
    }

    private _removePhenopacket(phenopacket: Phenopacket) {
        const list = this.phenopacketListSubject.getValue();
        for (let i = list.length - 1; i >= 0; --i) {
            if (list[i].id === phenopacket.id) {
                list.splice(i, 1);
            }
        }
        this.phenopacketListSubject.next(list);
    }

    /**
     * If User is null we are in anonymous mode, and we do not persist the phenopacket
     * @param phenopacket 
     * @param user 
     */
    public updatePhenopacket(phenopacket: Phenopacket, user: User) {
        if (user) {
            this._updatePhenopacketRemote(phenopacket.dbId,
                this.downloadService.saveAsJson(phenopacket, false)).subscribe(() => {
                    this.messageService.add({ severity: 'info', summary: 'Updated!', detail: `Phenopacket ${phenopacket.id} updated.` });
                    this.fetchAllPhenopacketsRemote().subscribe();
                    this._updatePhenopacket(phenopacket);
                }, () => {
                    this.messageService.add({ severity: 'error', summary: 'Error Updating!', detail: `Server could not update Phenopacket ${phenopacket.id}.` });
                });
        } else {
            this._updatePhenopacket(phenopacket);
        }

    }

    private _updatePhenopacket(phenopacket: Phenopacket) {
        const list = this.phenopacketListSubject.getValue();
        for (let i = list.length - 1; i >= 0; --i) {
            if (list[i].id === phenopacket.id) {
                list[i] = phenopacket;
            }
        }
        this.phenopacketListSubject.next(list);
    }

    public validatePhenopacket(phenopacket: string): Observable<any> {
        const headers = { 'content-type': 'text/plain' };
        return this.http.post(phenopacketValidateUrl, phenopacket, { headers });
    }

    private _savePhenopacketRemote(phenopacket: string): Observable<any> {
        const headers = { 'content-type': 'text/plain' };
        return this.http.put(environment.PHENOPACKET_URL, phenopacket, { headers });
    }

    private _updatePhenopacketRemote(id: string, phenopacket: string) {
        const headers = { 'content-type': 'text/plain' };
        console.log('id:');
        console.log(id);
        return this.http.post(environment.PHENOPACKET_URL, phenopacket,
            { headers, params: new HttpParams().set('id', id) });
    }

    public fetchAllPhenopacketsRemote(): Observable<Phenopacket[]> {
        return this.http.get<Phenopacket[]>(environment.PHENOPACKET_URL).pipe(map((phenopacketList: any[]) => {
            return phenopacketList.map((result) => {
                // parse string and convert to Phenopacket
                const pheno = Phenopacket.convert(JSON.parse(result.phenopacket));
                pheno.dbId = result.id;
                return pheno;
            });
        }));
    }

    private _deletePhenopacketRemote(id): Observable<any> {
        const params = new HttpParams().append('id', id);
        return this.http.delete(environment.PHENOPACKET_URL, { params });
    }
}

