# SubmitFormRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `input` | array of [`Form`](./form.md) | Yes | Single array item that contains form fields and visitor data to use during a form submittal |  |
| `formId` | integer (int32) | Yes | Id of the form |  |
| `programId` | integer (int32) | No | Id of the program to add lead and/or program member custom fields to |  |

## Generated example

```json
{
  "input": [
    {
      "leadFormFields": {
        "email": "person@example.com"
      },
      "visitorData": {
        "pageURL": "https://example.com",
        "queryString": "string",
        "leadClientIpAddress": "string",
        "userAgentString": "string"
      },
      "cookie": "string"
    }
  ],
  "formId": 123,
  "programId": 123
}
```

## Referenced models

- [`Form`](./form.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
