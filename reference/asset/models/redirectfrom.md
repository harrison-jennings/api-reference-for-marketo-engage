# RedirectFrom

**Type:** `object`

JSON representation of 'from' redirect landing page rule

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `type` | string | Yes | Type of redirect landing page | enum: landingPageId, path |
| `value` | string | Yes | Value for redirect landing page. If type is 'path' this must not begin with forward slash |  |

## Generated example

```json
{
  "type": "landingPageId",
  "value": "string"
}
```

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
