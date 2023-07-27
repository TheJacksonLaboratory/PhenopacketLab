export enum ProfileSelection {
    RARE_DISEASE = 'rare',
    ALL_AVAILABLE = 'all',
    OTHER = 'other'
}

/**
 * Class used for selecting a Profile when creating a phenopacket
 */
export class Profile {

    static rareMenuItems = [{
        label: 'Individual',
        routerLink: 'individual'
    },
    {
        label: 'Phenotypic Feature(s)',
        routerLink: 'phenotypic-features'
    },
    {
        label: 'Disease diagnoses',
        routerLink: 'diseases'
    },
    {
        label: 'Interpretation(s)',
        routerLink: 'interpretations'
    },
    {
        label: 'Validate',
        routerLink: 'validate'
    }
    ];
    static allMenuItems = [{
        label: 'Individual',
        routerLink: 'individual'
    },
    {
        label: 'Phenotypic Feature(s)',
        routerLink: 'phenotypic-features'
    },
    {
        label: 'Measurement(s)',
        routerLink: 'measurements'
    },
    {
        label: 'Biosample(s)',
        routerLink: 'biosamples'
    },
    {
        label: 'Disease diagnoses',
        routerLink: 'diseases'
    },
    {
        label: 'Interpretation(s)',
        routerLink: 'interpretations'
    },
    {
        label: 'Medical Action(s)',
        routerLink: 'medical-actions'
    },
    {
        label: 'File(s)',
        routerLink: 'files'
    },
    {
        label: 'Validate',
        routerLink: 'validate'
    }
    ];
    static profileSelectionOptions = [
        {
            label: 'Rare disease', value: ProfileSelection.RARE_DISEASE, path: 'rare', steps: Profile.rareMenuItems
        },
        {
            label: 'All available steps', value: ProfileSelection.ALL_AVAILABLE, path: 'all', steps: Profile.allMenuItems
        }
    ];
}
