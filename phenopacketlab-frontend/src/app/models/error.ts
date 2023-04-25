/**
 * Extended error to have details with primeng toasts
 */
export class PhenopacketLabError extends Error {
    detail: string;
    constructor(m: string, d: string) {
        super(m);
        this.detail = d;
    }
}
