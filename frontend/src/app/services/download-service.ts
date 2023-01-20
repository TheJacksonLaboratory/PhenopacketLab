import { Injectable } from '@angular/core';

import { Phenopacket } from '../models/phenopacket';

@Injectable({
    providedIn: 'root'
})
export class DownloadService {

    /**
     *
     * @param phenopacket
     * @returns
     */
    public saveAsJson(phenopacket: Phenopacket): string {
        return JSON.stringify(phenopacket, this.replacer, '   ');
    }

    /**
     * Ignore fields not part of phenopacket schema
     * @param key Filter the phenopacket object
     * @param value
     * @returns
     */
    replacer(key, value) {
        // phenotypic features
        if (key === 'key' || key === 'modifierNodes' || key === 'evidenceNodes' || key === 'textMiningState') {
            return undefined;
        }
        return value;
    }


}
