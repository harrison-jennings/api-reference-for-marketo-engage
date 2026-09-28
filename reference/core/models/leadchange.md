# LeadChange

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `activityDate` | string (date-time) | Yes | Datetime of the activity |  |
| `activityTypeId` | integer (int32) | Yes | Id of the activity type |  |
| `attributes` | array of [`Attribute`](./attribute.md) | Yes | List of secondary attributes |  |
| `campaignId` | integer (int64) | No |  |  |
| `fields` | array of [`LeadChangeField`](./leadchangefield.md) | No |  |  |
| `id` | integer (int64) | Yes | Integer id of the activity. For instances which have been migrated to Activity Service, this field may not be present, and should not be treated as unique. |  |
| `leadId` | integer (int64) | Yes | Id of the lead associated to the activity |  |
| `marketoGUID` | string | No | Unique id of the activity (128 character string) |  |

## Generated example

```json
{
  "activityDate": "2026-01-15T10:30:00Z",
  "activityTypeId": 123,
  "attributes": [
    {
      "apiName": "Example name",
      "name": "Example name",
      "value": {}
    }
  ],
  "campaignId": 123,
  "fields": [
    {
      "id": 123,
      "name": "Example name",
      "newValue": "string",
      "oldValue": "string"
    }
  ],
  "id": 123,
  "leadId": 123,
  "marketoGUID": "123"
}
```

## Referenced models

- [`Attribute`](./attribute.md)
- [`LeadChangeField`](./leadchangefield.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
