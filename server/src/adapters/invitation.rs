use serde::{Deserialize, Serialize};

// Body of the POST /workspace/:id/invitations request
#[derive(Debug, Deserialize)]
pub struct InviteWorkspaceMemberRequest {
  pub email: String,
  pub first_name: Option<String>,
  pub last_name: Option<String>,
}

// Response body returned after successful invitation
#[derive(Debug, Serialize)]
pub struct InviteWorkspaceMemberResponse {
  pub invitation_id: String,
  pub email: String,
  pub status: String,
}