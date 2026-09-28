# CreateSmartListRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `name` | string | Yes | Name of the smart list. Maximum 255 characters |  |
| `folder` | [`Folder`](./folder.md) | Yes | Folder object describing the parent folder |  |
| `description` | string | No | Description of the smart list. Maximum 2,000 characters |  |

## Generated example

```json
{
  "name": "Example name",
  "folder": {
    "id": 123,
    "type": "Folder"
  },
  "description": "string"
}
```

## Referenced models

- [`Folder`](./folder.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
