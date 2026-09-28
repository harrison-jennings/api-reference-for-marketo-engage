# PushLeadToMarketoRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `input` | array of [`PushLead`](./pushlead.md) | No |  |  |
| `lookupField` | string | No |  |  |
| `partitionName` | string | No |  |  |
| `programName` | string | No |  |  |
| `programStatus` | string | No |  |  |
| `reason` | string | No |  |  |
| `source` | string | No |  |  |

## Generated example

```json
{
  "input": [
    {
      "id": 123,
      "reason": {
        "code": "string",
        "message": "string"
      },
      "status": "string"
    }
  ],
  "lookupField": "string",
  "partitionName": "Example name",
  "programName": "Example name",
  "programStatus": "string",
  "reason": "string",
  "source": "string"
}
```

## Referenced models

- [`PushLead`](./pushlead.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
