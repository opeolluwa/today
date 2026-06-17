use std::sync::Arc;

use uuid::Uuid;
use sea_orm::{ActiveModelTrait, Set, ColumnTrait, DatabaseConnection, EntityTrait, QueryFilter};
use chrono::Utc;


use crate::{
  adapters::invitation::InviteWorkspaceMemberRequest,
  entities::invitation::{self, ActiveModel, Entity as InvitationEntity},
  errors::database_error::DatabaseError,
  repositories::base::Repository,
};

#[derive(Clone)]
pub struct InvitationRepository {
  db_conn: Arc<DatabaseConnection>,
}

impl Repository for InvitationRepository {
  fn init(db_conn: &Arc<DatabaseConnection>) -> Self {
    Self {
      db_conn: db_conn.to_owned(),
    }
  }
}

pub(crate) trait InvitationRepositoryTrait {
  async fn find_by_email_and_workspace(
    &self,
    workspace_identifier: Uuid,
    email: &str,
  ) -> Result<Option<invitation::Model>, DatabaseError>;

  async fn create(
    &self,
    workspace_identifier: Uuid,
    req: &InviteWorkspaceMemberRequest,
    token: &str,
  ) -> Result<invitation::Model, DatabaseError>;
}

impl InvitationRepositoryTrait for InvitationRepository {
    async fn find_by_email_and_workspace(&self, workspace_identifier: Uuid, email: &str) -> Result<Option<invitation::Model>, DatabaseError> {
      InvitationEntity::find()
      .filter(invitation::Column::WorkspaceIdentifier.eq(workspace_identifier))
      .filter(invitation::Column::Email.eq(email))
      .one(self.db_conn.as_ref())
      .await
      .map_err(DatabaseError::from)
    }

    async fn create(
      &self,
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
      model
      .insert(self.db_conn.as_ref())
      .await
      .map_err(DatabaseError::from)
    }
}