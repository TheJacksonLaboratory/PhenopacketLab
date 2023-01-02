const API_URL = 'http://localhost:8080';

export const environment = {
  production: false,
  MESSAGE_URL: `${API_URL}/message`,
  PHENOPACKETLAB_PHENOTYPIC_FEATURE_URL: `${API_URL}/phenotypic-features`,
  PHENOPACKETLAB_DISEASE_URL: `${API_URL}/diseases`,
  PHENOPACKETLAB_BODY_SITE_URL: `${API_URL}/medical-actions/bodysites`,
  PHENO_VALIDATE_URL: `${API_URL}/validate`,
  MODIFIERS_URL: `${API_URL}/modifiers`,
  MONDO_DISEASES_URL: `${API_URL}/mondo-diseases`,
  ONSETS_URL: `${API_URL}/onsets`,
  TNM_FINDINGS_URL: `${API_URL}/tnm-findings`,
  HPO_DISEASE_URL: `${API_URL}/diseases`,
  TEXT_MINING_URL: `${API_URL}/text-miner`
};
