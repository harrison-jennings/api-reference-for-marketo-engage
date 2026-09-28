# VisitorData

**Type:** `object`

Page visit related data. Used to populate additional activity fields for filtering and triggering.

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `pageURL` | string | No | Web page that hosts the form. Must be a fully formed URL |  |
| `queryString` | string | No | Web page query string. Contains one or more ampersand delimited key=value pairs |  |
| `leadClientIpAddress` | string | No | Client IP address. IPv4 format. Used to populate inferred fields on upserted lead record. |  |
| `userAgentString` | string | No | User agent of browser hosting the form |  |

## Generated example

```json
{
  "pageURL": "https://example.com",
  "queryString": "string",
  "leadClientIpAddress": "string",
  "userAgentString": "string"
}
```

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
