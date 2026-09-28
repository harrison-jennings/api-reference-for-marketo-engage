# UpdateEmailTemplateRequest

**Type:** `object`

Request body for updating an email template.

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `name` | string | No |  |  |
| `description` | string | No |  |  |
| `data` | [`DataDTO`](./datadto.md) | No |  |  |
| `editorContext` | [`EditorContextDto`](./editorcontextdto.md) | No |  |  |

## Generated example

```json
{
  "name": "Example name",
  "description": "string",
  "data": {
    "html": {
      "body": "string"
    },
    "text": {
      "body": "string",
      "syncFromHtml": true
    }
  },
  "editorContext": {
    "dynamicContent": {}
  }
}
```

## Referenced models

- [`DataDTO`](./datadto.md)
- [`EditorContextDto`](./editorcontextdto.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
