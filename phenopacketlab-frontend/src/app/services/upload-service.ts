import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { PhenopacketLabError } from '../models/error';
import { FileType } from '../models/file-type';

import { Phenopacket } from '../models/phenopacket';
import { parse } from 'yamljs';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class UploadService {

    /**
     *
     * @param file
     * @returns
     */
    public importFromFile(file: File): Observable<Phenopacket> {
        const filename = file.name.toLowerCase();
        let type;
        if (filename.endsWith('json'))  {
            type = FileType.JSON;
        } else if (filename.endsWith('yml') || filename.endsWith('yaml')) {
            type = FileType.YAML;
        } else {
            throw new Error('Phenopacket file type is not supported');
        }

        return this.fileToString(file)
            .pipe(
                map((binary: string): Phenopacket => {
                    try {
                        let phenopacket: Phenopacket;
                        if (type === FileType.JSON) {
                            phenopacket = Phenopacket.convert(JSON.parse(binary as string));
                            return phenopacket;
                        } else if (type === FileType.YAML) {
                            phenopacket = parse(binary as string);
                            return phenopacket;
                        }
                    } catch (e) {
                        throw new PhenopacketLabError(`${file.name} Parsing Error`, e);
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
