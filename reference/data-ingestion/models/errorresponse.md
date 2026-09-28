# ErrorResponse

**Type:** `object`

Error response body returned for non-202 responses.

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `error_code` | string | No | Error code. |  |
| `message` | string | No | Error message. |  |

## Generated example

```json
{
  "error_code": "4000801",
  "message": "Bad request"
}
```

## Source

Generated from [`swagger-data-ingestion.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-data-ingestion.json).
