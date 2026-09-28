# LandingPageRedirectRule

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int64) | Yes | Internal id for landing page redirect rule |  |
| `redirectFromUrl` | string | Yes | Redirect 'from' URL of the Landing Page. Combination of the hostname and redirectFrom landing page or path |  |
| `redirectToUrl` | string | Yes | Redirect 'to' URL of the Landing Page. Could be a Marketo landing page or non-Marketo URL. |  |
| `hostname` | string | Yes | The hostname for the landing pages. Branding domain or alias. Max 255 characters. |  |
| `redirectFrom` | [`RedirectFrom`](./redirectfrom.md) | Yes | JSON representation of redirect from landing page, with members 'type' which may be 'landingPageId' or 'path', and 'value' |  |
| `redirectTo` | [`RedirectTo`](./redirectto.md) | Yes | JSON representation of redirect to landing page, with members 'type' which may be 'landingPageId' or 'url', and 'value' |  |
| `createdAt` | string (date-time) | Yes | Datetime the landing page redirect rule was created |  |
| `updatedAt` | string (date-time) | Yes | Datetime the landing page redirect rule was most recently updated |  |

## Generated example

```json
{
  "id": 123,
  "redirectFromUrl": "https://example.com",
  "redirectToUrl": "https://example.com",
  "hostname": "Example name",
  "redirectFrom": {
    "type": "landingPageId",
    "value": "string"
  },
  "redirectTo": {
    "type": "landingPageId",
    "value": "string"
  },
  "createdAt": "2026-01-15T10:30:00Z",
  "updatedAt": "2026-01-15T10:30:00Z"
}
```

## Referenced models

- [`RedirectFrom`](./redirectfrom.md)
- [`RedirectTo`](./redirectto.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
