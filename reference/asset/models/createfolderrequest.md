# CreateFolderRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `description` | string | No | Description of the asset |  |
| `name` | string | Yes | Name of the Folder |  |
| `parent` | [`Folder`](./folder.md) | Yes | Folder object describing the parent folder |  |

## Generated example

```json
{
  "description": "string",
  "name": "Example name",
  "parent": {
    "id": 123,
    "type": "Folder"
  }
}
```

## Referenced models

- [`Folder`](./folder.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
