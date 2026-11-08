#!/usr/bin/env bash
# A quick check that a deployed copy of the site works: pages, search, downloads, redirects, the 404,
# the security headers, and example email addresses left as written. The "Deployed version" workflow runs
# it after each deploy of main against that exact version's address on workers.dev, with the Cloudflare
# Access service token in CF_ACCESS_CLIENT_ID and CF_ACCESS_CLIENT_SECRET. Also handy by hand:
#
#   bash scripts/smoke-test.sh https://mkto-ref.harrisonjennings.au   # from a home network: Bot Fight
#                                                                      # Mode challenges data centres
#   bash scripts/smoke-test.sh http://127.0.0.1:4329                   # node web/tests/e2e/serve.mjs
set -uo pipefail

base="${1:?usage: smoke-test.sh <base URL>}"
base="${base%/}"
failures=0

auth=()
if [ -n "${CF_ACCESS_CLIENT_ID:-}" ] && [ -n "${CF_ACCESS_CLIENT_SECRET:-}" ]; then
  auth=(-H "CF-Access-Client-Id: $CF_ACCESS_CLIENT_ID" -H "CF-Access-Client-Secret: $CF_ACCESS_CLIENT_SECRET")
fi
# A browser's Accept header, so Cloudflare treats the request as a page view.
get() { curl -s --max-time 20 -H 'Accept: text/html,*/*;q=0.8' ${auth[@]+"${auth[@]}"} "$@"; }

check() {
  local name=$1
  shift
  if "$@"; then
    echo "✓ $name"
  else
    echo "✗ $name"
    failures=$((failures + 1))
  fi
}
status() { get -o /dev/null -w '%{http_code}' "$base$1"; }
location() { get -o /dev/null -w '%{redirect_url}' "$base$1"; }
has() { grep -q -- "$1" <<<"$2"; }

operation=/reference/core/usage/get-daily-usage/
home=$(get "$base/")
page=$(get "$base$operation")
headers=$(get -D - -o /dev/null "$base/" | tr -d '\r' | tr '[:upper:]' '[:lower:]')
robots=$(get "$base/robots.txt")

check 'home page answers 200' [ "$(status /)" = 200 ]
check 'home page carries the disclaimer' has 'NOT AUTHORIZED, ENDORSED OR SPONSORED BY ADOBE' "$home"
check 'an operation page answers 200' [ "$(status "$operation")" = 200 ]
check 'and has its Request Builder' has 'data-request-builder' "$page"
check 'example email addresses are left as written' has 'person@example.com' "$page"
check 'and not obfuscated by Cloudflare' bash -c '! grep -q "__cf_email__" <<<"$1"' _ "$page"
check 'the search page answers 200' [ "$(status /search/)" = 200 ]
check 'the search index answers 200' [ "$(status /pagefind/pagefind.js)" = 200 ]
check 'the Postman collection downloads' [ "$(status /downloads/marketo-engage.postman_collection.json)" = 200 ]
check 'a page without its trailing slash redirects' [ "$(status /reference)" = 307 ]
check 'to the address with it' [ "$(location /reference)" = "$base/reference/" ]
check 'an unknown page answers 404' [ "$(status /this-page-does-not-exist/)" = 404 ]
check 'Content-Security-Policy header' has 'content-security-policy:' "$headers"
check 'which allows no other hosts to connect' has "connect-src 'self';" "$headers"
check 'HSTS header' has 'strict-transport-security:' "$headers"
check 'nosniff header' has 'x-content-type-options: nosniff' "$headers"
check 'frame header' has 'x-frame-options: deny' "$headers"
check 'robots.txt names the sitemap' has 'Sitemap: https://mkto-ref.harrisonjennings.au/sitemap.xml' "$robots"
check 'the sitemap answers 200' [ "$(status /sitemap.xml)" = 200 ]

if [ "$failures" -gt 0 ]; then
  echo "$failures check(s) failed at $base"
  exit 1
fi
echo "All checks passed at $base"
