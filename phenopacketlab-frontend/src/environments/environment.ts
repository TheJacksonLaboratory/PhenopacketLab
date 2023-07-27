// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const URL = 'http://localhost:8080';
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
  BODY_SITE_URL: `${API_URL}/medical-actions/bodysites`,
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
  MEDICAL_ACTION_ADVERSE_EVENTS_URL: `${API_URL}/medical-actions/adverse-events`,
  ROUTE_OF_ADMINISTRATION_URL: `${API_URL}/constants/tree-route-administration`,
  METADATA_URL: `${API_URL}/metadata`,
  RESOURCE_URL: `${API_URL}/resource`,
  USER_URL: `${API_URL}/user`,
  AUTH: {
    domain: 'thejacksonlaboratory.auth0.com',
    clientId: 'oEZ1oN01Ts2wuW3MzTSxq3h6PcnN10Y5',
    authorizationParams: {
      redirect_uri: window.location.origin
    },

    httpInterceptor: {
      allowedList: [
        {
          uri: `${API_URL}/user/*`,
          tokenOptions: {
            authorizationParams: {
              // The attached token should target this audience
              audience: `https://phenopacketlab.jax.org`
            }
          }
        }
      ]
    }

  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
