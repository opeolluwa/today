use std::sync::Arc;

use sea_orm::DatabaseConnection;
use uuid::Uuid;

use crate::{
  adapters::invitation::{InviteWorkspaceMemberRequest, InviteWorkspaceMemberResponse}, 
  errors::app_error::AppError, 
  repositories::{
    base::Repository,
    invitation::{InvitationRepository, InvitationRepositoryTrait}
  },
};

#[derive(Clone)]
pub struct InvitationService {
  invitation_repository: InvitationRepository,
}

impl InvitationService {
  pub fn init(db_conn: &Arc<DatabaseConnection>) -> Self {
    Self {
      invitation_repository: InvitationRepository::init(db_conn),
    }
  }

  pub async fn invite_member(
    &self,
    workspace_identifier: Uuid,
    _requester_id: &Uuid,
    payload: &InviteWorkspaceMemberRequest,
  ) -> Result<InviteWorkspaceMemberResponse, AppError> {
    if let Some(existing) = self
      .invitation_repository
      .find_by_email_and_workspace(workspace_identifier, &payload.email)
      .await
      .map_err(|e| AppError::DatabaseError(e.to_string()))?
      {
        if existing.status == "pending" {
          return Err(AppError::OperationFailed(
            "An invitation is already pending for this email".into()
          ));
        }
      }

    let token = Uuid::new_v4().to_string();

    let invitation = self
        .invitation_repository
        .create(workspace_identifier, payload, &token)
        .await
        .map_err(|e| AppError::DatabaseError(e.to_string()))?;

    Ok(InviteWorkspaceMemberResponse {
      invitation_id: invitation.identifier.to_string(),
      email: invitation.email,
      status: invitation.status,
    })
  }
}