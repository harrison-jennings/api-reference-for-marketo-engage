# ContentWaveErrorDTO

**Type:** `object`

An entry in the errors array. The type field marks it as info, warning, or error — there is no separate warnings array; warnings appear here with type "warning".

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `key` | string | No |  |  |
| `message` | string | No |  |  |
| `code` | string | No |  |  |
| `dynamicMessage` | string | No |  |  |
| `type` | string | No | Severity of the entry: info, warning, or error. |  |
| `source` | string | No | Origin of the entry, e.g. validation, template, fragment, message_render, asset_publish. |  |
| `errorMessage` | string | No |  |  |
| `errorPosition` | object | No | Location in the content the entry refers to (for script/validation errors). |  |

## Generated example

```json
{
  "key": "string",
  "message": "string",
  "code": "string",
  "dynamicMessage": "string",
  "type": "string",
  "source": "string",
  "errorMessage": "string",
  "errorPosition": {
    "line": 123,
    "column": 123
  }
}
```

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
