# Postman collection for Marketo Engage

An unofficial [Postman](https://www.postman.com/) collection with one request for every operation in
the Adobe Marketo Engage API specifications, and a blank environment template to go with it. Both are
generated from the same specifications as the rest of this repository.

> [!NOTE]
> THIS PROJECT IS NOT AUTHORIZED, ENDORSED OR SPONSORED BY ADOBE, PUBLISHER OF ADOBE MARKETO
> ENGAGE. Adobe, Marketo and Marketo Engage are either registered trademarks or trademarks of Adobe
> in the United States and/or other countries.

| File | What it is |
|---|---|
| [`marketo-engage.postman_collection.json`](marketo-engage.postman_collection.json) | The collection (Postman Collection Format v2.1): Identity, Asset, Core, User Management and Data Ingestion APIs |
| [`marketo-engage.postman_environment.json`](marketo-engage.postman_environment.json) | The environment template: tenant and credential settings, all blank |

Both files are also on the [documentation site](https://mkto-ref.harrisonjennings.au/postman/).

## Get started

1. In Postman, select **Import** and import both files.
2. Select the **Marketo Engage (template)** environment, then fill in its variables (see below). You can
   duplicate the environment first, for example one per Marketo instance.
3. Open **Identity API › Identity › GET · Identity** (or the POST version) and select **Send**. Its
   post-response script saves the access token in the selected environment.
4. Open any other request, fill in its parameters and body, and select **Send**.

When the token expires, send the Identity request again. Nothing renews it for you.

## Environment variables

| Variable | Default | What it holds |
|---|---|---|
| `marketoBaseUrl` | Blank | Your REST API endpoint origin, including `https://` but **without** `/rest` or `/identity`, for example `https://<your-instance>.mktorest.com`. In Marketo: **Admin › Integration › Web Services**. Identity, REST, Bulk and User Management requests all use it. |
| `ingestionBaseUrl` | `https://mkto-ingestion-api.adobe.io` | The Data Ingestion API host, as declared in Adobe's specification. It is the same for every subscription. |
| `munchkinId` | Blank | Your Munchkin ID (subscription identifier), used in Data Ingestion API paths. In Marketo: **Admin › Integration › Munchkin**. |
| `clientId` | Blank | The Client ID of a Marketo custom service (**Admin › Integration › LaunchPoint**). |
| `clientSecret` | Blank | The Client Secret of that custom service. Marked as a secret. |
| `accessToken` | Blank | The access token. The Identity requests save it here; you can also paste one in. Marked as a secret. |
| `accessTokenExpiresAt` | Blank | When the token expires, in epoch milliseconds (as text), saved with the token. For your information only: nothing reads it. |

### Keeping credentials safe

- Enter credentials as **current values**, not initial values. Initial values are shared with anyone
  who can see the environment in a shared workspace; current values stay on your device. See Postman's
  [environment variables](https://learning.postman.com/docs/use/send-requests/variables/environment-variables)
  documentation, and consider [Postman Vault](https://learning.postman.com/docs/sending-requests/postman-vault/postman-vault-secrets/)
  for secrets.
- The **secret** type only masks a value on screen. It doesn't encrypt it, and anyone who can edit the
  environment can reveal it.
- The Identity requests' script writes the token to the environment that is selected when you send
  them, as a current value. Choose which environment that is, and don't share or export environments
  that hold tokens or secrets.
- As Adobe documents, the Identity requests send `client_id` and `client_secret` in the URL query
  string. URLs can appear in Postman's history and console, and in proxy and server logs. Clear your
  history if needed, and don't share screenshots or console output that include them.
- Your organisation's Postman workspace and Vault policies apply. This collection doesn't change them.
- `.gitignore` excludes `*.local.postman_environment.json` and `*.private.postman_environment.json`:
  save filled-in environments under one of those names if you keep them in a clone of this repository.

## How the collection works

**Authentication.** Requests inherit a bearer token from `{{accessToken}}` on the collection's
**Authorization** tab, so the token is sent in the `Authorization` header. It is never added to URLs,
even where an Adobe specification lists an `access_token` query parameter. Data Ingestion requests
send it in the `X-Mkto-User-Token` header instead (API Key authorisation), and the Identity requests
use no authorisation.

**The one script.** The two Identity requests have a short post-response script. After you send one,
it checks that the response is a successful token response, then saves `access_token` to
`accessToken` and the calculated expiry time to `accessTokenExpiresAt`. It changes nothing else, never
sends requests, and never logs the token or your credentials. If the response isn't a valid token, or
no environment is selected, it leaves the stored values alone and explains why in the Postman
console. There are no other scripts: no pre-request scripts, no collection or folder scripts, and no
tests.

**Parameters.** Path variables, query parameters and headers are native Postman rows, with the
specification's description, type, allowed values, default and limits. Required parameters are
enabled; optional ones are disabled until you enable them, so empty values aren't sent by accident.
Where the specification gives a default, the row is pre-filled with it. Lists are entered as the
specification documents them: comma-separated in a single value for most Marketo parameters, or one
row per value where a parameter is repeated (the request description says which).

**Bodies.** Each request uses the body type the specification declares: raw JSON,
x-www-form-urlencoded or form-data.

- JSON bodies start with the **required** properties only. Where you must supply a value, it is
  `null`: replace it. If the specification gives no required structure, the body is `{}` or empty.
  The request description lists every documented property, including nested ones (written as
  `input[].email`), with links to the model pages on the documentation site.
- Bodies never contain sample records or IDs. Adobe's own request examples are shown on the linked
  reference pages instead.
- Some form fields take JSON text, such as `folder` (`{"id": …, "type": "Folder"}`): the request
  description lists their properties.
- File fields have no file selected; choose one in the **Body** tab.
- A few GET requests accept an optional JSON body. It starts empty; if you add one, Postman sends it.

**Pagination is manual.** Request descriptions explain each operation's paging parameters, such as
`nextPageToken`, `offset` and `maxReturn`, and any request you need to send first (for example **Get
Paging Token** before **Get Lead Activities**). Copy the token or offset from one response into the
next request yourself, or use Postman's **Set as variable** on a response value. The collection never
fetches further pages for you.

**Operations that change data.** The collection includes every operation, including those that
create, update, delete, approve, send, trigger, import or merge. Their descriptions start with a
**Changes data** note. Access is controlled only by the permissions of your Marketo API user.

> [!WARNING]
> Don't run the whole collection, or a whole folder, with the Collection Runner. The Runner sends
> every selected request in turn, including requests that delete or change data, and this collection
> contains nothing to stop it. Send requests one at a time, use an API user with only the permissions
> you need, and use a sandbox instance when trying requests that change data.

## Limitations

- Requests are generated from Adobe's specifications, which don't always match the live APIs.
  Descriptions are Adobe's, converted to Markdown; where a specification has no description, the
  collection says so rather than inventing one.
- Starter bodies are deliberately incomplete: most requests need IDs and other values from your own
  instance before they will succeed.
- Many Marketo paths end in a path variable followed by `.json`, such as `/email/:id.json`. Postman
  substitutes these since its runtime added support for path variables followed by a dot in 2022;
  older Postman versions may send `:id.json` unchanged.
- The collection was validated against the Postman Collection v2.1 schema and run with Postman's
  open-source runtime against a local test server. It has not been tested against a live Marketo
  instance.

## Keeping it up to date

The collection is generated by [`scripts/build_postman_collection.mjs`](../scripts/build_postman_collection.mjs)
from [`reference/`](../reference/), which is generated from Adobe's specifications in [`specs/`](../specs/).
Don't edit the JSON files by hand.

| Command | What it does |
|---|---|
| `make postman` | Regenerates both files from `reference/`, without network access |
| `make postman-check` | Checks that the committed files match a fresh build |
| `make postman-test` | Tests the committed files: schema, coverage, inputs, authentication, scripts, privacy and reproducibility |
| `make postman-summary` | Summarises how the collection differs from the last commit |

The weekly Adobe specification check regenerates the collection along with the reference, and its
draft pull request includes the collection changes for review.

## Licence

Generated from Adobe's Marketo Engage API specifications
([AdobeDocs/marketo-apis](https://github.com/AdobeDocs/marketo-apis)), © Adobe, licensed under the
Apache License 2.0. This project is licensed under the [Apache License 2.0](../LICENSE); see
[NOTICE](../NOTICE). Use of the Marketo APIs is subject to Adobe's
[API License Agreement](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/api-license).
