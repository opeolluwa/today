use almond_kernel::entities;
use almond_kernel::sync_engine::DataQueue;
use sea_orm::{ColumnTrait, DatabaseConnection, EntityTrait, FromQueryResult, Statement};
use seaography::{
    async_graphql::{self, Context},
    CustomFields,
};

use crate::{
    config::AppConfig, errors::app_error::AppError, utils::context::extract_request_context,
};

#[derive(Debug)]
pub struct SyncQueue;

#[CustomFields(rename_fields = "camelCase")]
impl SyncQueue {
    async fn sync_queue(ctx: &Context<'_>, input: DataQueue) -> async_graphql::Result<bool> {
        let req_ctx = extract_request_context(ctx)?;
        let _app_config = AppConfig::from_env()?;

        let filtered = filter_stale_items(req_ctx.db_conn, input).await?;

        if filtered.is_empty() {
            return Ok(true);
        }

        Ok(true)
    }
}

#[derive(Debug, FromQueryResult)]
struct RecordTimestamp {
    updated_at: String,
}

/// Drops any item whose local record was updated more recently than the incoming
/// change — keeping only items where the incoming change is the newer version.
async fn filter_stale_items(
    db: &DatabaseConnection,
    items: DataQueue,
) -> Result<DataQueue, AppError> {
    let backend = db.get_database_backend();
    let mut result = Vec::with_capacity(items.len());

    for item in items {
        let sql = format!(
            "SELECT updated_at FROM \"{}\" WHERE identifier = ?",
            item.table_name
        );
        let stmt =
            Statement::from_sql_and_values(backend, &sql, [item.record_identifier.clone().into()]);

        let local = RecordTimestamp::find_by_statement(stmt)
            .one(db)
            .await
            .map_err(|e| AppError::DatabaseError(e.to_string()))?;

        if let Some(local) = local {
            // Skip if local is already newer than the incoming change timestamp.
            if local.updated_at > item.created_at {
                continue;
            }
        }

        result.push(item);
    }

    Ok(result)
}
