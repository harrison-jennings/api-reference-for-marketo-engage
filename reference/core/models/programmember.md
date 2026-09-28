# ProgramMember

**Type:** `object`

Program member record. Always contains lead id, but may have any number of other fields, depending on the fields available in the target instance.

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `seq` | integer (int32) | Yes | Integer indicating the sequence of the record in response. This value is correlated to the order of the records included in the request input. Seq should only be part of responses and should not be submitted. |  |
| `leadId` | integer (int32) | Yes | Unique integer id of a lead record |  |
| `reachedSuccess` | boolean | Yes | Boolean indicating if program member has reached success criteria for program |  |
| `programId` | integer (int32) | Yes | Unique integer id of a program |  |
| `acquiredBy` | boolean | Yes | Boolean indicating if program member was acquired by program |  |
| `membershipDate` | string | Yes | Date the lead first became a member of the program |  |

## Generated example

```json
{
  "seq": 123,
  "leadId": 123,
  "reachedSuccess": false,
  "programId": 123,
  "acquiredBy": false,
  "membershipDate": "string"
}
```

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
