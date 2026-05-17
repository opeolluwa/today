use almond_kernel::entities;
use seaography::async_graphql;
use seaography::CustomInputType;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(CustomInputType, Debug, Serialize, Deserialize, Clone, PartialEq)]
#[serde(rename_all = "camelCase")]
#[seaography(input_type_name = "SyncNoteInput")]
pub struct SyncNoteInput {
    pub identifier: Uuid,
    pub title: String,
    pub content: String,
    pub categories: Option<Vec<String>>,
    pub created_at: String,
    pub updated_at: String,
    pub workspace_identifier: Option<Uuid>,
}

impl TryFrom<SyncNoteInput> for entities::notes::Model {
    type Error = async_graphql::Error;

    fn try_from(val: SyncNoteInput) -> Result<Self, Self::Error> {
        Ok(entities::notes::Model {
            identifier: val.identifier,
            title: val.title,
            content: val.content,
            categories: None,
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
