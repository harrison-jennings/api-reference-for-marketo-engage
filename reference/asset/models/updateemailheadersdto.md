# UpdateEmailHeadersDTO

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `ccEmails` | array of string | No |  |  |
| `fromEmail` | string | No |  |  |
| `fromName` | string | No |  |  |
| `preheader` | string | No |  |  |
| `replyEmail` | string | No |  |  |
| `subject` | string | No |  |  |

## Generated example

```json
{
  "ccEmails": [
    "person@example.com"
  ],
  "fromEmail": "person@example.com",
  "fromName": "Example name",
  "preheader": "string",
  "replyEmail": "person@example.com",
  "subject": "string"
}
```

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
