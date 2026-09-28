# CreateEmailTemplateRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `name` | string | Yes | Name of the Email Template. Must be unique under the parent folder. |  |
| `folder` | [`Folder`](./folder.md) | Yes | JSON representation of parent folder, with members 'id', and 'type' which may be 'Folder' or 'Program' |  |
| `description` | string | No | Description of the email template |  |
| `content` | string | Yes | HTML content for template. Multipart file. |  |

## Generated example

```json
{
  "name": "Example name",
  "folder": {
    "id": 123,
    "type": "Folder"
  },
  "description": "string",
  "content": "string"
}
```

## Referenced models

- [`Folder`](./folder.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
