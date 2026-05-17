use almond_kernel::entities;
use almond_kernel::entities::sea_orm_active_enums::ItemType;
use seaography::async_graphql;
use seaography::CustomInputType;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(CustomInputType, Debug, Serialize, Deserialize, Clone, PartialEq, Eq)]
#[serde(rename_all = "camelCase")]
#[seaography(input_type_name = "SyncRecycleBinInput")]
pub struct SyncRecycleBinInput {
    pub identifier: Uuid,
    pub item_id: Uuid,
    pub item_type: ItemType,
    pub payload: String,
    pub deleted_at: String,
    pub workspace_identifier: Option<Uuid>,
}

impl TryFrom<SyncRecycleBinInput> for entities::recycle_bin::Model {
    type Error = async_graphql::Error;

    fn try_from(val: SyncRecycleBinInput) -> Result<Self, Self::Error> {
        Ok(entities::recycle_bin::Model {
            identifier: val.identifier,
            item_id: val.item_id,
            item_type: val.item_type,
            payload: val.payload,
            deleted_at: val
                .deleted_at
                .parse()
                .map_err(|e| async_graphql::Error::new(format!("invalid deleted_at: {e}")))?,
            workspace_identifier: val.workspace_identifier,
        })
    }
}
