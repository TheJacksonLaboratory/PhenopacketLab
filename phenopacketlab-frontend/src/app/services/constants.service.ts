import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const modifiersUrl = environment.MODIFIERS_URL;
const evidencesUrl = environment.EVIDENCES_URL;
const onsetsUrl = environment.ONSETS_URL;
const tnmTumorFindingsUrl = environment.TNM_TUMOR_URL;
const tnmNodeFindingsUrl = environment.TNM_NODE_URL;
const tnmMetastasisFindingsUrl = environment.TNM_METASTASIS_URL;
const diseaseStagesUrl = environment.DISEASE_STAGES_URL;
const sexUrl = environment.SEX_URL;
const lateralityUrl = environment.LATERALITY_URL;
const severityUrl = environment.SEVERITY_URL;
const routeOfAdministrationUrl = environment.ROUTE_OF_ADMINISTRATION_URL;
const scheduleFrequencyUrl = environment.SCHEDULE_FREQUENCY_URL;
const adverseEventUrl = environment.ADVERSE_EVENT_URL;
const bodySiteUrl = environment.BODY_SITE_URL;
const unitUrl = environment.UNIT_URL;
const homoSapiensUrl = environment.HOMO_SAPIENS_URL;
const terminationReasonsUrl = environment.TREATMENT_STATUS;

@Injectable({
    providedIn: 'root'
})
export class ConstantsService {

    // BehaviorSubject used to store data
    modifiers = new BehaviorSubject<any>(undefined);
    evidences = new BehaviorSubject<any>(undefined);
    sexes = new BehaviorSubject<any>(undefined);
    onsets = new BehaviorSubject<any>(undefined);
    lateralities = new BehaviorSubject<any>(undefined);
    severities = new BehaviorSubject<any>(undefined);
    tnmTumorFindings = new BehaviorSubject<any>(undefined);
    tnmNodeFindings = new BehaviorSubject<any>(undefined);
    tnmMetastasisFindings = new BehaviorSubject<any>(undefined);
    diseaseStages = new BehaviorSubject<any>(undefined);
    routesOfAdministration = new BehaviorSubject<any>(undefined);
    scheduleFrequencies = new BehaviorSubject<any>(undefined);
    adverseEvent = new BehaviorSubject<any>(undefined);
    bodySites = new BehaviorSubject<any>(undefined);
    units = new BehaviorSubject<any>(undefined);
    taxonomy = new BehaviorSubject<any>(undefined);
    terminationReasons = new BehaviorSubject<any>(undefined);

    constructor(private http: HttpClient) {
    }

    /**
     * Return modifiers as an Observable
     * @returns
     */
    getModifiers(): Observable<any> {
        // only if undefined, load from server
        if (this.modifiers.getValue() === undefined) {
            console.log('Loading modifiers...');
            this.http.get(modifiersUrl).subscribe(res => {
                this.modifiers.next(res);
            }, (error) => {
                console.log(error);
            });
        }
        // return modifiers for subscription even if the value is yet undefined.
        return this.modifiers.asObservable();
    }

    /**
     * Return evidences as an Observable
     * @returns
     */
    getEvidences(): Observable<any> {
        // only if undefined, load from server
        if (this.evidences.getValue() === undefined) {
            console.log('Loading evidences...');
            this.http.get(evidencesUrl).subscribe(res => {
                this.evidences.next(res);
            }, (error) => {
                console.log(error);
            });
        }
        // return evidences for subscription even if the value is yet undefined.
        return this.evidences.asObservable();
    }

    /**
     * Return sex as an Observable
     * @returns
     */
    getSex(): Observable<any> {
        // only if undefined, load from server
        if (this.sexes.getValue() === undefined) {
            console.log('Loading sexes...');
            this.http.get(sexUrl).subscribe(res => {
                this.sexes.next(res);
            }, (error) => {
                console.log(error);
            });
        }
        // return evidences for subscription even if the value is yet undefined.
        return this.sexes.asObservable();
    }

    /**
     * Return onsets as an Observable
     * @returns
     */
    getOnsets(): Observable<any> {
        // only if undefined, load from server
        if (this.onsets.getValue() === undefined) {
            console.log('Loading onsets...');
            this.http.get(onsetsUrl).subscribe(res => {
                this.onsets.next(res);
            }, (error) => {
                console.log(error);
            });
        }
        // return onsets for subscription even if the value is yet undefined.
        return this.onsets.asObservable();
    }

    /**
     * Return lateralities as an Observable
     * @returns
     */
    getLateralities(): Observable<any> {
        // only if undefined, load from server
        if (this.lateralities.getValue() === undefined) {
            console.log('Loading lateralities...');
            this.http.get(lateralityUrl).subscribe(res => {
                this.lateralities.next(res);
            }, (error) => {
                console.log(error);
            });
        }
        // return lateralities for subscription even if the value is yet undefined.
        return this.lateralities.asObservable();
    }

    /**
     * Return severities as an Observable
     * @returns
     */
    getSeverities(): Observable<any> {
        // only if undefined, load from server
        if (this.severities.getValue() === undefined) {
            console.log('Loading severities...');
            this.http.get(severityUrl).subscribe(res => {
                this.severities.next(res);
            }, (error) => {
                console.log(error);
            });
        }
        // return severities for subscription even if the value is yet undefined.
        return this.severities.asObservable();
    }

