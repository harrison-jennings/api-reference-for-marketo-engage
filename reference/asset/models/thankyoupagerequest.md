# ThankYouPageRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `default` | boolean | No | When true, this is the default rule, and will be applied when a user does not qualify for any of the other rules |  |
| `followupType` | string | Yes | Type of followup. When set to url, will follow to the url set in followupValue. When set to lp, will follow to the Landing page with the id given in followupValue |  |
| `followupValue` | string | Yes | Where to follow to on submission. Given as a URL or and Integer depending on followupType |  |
| `operator` | string | Yes | Operator to evaluate aginst the subject field |  |
| `subjectField` | string | Yes | Field to apply to operator to |  |
| `values` | array of string | Yes | Comma-separated list of values to compare to with the operator |  |

## Generated example

```json
{
  "default": true,
  "followupType": "string",
  "followupValue": "string",
  "operator": "string",
  "subjectField": "string",
  "values": [
    "string"
  ]
}
```

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
