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
}
