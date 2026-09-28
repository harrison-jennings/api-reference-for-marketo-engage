# LeadChangeField

**Type:** `object`

Activity record containing information on a data value change

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | Unique integer id of the change record |  |
| `name` | string | Yes | Name of the field which was changed |  |
| `newValue` | string | Yes | New value after the change |  |
| `oldValue` | string | No | Old value before the change |  |

## Generated example

```json
{
  "id": 123,
  "name": "Example name",
  "newValue": "string",
  "oldValue": "string"
}
```

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
