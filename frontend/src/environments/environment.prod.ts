const API_URL = 'http://localhost:8080';

export const environment = {
  production: true,
  MESSAGE_URL: API_URL + '/message',
  PHENOPACKETLAB_PHENOTYPIC_FEATURE_URL: API_URL + '/phenotypic-features',
  PHENOPACKETLAB_DISEASE_URL: API_URL + '/diseases',
  HPO_DISEASE_URL: 'https://api.monarchinitiative.org/api/bioentity/disease/'
};
