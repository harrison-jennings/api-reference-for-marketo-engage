# SyncLeadRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `action` | string | No | Type of sync operation to perform. Defaults to createOrUpdate if unset | enum: createOnly, updateOnly, createOrUpdate, createDuplicate |
| `asyncProcessing` | boolean | No | If set to true, the call will return immediately |  |
| `input` | array of [`Lead`](./lead.md) | Yes | List of leads for input |  |
| `lookupField` | string | No | Field to deduplicate on. The field must be present in each lead record of the input. Defaults to email if unset |  |
| `partitionName` | string | No | Name of the partition to operate on, if applicable. Should be set whenever possible, when interacting with an instance where partitions are enabled. |  |

## Generated example

```json
{
  "action": "createOnly",
  "asyncProcessing": false,
  "input": [
    {
      "id": 123,
      "membership": {
        "acquiredBy": false,
        "isExhausted": false,
        "membershipDate": "string",
        "nurtureCadence": "string",
        "progressionStatus": "string",
        "reachedSuccess": false,
        "stream": "string"
      },
      "reason": {
        "code": "string",
        "message": "string"
      },
      "status": "string"
    }
  ],
  "lookupField": "string",
  "partitionName": "Example name"
}
```

## Referenced models

- [`Lead`](./lead.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
