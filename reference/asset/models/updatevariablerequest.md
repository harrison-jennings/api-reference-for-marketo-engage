# UpdateVariableRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `value` | string | No | Value to update variable with |  |
| `moduleId` | string | No | Module that variable is associated with. Required for updating module variables. Not needed for global variables. |  |

## Generated example

```json
{
  "value": "string",
  "moduleId": "123"
}
```

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
