# Smart Campaigns

Smart Campaign Controller

## Operations

| Method | Path | Operation |
|---|---|---|
| `GET` | `/rest/asset/v1/smartCampaign/byName.json` | [Get Smart Campaign by Name](get-smart-campaign-by-name.md) |
| `GET` | `/rest/asset/v1/smartCampaign/flowStepTypes.json` | [Get Smart Campaign Flow Step Types](get-smart-campaign-flow-step-types.md) |
| `GET` | `/rest/asset/v1/smartCampaign/flowSteps.json` | [Get Smart Campaign Flow Steps](get-smart-campaign-flow-steps.md) |
| `GET` | `/rest/asset/v1/smartCampaign/rules.json` | [Get Smart Campaign Rules](get-smart-campaign-rules.md) |
| `GET` | `/rest/asset/v1/smartCampaign/{id}.json` | [Get Smart Campaign by Id](get-smart-campaign-by-id.md) |
| `POST` | `/rest/asset/v1/smartCampaign/{id}.json` | [Update Smart Campaign](update-smart-campaign.md) |
| `POST` | `/rest/asset/v1/smartCampaign/{id}/activate.json` | [Activate Smart Campaign](activate-smart-campaign.md) |
| `GET` | `/rest/asset/v1/smartCampaign/{id}/autoSuggest.json` | [Get Auto Suggest for Smart Campaign](get-auto-suggest-for-smart-campaign.md) |
| `POST` | `/rest/asset/v1/smartCampaign/{id}/clone.json` | [Clone Smart Campaign](clone-smart-campaign.md) |
| `POST` | `/rest/asset/v1/smartCampaign/{id}/deactivate.json` | [Deactivate Smart Campaign](deactivate-smart-campaign.md) |
| `POST` | `/rest/asset/v1/smartCampaign/{id}/delete.json` | [Delete Smart Campaign](delete-smart-campaign.md) |
| `POST` | `/rest/asset/v1/smartCampaign/{id}/flow/{stepId}/addChoice.json` | [Add Step Choice](add-step-choice.md) |
| `POST` | `/rest/asset/v1/smartCampaign/{id}/flow/{stepId}/choice/{choiceId}.json` | [Update Flow Step Choice](update-flow-step-choice.md) |
| `POST` | `/rest/asset/v1/smartCampaign/{id}/flow/{stepId}/choice/{choiceId}/remove.json` | [Remove Flow Step Choice](remove-flow-step-choice.md) |
| `POST` | `/rest/asset/v1/smartCampaign/{id}/flow/{stepId}/choice/{choiceId}/reorder.json` | [Reorder Flow Step Choice](reorder-flow-step-choice.md) |
| `POST` | `/rest/asset/v1/smartCampaign/{id}/flow/{stepId}/remove.json` | [Remove Flow Step](remove-flow-step.md) |
| `POST` | `/rest/asset/v1/smartCampaign/{id}/flows.json` | [Add Flow Step](add-flow-step.md) |
| `GET` | `/rest/asset/v1/smartCampaign/{id}/smartList.json` | [Get Smart List by Smart Campaign Id](get-smart-list-by-smart-campaign-id.md) |
| `GET` | `/rest/asset/v1/smartCampaign/{id}/usedBy.json` | [Get Smart Campaign Used By](get-smart-campaign-used-by.md) |
| `GET` | `/rest/asset/v1/smartCampaigns.json` | [Get Smart Campaigns](get-smart-campaigns.md) |
| `POST` | `/rest/asset/v1/smartCampaigns.json` | [Create Smart Campaign](create-smart-campaign.md) |
