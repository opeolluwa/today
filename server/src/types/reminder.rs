use almond_kernel::entities;
use seaography::async_graphql;
use seaography::CustomInputType;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(CustomInputType, Debug, Serialize, Deserialize, Clone, PartialEq, Eq)]
#[serde(rename_all = "camelCase")]
#[seaography(input_type_name = "SyncReminderInput")]
pub struct SyncReminderInput {
    pub identifier: Uuid,
    pub title: String,
    pub description: Option<String>,
    pub recurring: bool,
    pub recurrence_rule: Option<String>,
    pub alarm_sound: Option<String>,
    pub remind_at: String,
    pub created_at: String,
    pub updated_at: String,
    pub workspace_identifier: Option<Uuid>,
}

impl TryFrom<SyncReminderInput> for entities::reminder::Model {
    type Error = async_graphql::Error;

    fn try_from(val: SyncReminderInput) -> Result<Self, Self::Error> {
        Ok(entities::reminder::Model {
            identifier: val.identifier,
            title: val.title,
            description: val.description,
            recurring: val.recurring,
            recurrence_rule: val.recurrence_rule,
            alarm_sound: val.alarm_sound,
            remind_at: val
                .remind_at
                .parse()
                .map_err(|e| async_graphql::Error::new(format!("invalid remind_at: {e}")))?,
            created_at: val
                .created_at
                .parse()
                .map_err(|e| async_graphql::Error::new(format!("invalid created_at: {e}")))?,
            updated_at: val
                .updated_at
                .parse()
                .map_err(|e| async_graphql::Error::new(format!("invalid updated_at: {e}")))?,
            workspace_identifier: val.workspace_identifier,
        })
    }
}
