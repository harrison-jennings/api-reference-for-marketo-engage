# TokenResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `folder` | string | Yes | JSON representation of parent folder, with members 'id', and 'type' which may be 'Folder' or 'Program' |  |
| `tokens` | array of [`TokenDTO`](./tokendto.md) | No | List of tokens in the folder |  |

## Generated example

```json
{
  "folder": "{\"id\":1001,\"type\":\"Program\"}",
  "tokens": [
    {
      "computedUrl": "https://example.com",
      "name": "Example name",
      "type": "string",
      "value": "string"
    }
  ]
}
```

## Referenced models

- [`TokenDTO`](./tokendto.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
