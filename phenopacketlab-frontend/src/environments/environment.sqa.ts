const URL = 'https://phenopacketlab-sqa.jax.org';
const API_URL = `${URL}/api`;

export const environment = {
  production: false,
  API_DOC: `${URL}/swagger-ui/index.html`,
  MESSAGE_URL: `${API_URL}/message`,
  PHENOTYPIC_FEATURE_URL: `${API_URL}/phenotypic-features`,
  PHENOTYPIC_FEATURE_ALL_URL: `${API_URL}/phenotypic-features/all`,
  PHENOTYPIC_FEATURE_SEARCH_URL: `${API_URL}/phenotypic-features/search`,
  DISEASE_URL: `${API_URL}/diseases`,
  DISEASE_ALL_URL: `${API_URL}/diseases/all`,
  DISEASE_SEARCH_URL: `${API_URL}/diseases/search`,
  BODY_SITE_URL: `${API_URL}/constants/tree-body-site`,
  PHENO_VALIDATE_URL: `${API_URL}/validate`,
  SEX_URL: `${API_URL}/constants/sex`,
  GENDER_URL: `${API_URL}/constants/gender`,
  SEVERITY_URL: `${API_URL}/constants/severity`,
  LATERALITY_URL: `${API_URL}/constants/laterality`,
  MODIFIERS_URL: `${API_URL}/constants/treemodifier`,
  EVIDENCES_URL: `${API_URL}/constants/evidence`,
  MONDO_DISEASES_URL: `${API_URL}/mondo-diseases`,
  ONSETS_URL: `${API_URL}/constants/treeonset`,
  TNM_TUMOR_URL: `${API_URL}/constants/tree-tnm-tumor`,
  TNM_NODE_URL: `${API_URL}/constants/tree-tnm-node`,
  TNM_METASTASIS_URL: `${API_URL}/constants/tree-tnm-metastasis`,
  DISEASE_STAGES_URL: `${API_URL}/constants/tree-disease-stages`,
  TEXT_MINING_URL: `${API_URL}/textminer`,
  FUNCTIONAL_ANNOTATION_URL: `${API_URL}/functional-annotation`,
  ALLELIC_STATE_SHORT_URL: `${API_URL}/constants/allelic-states`,
  ALLELIC_STATE_URL: `${API_URL}/constants/tree-allelic-states`,
  STRUCTURAL_TYPE_URL: `${API_URL}/constants/tree-structural`,
  MEDICAL_ACTION_TREATMENT_INTENTS_URL: `${API_URL}/medical-actions/treatment-intents`,
  MEDICAL_ACTION_TREATMENT_RESPONSES_URL: `${API_URL}/medical-actions/treatment-responses`,
  MEDICAL_ACTION_TERMINATION_REASONS_URL: `${API_URL}/medical-actions/termination-reasons`,
  ROUTE_OF_ADMINISTRATION_URL: `${API_URL}/constants/tree-route-administration`,
  SCHEDULE_FREQUENCY_URL: `${API_URL}/constants/tree-schedule-frequency`,
  ADVERSE_EVENT_URL: `${API_URL}/constants/tree-adverse-event`,
  CHEMICAL_ENTITY_URL: `${API_URL}/chemical-entities`,
  CHEMICAL_ENTITY_SEARCH_URL: `${API_URL}/chemical-entities/search`,
  USER_URL: `${API_URL}/user`,
  AUTH: {
    domain: 'thejacksonlaboratory.auth0.com',
    clientId: 'oEZ1oN01Ts2wuW3MzTSxq3h6PcnN10Y5',
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: `https://phenopacketlab.jax.org`
    },
    httpInterceptor: {
      allowedList: [
        {
          uri: `${API_URL}/user/*`,
          tokenOptions: {
            authorizationParams: {
              audience: `https://phenopacketlab.jax.org`
            }
          }
        }
      ]
    }
  },
  METADATA_URL: `${API_URL}/metadata`,
  RESOURCE_URL: `${API_URL}/resource`
};
