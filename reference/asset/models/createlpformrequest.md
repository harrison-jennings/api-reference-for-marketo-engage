# CreateLpFormRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `description` | string | No | Description of the form |  |
| `folder` | [`Folder`](./folder.md) | Yes | JSON representation of parent folder, with members 'id', and 'type' which may be 'Folder' or 'Program' |  |
| `fontFamily` | string | No | font-family property for the form |  |
| `fontSize` | string | No | font-size property of the form |  |
| `knownVisitor` | [`FormKnownVisitorDTO`](./formknownvisitordto.md) | No | Known visitor behavior for the form |  |
| `labelPosition` | string | No | Default positioning of labels. |  |
| `language` | string | No | Language of the form |  |
| `locale` | string | No | Locale of the form |  |
| `name` | string | No | Name of the form |  |
| `progressiveProfiling` | boolean | No | Whether progressive profiling is enabled for the form |  |
| `theme` | string | No | CSS theme for the form to use |  |

## Generated example

```json
{
  "description": "string",
  "folder": {
    "id": 123,
    "type": "Folder"
  },
  "fontFamily": "string",
  "fontSize": "string",
  "knownVisitor": {
    "template": "string",
    "type": "string"
  },
  "labelPosition": "string",
  "language": "string",
  "locale": "string",
  "name": "Example name",
  "progressiveProfiling": true,
  "theme": "string"
}
```

## Referenced models

- [`Folder`](./folder.md)
- [`FormKnownVisitorDTO`](./formknownvisitordto.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
