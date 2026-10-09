/**
 * The blank Postman environment template: tenant and credential settings only.
 *
 * Every value is empty except the Data Ingestion API host, which the source
 * specification declares (servers[0].url) and which is the same for every
 * subscription. The file uses Postman's environment export format.
 */

import { stableId, VARIABLES } from "./collection.mjs";
import { EXPIRY_VARIABLE } from "./identity-script.mjs";

export const ENVIRONMENT_NAME = "Marketo Engage (template)";

/** What each variable holds; documented in postman/README.md and checked by the tests. */
export const ENVIRONMENT_VARIABLES = [
  { key: VARIABLES.marketoBaseUrl, type: "default", meaning: "REST API endpoint origin, including https:// and without /rest or /identity" },
  { key: VARIABLES.ingestionBaseUrl, type: "default", meaning: "Data Ingestion API host, from the source specification" },
  { key: VARIABLES.munchkinId, type: "default", meaning: "Munchkin ID (subscription identifier), used in Data Ingestion API paths" },
  { key: VARIABLES.clientId, type: "default", meaning: "Client ID of a Marketo custom service" },
  { key: VARIABLES.clientSecret, type: "secret", meaning: "Client Secret of a Marketo custom service" },
  { key: VARIABLES.accessToken, type: "secret", meaning: "Access token, saved by the Identity request's post-response script or entered manually" },
  { key: EXPIRY_VARIABLE, type: "default", meaning: "When the access token expires, in epoch milliseconds; informational only" },
];

export function buildEnvironment({ ingestionBaseUrl }) {
  if (!/^https:\/\/[^/]+$/.test(ingestionBaseUrl || "")) {
    throw new Error(`Expected the Data Ingestion API host as an https origin, got ${ingestionBaseUrl}`);
  }
  return {
    id: stableId("environment"),
    name: ENVIRONMENT_NAME,
    values: ENVIRONMENT_VARIABLES.map(({ key, type }) => ({
      key,
      value: key === VARIABLES.ingestionBaseUrl ? ingestionBaseUrl : "",
      type,
      enabled: true,
    })),
    _postman_variable_scope: "environment",
  };
}
