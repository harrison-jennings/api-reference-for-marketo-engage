# ObjectField

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `dataType` | string | No | Datatype of the field |  |
| `displayName` | string | No | UI display-name of the field |  |
| `length` | integer (int32) | No | Max length of the field. Only applicable to text, string, and text area. |  |
| `name` | string | No | Name of the field |  |
| `updateable` | boolean | No | Whether the field is updateable |  |
| `crmManaged` | boolean | No | Whether the field is managed by CRM (native sync) |  |

## Generated example

```json
{
  "dataType": "string",
  "displayName": "Example name",
  "length": 123,
  "name": "Example name",
  "updateable": false,
  "crmManaged": false
}
```

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
