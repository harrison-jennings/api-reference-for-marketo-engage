# CustomActivity

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `activityDate` | string | Yes | Datetime of the activity |  |
| `activityTypeId` | integer (int32) | Yes | Id of the activity type |  |
| `apiName` | string | No |  |  |
| `attributes` | array of [`Attribute`](./attribute.md) | Yes | List of secondary attributes |  |
| `errors` | array of [`Error`](./error.md) | Yes | Array of errors that occurred if the request was unsuccessful |  |
| `id` | integer (int64) | Yes | Integer id of the activity. For instances which have been migrated to Activity Service, this field may not be present, and should not be treated as unique. |  |
| `leadId` | integer (int64) | Yes | Id of the lead associated to the activity |  |
| `marketoGUID` | string | No | Unique id of the activity (128 character string) |  |
| `primaryAttributeValue` | string | Yes | Value of the primary attribute |  |
| `status` | string | No | Status of the operation performed on the record | enum: created, updated, deleted, skipped, added, removed |

## Generated example

```json
{
  "activityDate": "string",
  "activityTypeId": 123,
  "apiName": "Example name",
  "attributes": [
    {
      "apiName": "Example name",
      "name": "Example name",
      "value": {}
    }
  ],
  "errors": [
    {
      "code": "string",
      "message": "string"
    }
  ],
  "id": 123,
  "leadId": 123,
  "marketoGUID": "123",
  "primaryAttributeValue": "string",
  "status": "created"
}
```

## Referenced models

- [`Attribute`](./attribute.md)
- [`Error`](./error.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
