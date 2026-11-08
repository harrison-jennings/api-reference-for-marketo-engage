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

## Cloudflare Workers, not GitHub Pages

The site moved from GitHub Pages to Cloudflare Workers static assets in November 2026, for real response
headers (the CSP as a header, with `frame-ancestors`, HSTS and the rest), Web Analytics and a preview of
every branch. There's no Worker script, so every request is a free static asset request.

- **Workers Builds deploys.** Cloudflare builds every push: `main` to production, other branches to
  previews behind Cloudflare Access. The `main` ruleset is the gate: changes arrive by pull request,
  squash-merged, and "Build and validate" must pass on a branch that's up to date with `main`, so what
  deploys is what was tested. Deploying from GitHub Actions with Wrangler would ship the exact tested
  files and test before going live, but needs an account-wide Cloudflare API token in GitHub.
- **Bot Fight Mode** is on for the whole `harrisonjennings.au` zone and can't be exempted on the free plan.
  Nothing calls the live site from a data centre: CI tests the build, and the smoke test uses the deployed
  version's `workers.dev` address. Its injected scripts are refused by the CSP, which is harmless.
- **Zone settings.** Email Address Obfuscation doesn't apply to Workers static assets, and a configuration
  rule turns it off for this hostname in case that changes, so example addresses stay as written. AI
  training crawlers get a 403 across the zone, and Cloudflare adds its managed block to `robots.txt`.
- **URLs are unchanged.** A missing trailing slash redirects with a 307 rather than Pages' 301, and
  `/…/index.html` redirects to `/…/`. Canonical links and the sitemap use the trailing-slash URLs.
- **A route, not a Custom Domain.** A Workers Route serves `mkto-ref.harrisonjennings.au`. A Custom Domain
  needs the DNS record deleted first, which leaves the name unresolvable for a while.

## Cookieless analytics

Cloudflare Web Analytics counts visits without cookies or local storage. Cloudflare adds its beacon to each
page, the CSP allows its script, and it reports to `/cdn-cgi/rum` on this site, so `connect-src` stays
`'self'` and the Request Builder still can't send anything elsewhere. Previews on `workers.dev` aren't
counted.
