---
description: An independent, searchable reference for the Adobe Marketo Engage APIs, with a request builder and mock response generator that run entirely in your browser.
hide:
  - navigation
  - toc
---

# API Reference for Marketo Engage

An independent reference for the Adobe Marketo Engage APIs, generated from Adobe's published
Swagger and OpenAPI specifications.

<!-- generated:stats -->

<div class="home-actions" markdown>

[Browse the API reference](reference/README.md){ .md-button .md-button--primary }
[Open the Request Playground](playground.md){ .md-button }
[Find an operation](search.md){ .md-button }

</div>

## API families

<!-- generated:api-sections -->

## What this site is

- **A reference.** Every operation page documents its method, path, parameters, request body,
  responses and the models it uses. The pages are generated from the source specifications, so
  they stay consistent with them.
- **A request builder.** Every operation page includes a form that constructs a request from the
  operation's specification and turns it into cURL, JavaScript and Python.
- **A mock tester.** Generate a synthetic response for any documented status code, built from the
  response schema.

It is **not an SDK**, and it is **not an official Adobe product**. For authoritative guidance, see
[Adobe's Marketo Engage developer documentation](https://developer.adobe.com/marketo-apis/).

## Browse the reference

The [API Reference](reference/README.md) is organised by API, then by endpoint group, then by
operation. Each API also has a [model index](models/index.md) of shared request and response schemas.

Use the search box in the header to search operation titles, operation IDs such as
`getLeadByIdUsingGET`, endpoint paths such as `/rest/v1/leads.json`, parameter names and model
names. The [operation finder](search.md) matches exact operation IDs and paths as you type.

## Build a request

On any operation page, or in the [Request Playground](playground.md):

1. Optionally enter your instance's base URL, for example `https://123-ABC-456.mktorest.com`.
   It is not saved.
2. Fill in path, query, header and body fields. Controls come from the specification: enumerations
   become drop-downs, integers are checked, and required fields are marked.
3. Select **Generate Request** to check the values against the schema, then copy the URL or a
   code sample.

Code samples use placeholders such as `<ACCESS_TOKEN>` and `<MARKETO_BASE_URL>`. The site never asks
for a Client ID, Client Secret or access token.

## Mock responses

Choose a documented status code and select **Generate Mock Response**. Where the specification
includes an example, it is used as-is. Otherwise a response is built from the schema with
predictable values (`1234` for IDs, `2026-01-15T10:30:00Z` for timestamps), so the same request
always produces the same mock.

Successful mocks also follow how the Marketo API responds to *your* request:

- **Reads** return the record you looked up, one record per `filterValues` value, and the fields
  you request in `fields` (including custom fields), or the documented default fields.
- **Writes** return one result per `input` record, with `id`, `seq` and a status such as
  `created`, `updated`, `deleted`, `added` or `removed`.
- **Asset API** creates, updates and clones return the asset with the values you submitted.
- **Bulk jobs** return the job with its status, for example `Queued` after enqueueing.
- Response-only properties such as `reasons` are left out of successful results.

The mock updates as you change the request.

!!! info "Nothing is sent to Marketo"

    Requests and mock responses are created in your browser. No request is sent to Marketo or any
    other service, and the site's Content Security Policy only allows it to load its own files.
