# Emails

Email Controller

## Operations

| Method | Path | Operation |
|---|---|---|
| `GET` | `/rest/asset/v1/email/byName.json` | [Get Email by Name](get-email-by-name.md) |
| `GET` | `/rest/asset/v1/email/ccFields.json` | [Get Email CC Fields](get-email-cc-fields.md) |
| `GET` | `/rest/asset/v1/email/{id}.json` | [Get Email By Id](get-email-by-id.md) |
| `POST` | `/rest/asset/v1/email/{id}.json` | [Update Email Metadata](update-email-metadata.md) |
| `POST` | `/rest/asset/v1/email/{id}/approveDraft.json` | [Approve Email Draft](approve-email-draft.md) |
| `POST` | `/rest/asset/v1/email/{id}/clone.json` | [Clone Email](clone-email.md) |
| `GET` | `/rest/asset/v1/email/{id}/content.json` | [Get Email Content](get-email-content.md) |
| `POST` | `/rest/asset/v1/email/{id}/content.json` | [Update Email Content](update-email-content.md) |
| `POST` | `/rest/asset/v1/email/{id}/content/rearrange.json` | [Rearrange Email Modules](rearrange-email-modules.md) |
| `POST` | `/rest/asset/v1/email/{id}/content/{htmlId}.json` | [Update Email Content Section](update-email-content-section.md) |
| `POST` | `/rest/asset/v1/email/{id}/content/{moduleId}/add.json` | [Add Email Module](add-email-module.md) |
| `POST` | `/rest/asset/v1/email/{id}/content/{moduleId}/delete.json` | [Delete Module](delete-module.md) |
| `POST` | `/rest/asset/v1/email/{id}/content/{moduleId}/duplicate.json` | [Duplicate Email Module](duplicate-email-module.md) |
| `POST` | `/rest/asset/v1/email/{id}/content/{moduleId}/rename.json` | [Rename Email Module](rename-email-module.md) |
| `POST` | `/rest/asset/v1/email/{id}/delete.json` | [Delete Email](delete-email.md) |
| `POST` | `/rest/asset/v1/email/{id}/discardDraft.json` | [Discard Email Draft](discard-email-draft.md) |
| `GET` | `/rest/asset/v1/email/{id}/dynamicContent/{contentId}.json` | [Get Email Dynamic Content](get-email-dynamic-content.md) |
| `POST` | `/rest/asset/v1/email/{id}/dynamicContent/{contentId}.json` | [Update Email Dynamic Content Section](update-email-dynamic-content-section.md) |
| `GET` | `/rest/asset/v1/email/{id}/fullContent.json` | [Get Email Full Content](get-email-full-content.md) |
| `POST` | `/rest/asset/v1/email/{id}/fullContent.json` | [Update Email Full Content](update-email-full-content.md) |
| `POST` | `/rest/asset/v1/email/{id}/sendSample.json` | [Send Sample Email](send-sample-email.md) |
| `POST` | `/rest/asset/v1/email/{id}/unapprove.json` | [Unapprove Email](unapprove-email.md) |
| `POST` | `/rest/asset/v1/email/{id}/variable/{name}.json` | [Update Email Variable](update-email-variable.md) |
| `GET` | `/rest/asset/v1/email/{id}/variables.json` | [Get Email Variables](get-email-variables.md) |
| `GET` | `/rest/asset/v1/emails.json` | [Get Emails](get-emails.md) |
| `POST` | `/rest/asset/v1/emails.json` | [Create Email](create-email.md) |
