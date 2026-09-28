# RuleConstraint

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | No | Id of the constraint. Built-in constraints have negative ids |  |
| `name` | string | No | Name of the constraint |  |
| `dataType` | string | No | Data type of the constraint value |  |
| `primary` | boolean | No | Whether this is the primary constraint of the rule type |  |
| `operator` | string | No | Default operator of the constraint |  |
| `dbAttrib` | boolean | No | Whether the constraint is a person or company field |  |
| `dbAttribId` | string | No | Id of the person or company field |  |
| `dbObject` | string | No | Object the field belongs to |  |
| `type` | string | No | Field type of the constraint, for example standard or custom |  |

## Generated example

```json
{
  "id": 123,
  "name": "Example name",
  "dataType": "string",
  "primary": true,
  "operator": "string",
  "dbAttrib": true,
  "dbAttribId": "123",
  "dbObject": "string",
  "type": "string"
}
```

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
