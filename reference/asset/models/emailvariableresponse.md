# EmailVariableResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `name` | string | Yes | Name of the email variable |  |
| `value` | string | Yes | Value of the email variable |  |
| `moduleScope` | boolean | Yes | Returns true for local variables else returns false |  |
| `moduleId` | string | No | Returns the moduleId associated with the variable, only in case of local variable |  |

## Generated example

```json
{
  "name": "Example name",
  "value": "string",
  "moduleScope": true,
  "moduleId": "123"
}
```

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
