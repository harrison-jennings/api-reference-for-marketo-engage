# Decisions

Why things are the way they are. Measurements were taken during the migration from MkDocs in
November 2026.

## Plain Astro with Pagefind, not MkDocs or Starlight

The site started on MkDocs with Material. Material's support ends on 5 May 2027, and it isn't compatible
with MkDocs 2.0, so staying meant a move sooner or later. The new design also needed full control of the layout.

Plain Astro gives full control of the markup, renders to static files and needs no client framework.
Starlight was tried against all the pages, but it brings its own layout and navigation, which this design
replaces anyway.

| Measure | MkDocs | Astro |
|---|---|---|
| Search queries with the right page first (of 28) | 18 | 22 |
| Search queries with the right page in the top 15 (of 28) | 27 | 27 |
| Identity page, compressed | 7.6 KB | 5.0 KB |
| List Emails page, compressed | 10.4 KB | 13.7 KB |
| Build time | 3.9s | Under 5s |

The largest operation pages are a little heavier and small ones lighter. Lighthouse scores 97 to 100 for
performance on the pages sampled.

## Existing URLs stay the same

All 915 pages kept their URLs, and the site check fails if a reference page goes missing. Links people
have saved keep working, and search engines don't have to relearn anything.

## Mock mode only

The builder never sends a request and never asks for credentials. A tool that holds Marketo credentials in
a browser would be a much riskier thing to publish, and generating requests covers the need. The CSP
enforces this, and a browser test checks that no request leaves the site.

## Entered values stay out of links

A Playground link carries the operation, not what was typed. Values can include customer emails, IDs and
instance URLs, and URLs end up in history, logs and chat. If it's ever wanted, it should be a separate,
explicit "copy link with these values" action, using the URL fragment and leaving out the base URL.

## Fields and JSON are two views of one value

JSON stays the source of the request, so the Fields view can't change one by itself. A value that doesn't
fit its schema is kept as raw JSON rather than dropped, and properties the schema doesn't list are carried
through. Invalid JSON stays in JSON view, with a message.

## What search engines see

The site is indexable, with these exceptions:

- **The search page and 404 page** aren't useful as results.
- **`ResponseOf…` wrapper models** mostly repeat the model they wrap.
- **Models no operation uses** aren't the answer to anyone's question.

They still work for visitors and site search. Other small models stay indexable until Search Console shows
they aren't earning their place.

Titles use "… for Marketo Engage", as the site's own name does, so results don't read as Adobe's own
documentation.

## The name and the domain

The site calls itself API Reference for Marketo Engage. `mkto-ref` is only the domain. Adobe's required
disclaimer appears on every page, exactly as written in its trademark guidelines, and the site uses no
Adobe branding.

## Sentence case, a device theme and no Auto

Interface and reading text use sentence case, and names, code and trademarks stay exactly as written. The
theme follows the device on the first visit, then a Light or Dark choice is remembered.

## GitHub Pages

The site is static files, so Pages is enough. Cloudflare remains an option, but Bot Fight Mode would need
sorting out first.
