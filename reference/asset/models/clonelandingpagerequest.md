# CloneLandingPageRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `description` | string | No | Description of the asset |  |
| `folder` | [`Folder`](./folder.md) | Yes | JSON representation of parent folder, with members 'id', and 'type' which may be 'Folder' or 'Program' |  |
| `name` | string | Yes | Name of the landing page |  |
| `template` | integer (int32) | No | Id of the template used |  |

## Generated example

```json
{
  "description": "string",
  "folder": {
    "id": 123,
    "type": "Folder"
  },
  "name": "Example name",
  "template": 123
}
```

## Referenced models

- [`Folder`](./folder.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
