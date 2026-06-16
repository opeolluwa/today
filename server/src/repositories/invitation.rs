use uuid::Uuid;
use sea_orm::{ActiveModelTrait, Set, ColumnTrait, DatabaseConnection, EntityTrait, QueryFilter};
use chrono::Utc;

use crate::entities::invitation::{self, ActiveModel, Entity as InvitationEntity};
use crate::errors::database_error::DatabaseError;

pub struct InvitationRepository;


impl InvitationRepository {
    // Check if an invitation already exists for the given email and workspace
    pub async fn find_by_email_and_workspace(db: &DatabaseConnection, workspace_id: Uuid, email: &str) -> Result<Option<invitation::Model>, DatabaseError> {
      InvitationEntity::find()
      .filter(invitation::Column::WorkspaceId.eq(workspace_id))
      .filter(invitation::Column::Email.eq(email))
      .one(db)
      .await
      .map_err(DatabaseError::from)
    }

    pub async fn create(db: &DatabaseConnection, workspace_id: Uuid, email: String, first_name: Option<String>, last_name: Option<String>, token: String) -> Result<invitation::Model, DatabaseError> {
      let model = ActiveModel {
        id: Set(Uuid::new_v4()),
        workspace_id: Set(workspace_id),
        email: Set(email),
        first_name: Set(first_name),
        last_name: Set(last_name),
        token: Set(token),
        status: Set("pending".to_string()),
        expires_at: Set((Utc::now() + chrono::Duration::days(7)).naive_utc()),
        created_at: Set(Utc::now().naive_utc()),
      };
      model.insert(db).await.map_err(DatabaseError::from)
    }
}