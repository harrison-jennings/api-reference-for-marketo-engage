# ObjectDependentAsset

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `assetType` | string | Yes | Type of asset |  |
| `assetId` | integer (int32) | Yes | ID of asset |  |
| `assetName` | string | Yes | Name of asset |  |
| `usedFields` | array of string | No | List of associated fields |  |

## Generated example

```json
{
  "assetType": "string",
  "assetId": 123,
  "assetName": "Example name",
  "usedFields": [
    "string"
  ]
}
```

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
