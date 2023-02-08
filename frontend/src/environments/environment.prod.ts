const API_URL = 'http://34.23.1.146:8080/api/v1';

export const environment = {
  production: true,
  MESSAGE_URL: `${API_URL}/message`,
  PHENOPACKETLAB_PHENOTYPIC_FEATURE_URL: `${API_URL}/phenotypic-features`,
  PHENOPACKETLAB_DISEASE_URL: `${API_URL}/diseases`,
  PHENOPACKETLAB_BODY_SITE_URL: `${API_URL}/medical-actions/bodysites`,
  PHENO_VALIDATE_URL: `${API_URL}/validate`,
  SEX_URL: `${API_URL}/constants/sex`,
  GENDER_URL: `${API_URL}/constants/gender`,
  SEVERITY_URL: `${API_URL}/constants/severity`,
  LATERALITY_URL: `${API_URL}/constants/laterality`,
  MODIFIERS_URL: `${API_URL}/constants/treemodifier`,
  MONDO_DISEASES_URL: `${API_URL}/mondo-diseases`,
  ONSETS_URL: `${API_URL}/constants/treeonset`,
  TNM_FINDINGS_URL: `${API_URL}/tnm-findings`,
  HPO_DISEASE_URL: `${API_URL}/diseases`,
  TEXT_MINING_URL: `${API_URL}/textminer`
};
