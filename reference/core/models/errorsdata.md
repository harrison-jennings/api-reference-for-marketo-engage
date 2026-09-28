# ErrorsData

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `date` | string (date-time) | Yes | Date of the collected calls |  |
| `errors` | array of [`ErrorCount`](./errorcount.md) | No | Counts for individual error codes |  |
| `total` | integer (int32) | No | Total number of errors in the time period |  |

## Generated example

```json
{
  "date": "2026-01-15T10:30:00Z",
  "errors": [
    {
      "count": 123,
      "errorCode": "string"
    }
  ],
  "total": 123
}
```

## Referenced models

- [`ErrorCount`](./errorcount.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
