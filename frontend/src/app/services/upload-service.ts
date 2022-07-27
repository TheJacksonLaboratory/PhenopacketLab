import { Injectable } from "@angular/core";
import { Observable, Subscriber } from "rxjs";

import { Phenopacket } from "../models/phenopacket";
import { parse } from "yamljs";
import { map } from "rxjs/operators";


@Injectable({
    providedIn: 'root'
})
export class UploadService {

    /**
     * 
     * @param file 
     * @returns 
     */
    public importFromFile(file: File): Observable<any[]> {
        let filename = file.name.toLowerCase();
        let type = '';
        if (filename.endsWith('json'))  {
            type = 'json';
        } else if (filename.endsWith('yml') || filename.endsWith('yaml')) {
            type = 'yaml';
        }

        return this.fileToString(file)
            .pipe(
                map((binary: string): any[] => {
                    // Converts the data to Phenopacket
                    let result = [];
                    if (type === 'json') {
                        let phenopacket = Phenopacket.convert(JSON.parse(binary as string));
                        console.log("converted phenopacket:");
                        console.log(phenopacket);
                        result.push(phenopacket);
                        return result;
                    } else if (type === 'yaml') {
                        let phenopacket = result.push(parse(binary as string));
                        result.push(phenopacket);
                        return result;
                    } else {
                        throw new Error("Type is not supported");
                    }
                }),
            );
    }

    private fileToString(file: File): Observable<string> {
        return new Observable(
            (sub: Subscriber<string>): void => {
                const r = new FileReader;
                // if success
                r.onload = (ev: ProgressEvent): void => {
                    sub.next((ev.target as any).result);
                };
                // if failed
                // r.onerror = (ev: FileReaderProgressEvent): void => {
                //     sub.error(ev);
                // };
                r.readAsText(file);
            }
        );
    }


}