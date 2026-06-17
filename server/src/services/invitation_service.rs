use std::sync::Arc;
use sea_orm::DatabaseConnection;
use uuid::Uuid;

use crate::{adapters::invitation::{InviteWorkspaceMemberRequest, InviteWorkspaceMemberResponse}, errors::app_error::AppError, repositories::invitation::InvitationRepository};

#[derive(Clone)]
pub struct InvitationService {
  db: Arc<DatabaseConnection>,
}

impl InvitationService {
  pub fn init(db_conn: &Arc<DatabaseConnection>) -> Self {
    Self {
      db: db_conn.clone(),
    }
  }

  pub async fn invite_member(
    &self,
    workspace_id: Uuid,
    _requester_id: &Uuid,
    payload: InviteWorkspaceMemberRequest,
  ) -> Result<InviteWorkspaceMemberResponse, AppError> {
    let db = self.db.as_ref();

    if let Some(existing) = InvitationRepository::find_by_email_and_workspace(db, workspace_id, &payload.email).await.map_err(|e| AppError::DatabaseError(e.to_string()))?
     {
      if existing.status == "pending" {
        return Err(AppError::OperationFailed("An invitation is already pending for this email".into()));
      }
    }

    let token = Uuid::new_v4().to_string();

    let invitation = InvitationRepository::create(
      db,
      workspace_id,
      payload.email,
      payload.first_name,
      payload.last_name,
      token,
    ).await.map_err(|e| AppError::DatabaseError(e.to_string()))?;

    Ok(InviteWorkspaceMemberResponse {
      invitation_id: invitation.identifier.to_string(),
      email: invitation.email,
      status: invitation.status,
    })
  }
}