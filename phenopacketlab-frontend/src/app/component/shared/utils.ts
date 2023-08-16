import * as cloneDeep from 'lodash/cloneDeep';

export class Utils {

/**
 *
 * @param array of item with key parameters
 * @returns Returns the biggest key
 */
    public static getBiggestKey(array: any[]) {
        let key = 0;
        for (const item of array) {
            if ((item.key) >= key) {
                key = item.key;
            }
        }
        return key;
    }

    public static getUrlForId(id: string) {
        if (id.toUpperCase().startsWith('HP')
        || id.toUpperCase().startsWith('MONDO')
        || id.toUpperCase().startsWith('NCBITaxon')
        || id.toUpperCase().startsWith('NCIT')
        || id.toUpperCase().startsWith('OAE')
        || id.toUpperCase().startsWith('CHEBI')) {
            const splittedId = id.split(':');
            const prefix = splittedId[0];
            const suffix = splittedId[1];
            return `http://purl.obolibrary.org/obo/${prefix}_${suffix}`;
        }
    }

    /**
     * Uses cloneDeep from lodash
     * @param obj object to be copied
     * @returns
     */
    public static clone(obj): any {
        return cloneDeep(obj);
    }
}
