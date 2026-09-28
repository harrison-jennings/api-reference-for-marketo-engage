# RedirectTo

**Type:** `object`

JSON representation of 'to' redirect landing page rule

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `type` | string | Yes | Type of redirect landing page | enum: landingPageId, url |
| `value` | string | Yes | Value for redirect landing page |  |

## Generated example

```json
{
  "type": "landingPageId",
  "value": "string"
}
```

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
