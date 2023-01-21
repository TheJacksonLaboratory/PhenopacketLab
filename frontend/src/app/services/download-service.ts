import { Injectable } from '@angular/core';

import { Phenopacket } from '../models/phenopacket';

@Injectable({
    providedIn: 'root'
})
export class DownloadService {

    /**
     * Saves phenopacket to File if flag is true
     * @param phenopacket
     * @param saveToFile
     * @returns phenopacket string
     */
    public saveAsJson(phenopacket: Phenopacket, saveToFile: boolean): string {
        const phenopacketString = JSON.stringify(phenopacket, this.replacer, '   ');
        if (saveToFile) {
            this.dynamicDownloadByHtmlTag({
                fileName: `${phenopacket.id}.json`,
                text: phenopacketString
            });
        }
        return phenopacketString;
    }

    private dynamicDownloadByHtmlTag(arg: {
        fileName: string,
        text: string
    }) {
        const setting = {
            element: {
                dynamicDownload: null as HTMLElement
            }
        };
        if (!setting.element.dynamicDownload) {
            setting.element.dynamicDownload = document.createElement('a');
        }
        const element = setting.element.dynamicDownload;
        const fileType = arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
        element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
        element.setAttribute('download', arg.fileName);

        const event = new MouseEvent('click');
        element.dispatchEvent(event);
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
