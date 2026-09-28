# Email Templates

Email Template Controller

## Operations

| Method | Path | Operation |
|---|---|---|
| `GET` | `/rest/asset/v1/emailTemplate/byName.json` | [Get Email Template by Name](get-email-template-by-name.md) |
| `GET` | `/rest/asset/v1/emailTemplate/{id}.json` | [Get Email Template by Id](get-email-template-by-id.md) |
| `POST` | `/rest/asset/v1/emailTemplate/{id}.json` | [Update Email Template Metadata](update-email-template-metadata.md) |
| `POST` | `/rest/asset/v1/emailTemplate/{id}/approveDraft.json` | [Approve Email Template Draft](approve-email-template-draft.md) |
| `POST` | `/rest/asset/v1/emailTemplate/{id}/clone.json` | [Clone Email Template](clone-email-template.md) |
| `GET` | `/rest/asset/v1/emailTemplate/{id}/content` | [Get Email Template Content by Id](get-email-template-content-by-id.md) |
| `POST` | `/rest/asset/v1/emailTemplate/{id}/content.json` | [Update Email Template Content](update-email-template-content.md) |
| `POST` | `/rest/asset/v1/emailTemplate/{id}/delete.json` | [Delete Email Template](delete-email-template.md) |
| `POST` | `/rest/asset/v1/emailTemplate/{id}/discardDraft.json` | [Discard Email Template Draft](discard-email-template-draft.md) |
| `POST` | `/rest/asset/v1/emailTemplate/{id}/unapprove.json` | [Unapprove Email Template Draft](unapprove-email-template-draft.md) |
| `GET` | `/rest/asset/v1/emailTemplates.json` | [Get Email Templates](get-email-templates.md) |
| `POST` | `/rest/asset/v1/emailTemplates.json` | [Create Email Template](create-email-template.md) |
| `GET` | `/rest/asset/v1/emailTemplates/{id}/usedBy.json` | [Get Email Template Used By](get-email-template-used-by.md) |
