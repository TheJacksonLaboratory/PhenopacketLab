const URL = 'https://phenopacketlab-dev.jax.org';
const API_URL = 'https://phenopacketlab-dev.jax.org/api/v1';

export const environment = {
  production: false,
  API_DOC: `${URL}/swagger-ui/index.html`,
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
  TNM_TUMOR_URL: `${API_URL}/constants/tree-tnm-tumor`,
  TNM_NODE_URL: `${API_URL}/constants/tree-tnm-node`,
  TNM_METASTASIS_URL: `${API_URL}/constants/tree-tnm-metastasis`,
  DISEASE_STAGES_URL: `${API_URL}/constants/tree-disease-stages`,
  HPO_DISEASE_URL: `${API_URL}/diseases`,
  TEXT_MINING_URL: `${API_URL}/textminer`,
  FUNCTIONAL_ANNOTATION_URL: `${API_URL}/functional-annotation`,
  ALLELIC_STATE_URL: `${API_URL}/constants/tree-allelic-states`,
  STRUCTURAL_TYPE_URL: `${API_URL}/constants/tree-structural`,
  MEDICAL_ACTION_TREATMENT_INTENTS_URL: `${API_URL}/medical-actions/treatment-intents`,
  MEDICAL_ACTION_TREATMENT_RESPONSES_URL: `${API_URL}/medical-actions/treatment-responses`,
  MEDICAL_ACTION_TERMINATION_REASONS_URL: `${API_URL}/medical-actions/termination-reasons`,
  MEDICAL_ACTION_ADVERSE_EVENTS_URL: `${API_URL}/medical-actions/adverse-events`
};
