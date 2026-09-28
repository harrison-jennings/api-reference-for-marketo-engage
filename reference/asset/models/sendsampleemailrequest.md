# SendSampleEmailRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `emailAddress` | string | Yes | Email address to receive sample email |  |
| `leadId` | string | No | Id of a lead to impersonate. Tokens and dynamic content will be populated as though it were sent to the lead. |  |
| `textOnly` | boolean | No | Whether to send to text only version along with the HTML version. Default false. |  |

## Generated example

```json
{
  "emailAddress": "person@example.com",
  "leadId": "123",
  "textOnly": true
}
```

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
