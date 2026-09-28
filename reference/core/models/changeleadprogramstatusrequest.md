# ChangeLeadProgramStatusRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `input` | array of [`LeadLookupInputData`](./leadlookupinputdata.md) | Yes | List of leads for input |  |
| `status` | string | Yes | Program status of the record. Permissible values can be retrieve from the Get Channel by Name API for the designated program's channel |  |

## Generated example

```json
{
  "input": [
    {
      "id": 123
    }
  ],
  "status": "string"
}
```

## Referenced models

- [`LeadLookupInputData`](./leadlookupinputdata.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
