# LeadAttribute2Fields

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `name` | string | Yes | REST API name of field |  |
| `displayName` | string | Yes | Display name of field (friendly name) |  |
| `dataType` | string | Yes | Data type of field |  |
| `length` | integer | No | Length of field |  |
| `updateable` | boolean | Yes | Is field updateable |  |
| `crmManaged` | boolean | Yes | Is field managed by CRM |  |

## Generated example

```json
{
  "name": "Example name",
  "displayName": "Example name",
  "dataType": "string",
  "length": 123,
  "updateable": true,
  "crmManaged": true
}
```

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
