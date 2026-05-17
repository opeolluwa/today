use almond_kernel::entities;
use almond_kernel::entities::sea_orm_active_enums::Tag;
use seaography::async_graphql;
use seaography::CustomInputType;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(CustomInputType, Debug, Serialize, Deserialize, Clone, PartialEq, Eq)]
#[serde(rename_all = "camelCase")]
#[seaography(input_type_name = "SyncBookmarkInput")]
pub struct SyncBookmarkInput {
    pub identifier: Uuid,
    pub title: String,
    pub url: String,
    pub tag: Tag,
    pub created_at: String,
    pub updated_at: String,
    pub workspace_identifier: Option<Uuid>,
}

impl TryFrom<SyncBookmarkInput> for entities::bookmark::Model {
    type Error = async_graphql::Error;

    fn try_from(val: SyncBookmarkInput) -> Result<Self, Self::Error> {
        Ok(entities::bookmark::Model {
            identifier: val.identifier,
            title: val.title,
            url: val.url,
            tag: val.tag,
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
