# Design

The design is called Console: a developer tool's dark, dense layout with one lime accent. Tokens are defined
at the top of `web/src/styles/site.css`, and everything else reads them.

## Colour

| Role | Dark | Light |
|---|---|---|
| Ground | `#0B0D10` | `#F5F6F8` |
| Surface | `#12151A` | `#FFFFFF` |
| Raised | `#1A1E25` | `#E9ECF0` |
| Line (decorative) | `#232830` | `#D7DBE2` |
| Control border | `#6B7482` | `#7A8391` |
| Text | `#E6E9EE` | `#14171C` |
| Bright | `#FFFFFF` | `#0B0D10` |
| Secondary | `#C9CFD8` | `#39414D` |
| Muted | `#98A1AE` | `#596270` |
| Accent | `#B8F34A` | `#3C6600` |
| Amber (required, warnings) | `#F2B66D` | `#8A4A00` |
| Delete | `#FF9D92` | `#B3261E` |

The accent fill is `#B8F34A` with `#0B0D10` text in both themes.

## Type

[Geist and Geist Mono](https://vercel.com/font), self-hosted from `web/public/fonts/`. There are no requests
to font services.

## Logo

Single braces around a slash, on a lime tile: `web/public/assets/images/favicon.svg`.

## Rules

- Text meets 4.5:1 contrast, in both themes.
- Targets are at least 44px, and focus is always visible.
- Colour is never the only signal: required fields say "required", and HTTP methods are written out.
- The footer is always last, and always carries Adobe's disclaimer, word for word.
- The site uses no Adobe branding.
- Don't change the builder's promise: nothing is sent to Marketo, and no credentials are requested or stored.

## README images

`docs/images/` is drawn by `web/scripts/readme/`. After a visible change, run `npm run build` and
`npm run readme:images` in `web/`, then commit the results.
