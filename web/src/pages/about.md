---
layout: ../layouts/Prose.astro
title: "About"
description: "About this independent API reference for Marketo Engage, generated from Adobe's specifications."
where: About
---


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
see [Notices](/notices/). Use of the APIs is subject to Adobe's
[API License Agreement](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/api-license).

## Who made this

Built and maintained by [Harrison Jennings](https://www.harrisonjennings.au/) as an independent
project.

## Source code

The site, generator and specifications are on GitHub at
[harrison-jennings/api-reference-for-marketo-engage](https://github.com/harrison-jennings/api-reference-for-marketo-engage),
licensed under the Apache License 2.0.

## How the site is built

The reference is generated from Adobe's specifications, and the site is built as static files with
[Astro](https://astro.build/), with search from [Pagefind](https://pagefind.app/).
There is no CMS, database, search service or backend.

1. A generator turns each specification into Markdown reference pages, a machine-readable
   `*.operation.json` file per operation, and an operation manifest.
2. The site build turns that output into pages, and generates the navigation, search indexes and
   Request Builder index from the manifest.

## Request Builder

The Request Builder reads each operation's `*.operation.json` file and builds its form from the
parameters, request body and responses defined there. One generic component handles every
operation, in both Swagger 2.0 and OpenAPI 3.0 formats.

- **Mock mode only.** It constructs requests and synthetic responses in your browser and never sends
  a request. The site's Content Security Policy restricts network access to the site's own files.
- **No credentials.** It never asks for a Client ID, Client Secret or access token, and code samples
  only contain placeholders.
- **Nothing sensitive stored.** The base URL you enter is not saved. Your browser's local storage only
  remembers your theme, pane layout and preferred code-sample language.

## Privacy

The site uses [Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/) to count visits. It
doesn't use cookies or local storage, and doesn't track you across sites. Its script loads from Cloudflare
and reports to this site. There are no other analytics, no cookies and no web fonts from external
services.
