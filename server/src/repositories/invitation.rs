

use uuid::Uuid;
use sea_orm::{ActiveModelTrait, Set, ColumnTrait, DatabaseConnection, EntityTrait, QueryFilter};
use chrono::Utc;

use crate::adapters::invitation::InviteWorkspaceMemberRequest;
use crate::entities::invitation::{self, ActiveModel, Entity as InvitationEntity};
use crate::errors::database_error::DatabaseError;

pub struct InvitationRepository;


impl InvitationRepository {
    // Check if an invitation already exists for the given email and workspace
    pub async fn find_by_email_and_workspace(db: &DatabaseConnection, workspace_identifier: Uuid, email: &str) -> Result<Option<invitation::Model>, DatabaseError> {
      InvitationEntity::find()
      .filter(invitation::Column::WorkspaceIdentifier.eq(workspace_identifier))
      .filter(invitation::Column::Email.eq(email))
      .one(db)
      .await
      .map_err(DatabaseError::from)
    }

    pub async fn create(
      db: &DatabaseConnection,
      workspace_identifier: Uuid,
      req: &InviteWorkspaceMemberRequest,
      token: &str,
    ) -> Result<invitation::Model, DatabaseError> {
      let model = ActiveModel {
        identifier: Set(Uuid::new_v4()),
        workspace_identifier: Set(workspace_identifier),
        email: Set(req.email.clone()),
        first_name: Set(req.first_name.clone()),
        last_name: Set(req.last_name.clone()),
        token: Set(token.to_owned()),
        status: Set("pending".to_string()),
        expires_at: Set((Utc::now() + chrono::Duration::days(7)).naive_utc()),
        created_at: Set(Utc::now().naive_utc()),
      };
      model.insert(db).await.map_err(DatabaseError::from)
    }
}