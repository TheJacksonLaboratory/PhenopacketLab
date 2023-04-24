import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BaseSearchService {

    constructor(http: HttpClient) {}

    /**
     * To be overidden
     * @returns 
     */
    getAll(): Observable<any> {
        console.log("To be overidden by child class");
        return new Observable<any>();
    }

    getSelectedSearchItems() {
        console.log("To be overidden by child class");
    }
}