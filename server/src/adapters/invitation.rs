use serde::{Deserialize, Serialize};
use validator::Validate;

// Body of the POST /workspace/:id/invitations request
#[derive(Debug, Deserialize, Validate, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct InviteWorkspaceMemberRequest {
    #[validate(email)]
    pub email: String,
    pub first_name: Option<String>,
    pub last_name: Option<String>,
}

#[derive(Debug, Serialize)]
pub struct InviteWorkspaceMemberResponse {
    pub invitation_id: String,
    pub email: String,
    pub status: String,
}
