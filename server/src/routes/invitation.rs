use axum::{routing::post, Router};

use crate::{handlers::invitation::invite_workspace_member, states::ServicesState};



pub (super) fn invitation_routes(state: ServicesState) -> Router {
    Router::new()
        .route("/workspaces/{workspace_id}/invitations", post(invite_workspace_member))
        .with_state(state)
}