    /**
     * Return tnmTumorFindings as an Observable
     * @returns
     */
    getTnmTumorFindings(): Observable<any> {
        // only if undefined, load from server
        if (this.tnmTumorFindings.getValue() === undefined) {
            console.log('Loading tnmTumorFindings...');
            this.http.get(tnmTumorFindingsUrl).subscribe(res => {
                this.tnmTumorFindings.next(res);
            }, (error) => {
                console.log(error);
            });
        }
        // return severities for subscription even if the value is yet undefined.
        return this.tnmTumorFindings.asObservable();
    }

    /**
     * Return tnmNodeFindings as an Observable
     * @returns
     */
    getTnmNodeFindings(): Observable<any> {
        // only if undefined, load from server
        if (this.tnmNodeFindings.getValue() === undefined) {
            console.log('Loading tnmNodeFindings...');
            this.http.get(tnmNodeFindingsUrl).subscribe(res => {
                this.tnmNodeFindings.next(res);
            }, (error) => {
                console.log(error);
            });
        }
        // return severities for subscription even if the value is yet undefined.
        return this.tnmNodeFindings.asObservable();
    }

    /**
     * Return TnmMetastasisFindings as an Observable
     * @returns
     */
    getTnmMetastasisFindings(): Observable<any> {
        // only if undefined, load from server
        if (this.tnmMetastasisFindings.getValue() === undefined) {
            console.log('Loading TnmMetastasisFindings...');
            this.http.get(tnmMetastasisFindingsUrl).subscribe(res => {
                this.tnmMetastasisFindings.next(res);
            }, (error) => {
                console.log(error);
            });
        }
        // return severities for subscription even if the value is yet undefined.
        return this.tnmMetastasisFindings.asObservable();
    }

    /**
     * Return diseaseStages as an Observable
     * @returns
     */
    getDiseaseStages(): Observable<any> {
        // only if undefined, load from server
        if (this.diseaseStages.getValue() === undefined) {
            console.log('Loading diseaseStages...');
            this.http.get(diseaseStagesUrl).subscribe(res => {
                this.diseaseStages.next(res);
            }, (error) => {
                console.log(error);
            });
        }
        // return severities for subscription even if the value is yet undefined.
        return this.diseaseStages.asObservable();
    }
    public getAdverseEvents(): Observable<any> {
        // only if undefined, load from server
        if (this.adverseEvent.getValue() === undefined) {
            console.log('Loading adverse events...');
            this.http.get(adverseEventUrl).subscribe(res => {
                this.adverseEvent.next(res);
            }, (error) => {
                console.log(error);
            });
        }
        // return routes for subscription even if the value is yet undefined.
        return this.adverseEvent.asObservable();
    }

    public getRoutesOfAdministration(): Observable<any> {
        // only if undefined, load from server
        if (this.routesOfAdministration.getValue() === undefined) {
            console.log('Loading routes of administration...');
            this.http.get(routeOfAdministrationUrl).subscribe(res => {
                this.routesOfAdministration.next(res);
            }, (error) => {
                console.log(error);
            });
        }
        // return routes for subscription even if the value is yet undefined.
        return this.routesOfAdministration.asObservable();
    }

    public getScheduleFrequencies(): Observable<any> {
        // only if undefined, load from server
        if (this.scheduleFrequencies.getValue() === undefined) {
            console.log('Loading schedule frequencies...');
            this.http.get(scheduleFrequencyUrl).subscribe(res => {
                this.scheduleFrequencies.next(res);
            }, (error) => {
                console.log(error);
            });
        }
        // return schedule frequencies even if the value is yet undefined.
        return this.scheduleFrequencies.asObservable();
    }

    public getBodySites(): Observable<any> {
        // only if undefined, load from server
        if (this.bodySites.getValue() === undefined) {
            console.log('Loading body sites...');
            this.http.get(bodySiteUrl).subscribe(res => {
                this.bodySites.next(res);
            }, (error) => {
                console.log(error);
            });
        }
        // return body sites even if the value is yet undefined.
        return this.bodySites.asObservable();
    }
    public getUnits(): Observable<any> {
        // only if undefined, load from server
        if (this.units.getValue() === undefined) {
            console.log('Loading units...');
            this.http.get(unitUrl).subscribe(res => {
                this.units.next(res);
            }, (error) => {
                console.log(error);
            });
        }
        // return units even if the value is yet undefined.
        return this.units.asObservable();
    }
    public getHomoSapiensTaxonomy(): Observable<any> {
        if (this.taxonomy.getValue() === undefined) {
            console.log('Loading taxonomy...');
            this.http.get(homoSapiensUrl).subscribe(res => {
                this.taxonomy.next(res);
            }, (error) => {
                console.log(error);
            })
        }
        return this.taxonomy.asObservable();
    }
    public getTerminationReasons(): Observable<any> {
        if (this.terminationReasons.getValue() === undefined) {
            console.log('Loading termination reasons...');
            this.http.get(terminationReasonsUrl).subscribe(res => {
                this.terminationReasons.next(res);
            }, (error) => {
                console.log(error);
            })
        }
        return this.terminationReasons.asObservable();
    }
}

