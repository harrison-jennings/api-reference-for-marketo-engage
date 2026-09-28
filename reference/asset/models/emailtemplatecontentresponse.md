# EmailTemplateContentResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `content` | string | Yes | HTML content of the template |  |
| `id` | integer (int32) | Yes | Unique integer id of the email template |  |
| `status` | string | Yes | Status filter for draft or approved versions | enum: approved, draft |

## Generated example

```json
{
  "content": "string",
  "id": 123,
  "status": "approved"
}
```

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
