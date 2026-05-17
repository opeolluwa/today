use almond_kernel::entities;
use almond_kernel::entities::sea_orm_active_enums::Priority;
use seaography::async_graphql;
use seaography::CustomInputType;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(CustomInputType, Debug, Serialize, Deserialize, Clone, PartialEq, Eq)]
#[serde(rename_all = "camelCase")]
#[seaography(input_type_name = "SyncTodoInput")]
pub struct SyncTodoInput {
    pub identifier: Uuid,
    pub title: String,
    pub description: Option<String>,
    pub due_date: Option<String>,
    pub priority: Priority,
    pub done: bool,
    pub created_at: String,
    pub updated_at: String,
    pub due_time: Option<String>,
    pub workspace_identifier: Option<Uuid>,
}

impl TryFrom<SyncTodoInput> for entities::todo::Model {
    type Error = async_graphql::Error;

    fn try_from(val: SyncTodoInput) -> Result<Self, Self::Error> {
        Ok(entities::todo::Model {
            identifier: val.identifier,
            title: val.title,
            description: val.description,
            due_date: val
                .due_date
                .map(|d| {
                    d.parse()
                        .map_err(|e| async_graphql::Error::new(format!("invalid due_date: {e}")))
                })
                .transpose()?,
            priority: val.priority,
            done: val.done,
            created_at: val
                .created_at
                .parse()
                .map_err(|e| async_graphql::Error::new(format!("invalid created_at: {e}")))?,
            updated_at: val
                .updated_at
                .parse()
                .map_err(|e| async_graphql::Error::new(format!("invalid updated_at: {e}")))?,
            due_time: val
                .due_time
                .map(|t| {
                    t.parse()
                        .map_err(|e| async_graphql::Error::new(format!("invalid due_time: {e}")))
                })
                .transpose()?,
            workspace_identifier: val.workspace_identifier,
        })
    }
}
