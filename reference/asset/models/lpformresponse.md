# LpFormResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `buttonLabel` | string | Yes | Label text of the button |  |
| `buttonLocation` | integer (int32) | Yes | Location in pixels of the button relative to the left of the form |  |
| `createdAt` | string (date-time) | No | Datetime the asset was created |  |
| `description` | string | No | Description of the asset |  |
| `folder` | [`Folder`](./folder.md) | Yes | JSON representation of parent folder, with members 'id', and 'type' which may be 'Folder' or 'Program' |  |
| `fontFamily` | string | Yes | font-family property for the form |  |
| `fontSize` | string | Yes | font-size property of the form |  |
| `id` | integer (int64) | No | Id of the asset |  |
| `knownVisitor` | [`FormKnownVisitorDTO`](./formknownvisitordto.md) | Yes | Known visitor behavior for the form |  |
| `labelPosition` | string | Yes | Default positioning of labels. |  |
| `language` | string | Yes | Language of the form |  |
| `locale` | string | Yes | Locale of the form |  |
| `name` | string | No | Name of the asset |  |
| `progressiveProfiling` | boolean | Yes | Whether progressive profiling is enabled for the form |  |
| `status` | string | Yes | Status filter for draft or approved versions | enum: approved, draft |
| `thankYouList` | array of [`FormThankYouPageDTO`](./formthankyoupagedto.md) | Yes | List of thank you page behaviors for the form |  |
| `theme` | string | Yes | CSS theme for the form to use |  |
| `updatedAt` | string (date-time) | No | Datetime the asset was most recently updated |  |
| `url` | string | No | Url of the asset in the Marketo UI |  |
| `waitingLabel` | string | Yes | Waiting text of the button |  |

## Generated example

```json
{
  "buttonLabel": "string",
  "buttonLocation": 123,
  "createdAt": "2026-01-15T10:30:00Z",
  "description": "string",
  "folder": {
    "id": 123,
    "type": "Folder"
  },
  "fontFamily": "string",
  "fontSize": "string",
  "id": 123,
  "knownVisitor": {
    "template": "string",
    "type": "string"
  },
  "labelPosition": "string",
  "language": "string",
  "locale": "string",
  "name": "Example name",
  "progressiveProfiling": true,
  "status": "approved",
  "thankYouList": [
    {
      "default": true,
      "followupType": "string",
      "followupValue": {},
      "operator": "string",
      "subjectField": "string",
      "values": [
        "string"
      ]
    }
  ],
  "theme": "string",
  "updatedAt": "2026-01-15T10:30:00Z",
  "url": "https://example.com",
  "waitingLabel": "string"
}
```

## Referenced models

- [`Folder`](./folder.md)
- [`FormKnownVisitorDTO`](./formknownvisitordto.md)
- [`FormThankYouPageDTO`](./formthankyoupagedto.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
