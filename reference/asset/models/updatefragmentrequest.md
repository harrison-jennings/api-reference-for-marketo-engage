# UpdateFragmentRequest

**Type:** `object`

Request body for updating a fragment.

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `name` | string | No |  |  |
| `description` | string | No |  |  |
| `data` | [`DataDTO`](./datadto.md) | No |  |  |
| `editorContext` | [`EditorContextDto`](./editorcontextdto.md) | No |  |  |
| `settings` | [`UpdateFragmentSettingsDTO`](./updatefragmentsettingsdto.md) | No |  |  |

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
  },
  "settings": {
    "fragmentType": "string",
    "fragmentSubType": "string",
    "supportedChannels": [
      "string"
    ]
  }
}
```

## Referenced models

- [`DataDTO`](./datadto.md)
- [`EditorContextDto`](./editorcontextdto.md)
- [`UpdateFragmentSettingsDTO`](./updatefragmentsettingsdto.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
