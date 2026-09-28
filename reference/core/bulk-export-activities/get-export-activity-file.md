# Get Export Activity File

**Method:** `GET`  
**Path:** `/bulk/v1/activities/export/{exportId}/file.json`  
**Tag:** Bulk Export Activities  
**Operation ID:** `getExportActivitiesFileUsingGET`  

Returns the file content of an export job. The export job must be in "Completed" state. Use Get Export Activity Job Status endpoint to retrieve status of export job. Required Permissions: Read-Only Activity<br><br>The file format is specified by calling the Create Export Activity Job endpoint. The following is an example of the default file format ("CSV"). Note that the "attributes" field is formatted as JSON.<br><br><code>marketoGUID,leadId,activityDate,activityTypeId,campaignId,primaryAttributeValueId,primaryAttributeValue, attributes</code><br><code>122323,6,2013-09-26T06:56:35+0000,12,11,6,Owyliphys Iledil,[{"name":"Source Type","value":"Web page visit"}]</code>

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `exportId` | string | Yes | Id of export batch job. |  |

### Header parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `Range` | string | No | To support partial retrieval of extracted data, the HTTP header "Range" of type "bytes" may be specified. See RFC 2616 "Range Retrieval Requests" for more information. If the header is not set, the entire contents will be returned. |  |

### Example request

```http
GET {{base_url}}/bulk/v1/activities/export/{{exportId}}/file.json
Range: {{Range}}
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ObservableOfInputStreamRangeContent`](../models/observableofinputstreamrangecontent.md)

#### Generated example

```json
{}
```

### Referenced models

- [`ObservableOfInputStreamRangeContent`](../models/observableofinputstreamrangecontent.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
