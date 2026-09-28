# CloneAssetRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `assetId` | string | Yes |  |  |
| `newAsset` | [`CloneNewAsset`](./clonenewasset.md) | Yes |  |  |

## Generated example

```json
{
  "assetId": "123",
  "newAsset": {
    "name": "Example name",
    "description": "string"
  }
}
```

## Referenced models

- [`CloneNewAsset`](./clonenewasset.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
