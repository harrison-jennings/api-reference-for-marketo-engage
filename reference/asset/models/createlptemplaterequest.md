# CreateLpTemplateRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `description` | string | No | Description of the landing page template |  |
| `enableMunchkin` | boolean | No | Whether to enable munchkin on the derived pages. Defaults to true |  |
| `folder` | [`Folder`](./folder.md) | Yes | JSON representation of parent folder, with members 'id', and 'type' which may be 'Folder' or 'Program' |  |
| `name` | string | Yes | Name of the landing page template |  |
| `templateType` | string | No | Type of template to create. Defaults to freeForm | enum: guided, freeForm |

## Generated example

```json
{
  "description": "string",
  "enableMunchkin": true,
  "folder": {
    "id": 123,
    "type": "Folder"
  },
  "name": "Example name",
  "templateType": "guided"
}
```

## Referenced models

- [`Folder`](./folder.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
