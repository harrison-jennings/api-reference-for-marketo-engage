---
description: About this independent API reference for Marketo Engage, generated from Adobe's specifications.
---

# About

This is an independent reference for the Adobe Marketo Engage APIs. It is not an official Adobe
product. For authoritative documentation, see
[Adobe's Marketo Engage developer documentation](https://developer.adobe.com/marketo-apis/).

**THIS SITE IS NOT AUTHORIZED, ENDORSED OR SPONSORED BY ADOBE, PUBLISHER OF ADOBE MARKETO ENGAGE.**
Adobe, Marketo and Marketo Engage are either registered trademarks or trademarks of Adobe in the
United States and/or other countries.

## Sources

The reference is generated from Adobe's published specifications in
[AdobeDocs/marketo-apis](https://github.com/AdobeDocs/marketo-apis), the source of Adobe's own
developer documentation. The specifications are © Adobe and licensed under the Apache License 2.0;
see [Notices](notices.md). Use of the APIs is subject to Adobe's
[API License Agreement](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/api-license).

## Source code

The site, generator and specifications are on GitHub at
[harrison-jennings/api-reference-for-marketo-engage](https://github.com/harrison-jennings/api-reference-for-marketo-engage),
licensed under the Apache License 2.0.

## How the site is built

The reference is generated from Adobe's specifications, and the site is built as static files with
[MkDocs](https://www.mkdocs.org/) and [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/).
There is no CMS, database, search service or backend.

1. A generator turns each specification into Markdown reference pages, a machine-readable
   `*.operation.json` file per operation, and an operation manifest.
2. The site build publishes that reference as-is, and generates the navigation, API summaries and
   Request Builder index from the manifest.

## Request Builder

The Request Builder reads each operation's `*.operation.json` file and builds its form from the
parameters, request body and responses defined there. One generic component handles every
operation, in both Swagger 2.0 and OpenAPI 3.0 formats.

- **Mock mode only.** It constructs requests and synthetic responses in your browser and never sends
  a request. The site's Content Security Policy restricts network access to the site's own files.
- **No credentials.** It never asks for a Client ID, Client Secret or access token, and code samples
  only contain placeholders.
- **Nothing stored.** The base URL you enter is not saved. Only your preferred code-sample language
  is remembered, in your browser's local storage.

## Privacy

The site has no analytics, cookies, third-party scripts or web fonts from external services.
