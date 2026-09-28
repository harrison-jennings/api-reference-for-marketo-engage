# EmailDynamicContentResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `content` | array of [`EmailDynamicContentItem`](./emaildynamiccontentitem.md) | No | List of variations in the section |  |
| `createdAt` | string (date-time) | No | Datetime when the section was created |  |
| `id` | integer (int32) | No | Id of the dnamic content section |  |
| `segmentation` | integer (int32) | No | Segmentation to which the section is linked |  |
| `updatedAt` | string (date-time) | No | Datetime when the section was last updated |  |

## Generated example

```json
{
  "content": [
    {
      "content": "string",
      "id": "123",
      "segmentId": "123",
      "segmentName": "Example name",
      "type": "string"
    }
  ],
  "createdAt": "2026-01-15T10:30:00Z",
  "id": 123,
  "segmentation": 123,
  "updatedAt": "2026-01-15T10:30:00Z"
}
```

## Referenced models

- [`EmailDynamicContentItem`](./emaildynamiccontentitem.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
