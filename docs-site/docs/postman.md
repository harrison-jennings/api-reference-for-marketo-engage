---
description: Download an unofficial Postman collection with every Marketo Engage API operation, and a credential-free environment template.
---

# Postman collection

An unofficial Postman collection with one request for every operation in this reference, generated
from the same Adobe specifications, and a credential-free environment template for your instance's
settings.

- [Download the collection](downloads/marketo-engage.postman_collection.json){: download="marketo-engage.postman_collection.json" }
  (Postman Collection Format v2.1)
- [Download the environment template](downloads/marketo-engage.postman_environment.json){: download="marketo-engage.postman_environment.json" }
  (instance settings and credentials blank; Adobe's public Data Ingestion API host preconfigured)

## Get started

1. In Postman, select **Import** and import both files.
2. Select the **Marketo Engage (template)** environment and set `marketoBaseUrl` (your REST API endpoint,
   such as `https://<your-instance>.mktorest.com`, without `/rest`), `clientId` and `clientSecret`.
   For the Data Ingestion API, also set `munchkinId`. Enter them as current values so that they stay
   on your device.
3. Send **Identity API › Identity › GET · Identity**. Its post-response script saves the access token
   and its expiry time in the selected environment.
4. Open any other request, fill in its parameters and body, and send it. When the token expires, send
   the Identity request again.

## What to expect

- **Requests run only when you send them.** The only script saves the token from the Identity
  requests. Nothing refreshes tokens, retries, chains requests or fetches more pages for you.
- **Native Postman requests.** Path variables, query parameters, headers and form fields carry the
  specification's descriptions. Optional parameters are disabled until you enable them.
- **Minimal bodies.** JSON bodies contain only the required properties, with `null` where you supply a
  value. Each request's description lists every documented property and links to its page here.
- **Manual paging.** Request descriptions explain paging parameters such as `nextPageToken` and
  `offset`; you send each page yourself.

!!! warning "Some requests change or delete data"

    The collection includes every operation, including those that create, update, delete, send or
    trigger things; their descriptions say so. Don't run the whole collection with the Collection
    Runner. Use an API user with only the permissions you need, and a sandbox instance when testing.

The [collection's README](https://github.com/harrison-jennings/api-reference-for-marketo-engage/blob/main/postman/README.md)
covers credential storage, how each part of a request is generated, and known limitations.

The collection is not authorised, endorsed or sponsored by Adobe. It is generated from Adobe's
specifications, licensed under the Apache License 2.0; see [Notices](notices.md).
