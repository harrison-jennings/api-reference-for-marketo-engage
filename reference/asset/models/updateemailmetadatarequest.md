# UpdateEmailMetaDataRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `description` | string | No | Description of the asset |  |
| `name` | string | No | Name of the Email |  |
| `preHeader` | string | No | Preheader text for the email |  |
| `operational` | boolean | No | Whether the email is operational. Operational emails bypass unsubscribe status. Defaults to false |  |
| `published` | boolean | No | Whether the email has been published to Sales Insight. Default false |  |
| `textOnly` | boolean | No | Setting to include text-only version of email when sent |  |
| `webView` | boolean | No | Whether the email has been enabled to allow the 'View as Web Page' when received |  |
| `autoCopyToText` | boolean | No | Setting to automatically copy HTML version to Text version |  |

## Generated example

```json
{
  "description": "string",
  "name": "Example name",
  "preHeader": "string",
  "operational": true,
  "published": true,
  "textOnly": true,
  "webView": true,
  "autoCopyToText": true
}
```

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
