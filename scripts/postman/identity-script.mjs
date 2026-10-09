/**
 * The collection's only embedded script: a post-response handler for the
 * Identity access-token requests.
 *
 * It runs only after someone sends an Identity request, and only copies
 * access_token and the calculated expiry time into the selected environment.
 * It never sends a request, never schedules work and never logs credentials.
 * Every Identity item uses the same generated source, and the tests run it
 * against a mocked Postman runtime.
 */

export const TOKEN_VARIABLE = "accessToken";
export const EXPIRY_VARIABLE = "accessTokenExpiresAt";

/** Lines of the post-response script, in Postman's `exec` form. */
export function identityTokenScriptLines() {
  return [
    "// Saves access_token and its expiry to the selected environment after you send this request.",
    "// It sends no requests and changes no other variables. Send this request again when the token expires.",
    "(function saveAccessToken() {",
    '  var notSaved = "Access token not saved: ";',
    "  if (pm.response.code < 200 || pm.response.code > 299) {",
    '    console.warn(notSaved + "the response status was " + pm.response.code + ".");',
    "    return;",
    "  }",
    "  var body;",
    "  try {",
    "    body = pm.response.json();",
    "  } catch (error) {",
    '    console.warn(notSaved + "the response is not JSON.");',
    "    return;",
    "  }",
    '  if (!body || typeof body !== "object" || body.success === false) {',
    '    console.warn(notSaved + "the response reports an error.");',
    "    return;",
    "  }",
    '  if (typeof body.access_token !== "string" || body.access_token === "") {',
    '    console.warn(notSaved + "the response has no access_token.");',
    "    return;",
    "  }",
    '  if (typeof body.expires_in !== "number" || !isFinite(body.expires_in) || body.expires_in <= 0) {',
    '    console.warn(notSaved + "the response has no valid expires_in.");',
    "    return;",
    "  }",
    "  if (!pm.environment || !pm.environment.name) {",
    '    console.warn(notSaved + "select an environment, then send this request again.");',
    "    return;",
    "  }",
    "  var expiresAt = Date.now() + body.expires_in * 1000;",
    "  try {",
    `    pm.environment.set("${TOKEN_VARIABLE}", body.access_token);`,
    `    pm.environment.set("${EXPIRY_VARIABLE}", String(expiresAt));`,
    "  } catch (error) {",
    '    console.warn(notSaved + "the environment could not be updated.");',
    "    return;",
    "  }",
    '  console.log("Access token saved to the " + pm.environment.name + " environment. It expires at " + new Date(expiresAt).toISOString() + ".");',
    "})();",
  ];
}

/** A Postman v2.1 post-response event ("test" is the v2.1 name for post-response scripts). */
export function identityTokenEvent() {
  return {
    listen: "test",
    script: {
      type: "text/javascript",
      exec: identityTokenScriptLines(),
    },
  };
}
