# UsageData

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `date` | string (date-time) | Yes | Date of the collected calls |  |
| `total` | integer (int32) | No | Total number of calls in the time period |  |
| `users` | array of [`UserCount`](./usercount.md) | No | Counts for individual users |  |

## Generated example

```json
{
  "date": "2026-01-15T10:30:00Z",
  "total": 123,
  "users": [
    {
      "count": 123,
      "userId": "person@example.com"
    }
  ]
}
```

## Referenced models

- [`UserCount`](./usercount.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
