# Company

**Type:** `object`

Company record. May include any additional 'fields' listed in the Describe Companies endpoint

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `externalCompanyId` | string | No | Unique id of the company record |  |
| `id` | integer | No | Unique integer id of the company record |  |
| `company` | string | No | Unique name of the company record |  |

## Generated example

```json
{
  "externalCompanyId": "123",
  "id": 123,
  "company": "string"
}
```

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
