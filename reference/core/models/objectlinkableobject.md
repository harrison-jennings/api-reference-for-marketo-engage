# ObjectLinkableObject

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `name` | string | Yes | Link object API name |  |
| `displayName` | string | Yes | Link object UI display-name |  |
| `fields` | array of [`ObjectLinkableObjectField`](./objectlinkableobjectfield.md) | Yes | List of fields available on the link object |  |

## Generated example

```json
{
  "name": "Example name",
  "displayName": "Example name",
  "fields": [
    {
      "name": "Example name",
      "displayName": "Example name",
      "dataType": "string"
    }
  ]
}
```

## Referenced models

- [`ObjectLinkableObjectField`](./objectlinkableobjectfield.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
