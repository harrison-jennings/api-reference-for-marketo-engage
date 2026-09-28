# LeadFieldStatus

**Type:** `object`

Lead field update status

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `name` | string | Yes | API name of the field |  |
| `status` | string | Yes | Status of the operation performed on the record | enum: created, updated |

## Generated example

```json
{
  "name": "Example name",
  "status": "created"
}
```

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
