# TagResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `allowableValues` | string | No | The list of acceptable values for the tag type |  |
| `applicableProgramTypes` | string | Yes | Types of programs to which the tag can apply |  |
| `required` | boolean | Yes | Whether the tag is required for its applicable program types |  |
| `tagType` | string | Yes | Name of the tag |  |

## Generated example

```json
{
  "allowableValues": "string",
  "applicableProgramTypes": "string",
  "required": true,
  "tagType": "string"
}
```

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
