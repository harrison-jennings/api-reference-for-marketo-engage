# CloneSmartListRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `name` | string | Yes | Name for the cloned smart list |  |
| `folder` | [`Folder`](./folder.md) | Yes | JSON representation of parent folder, with members 'id', and 'type' which may be 'Folder' or 'Program' |  |
| `description` | string | No | Description of the cloned smart list |  |

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
