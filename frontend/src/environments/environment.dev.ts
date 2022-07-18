const API_URL = 'http://localhost:8080';

export const environment = {
  production: false,
  MESSAGE_URL: `${API_URL}/message`,
  PHENOPACKETLAB_PHENOTYPIC_FEATURE_URL: `${API_URL}/phenotypic-features`,
  PHENOPACKETLAB_DISEASE_URL: `${API_URL}/diseases`,
  PHENOPACKETLAB_BODY_SITE_URL: `${API_URL}/medical-actions/bodysites`,
  HPO_DISEASE_URL: `${API_URL}/diseases`
};