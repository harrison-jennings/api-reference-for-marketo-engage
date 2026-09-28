# CreateLandingPageRedirectRuleRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `hostname` | string | Yes | The hostname for the landing pages. Branding domain or alias. Max 255 characters |  |
| `redirectFrom` | [`RedirectFrom`](./redirectfrom.md) | Yes | JSON representation of redirect from landing page, with members 'type' which may be 'landingPageId' or 'path', and 'value' |  |
| `redirectTo` | [`RedirectTo`](./redirectto.md) | Yes | JSON representation of redirect to landing page, with members 'type' which may be 'landingPageId' or 'url', and 'value' |  |

## Generated example

```json
{
  "hostname": "Example name",
  "redirectFrom": {
    "type": "landingPageId",
    "value": "string"
  },
  "redirectTo": {
    "type": "landingPageId",
    "value": "string"
  }
}
```

## Referenced models

- [`RedirectFrom`](./redirectfrom.md)
- [`RedirectTo`](./redirectto.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
