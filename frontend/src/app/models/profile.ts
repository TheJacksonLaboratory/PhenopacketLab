export enum ProfileSelection {
    RARE_DISEASE = 'rare',
    ALL_AVAILABLE = 'all',
    OTHER = 'other'
}

/**
 * Class used for selecting a Profile when creating a phenopacket
 */
export class Profile {

    static profileSelectionOptions = [
        // tslint:disable-next-line:max-line-length
        { label: 'Rare disease', value: ProfileSelection.RARE_DISEASE, path: 'rare', steps: ['phenotypic-features', 'diseases', 'validate'] },
        { label: 'All available steps', value: ProfileSelection.ALL_AVAILABLE, path: 'all', steps: ['phenotypic-features', 'measurements', 'biosamples', 'interpretations', 'diseases', 'medical-actions', 'files', 'validate'] }
    ];
}
