use axum::extract::{FromRef, FromRequestParts};
use axum::http::request::Parts;
use axum::RequestPartsExt;
use axum_extra::{
    headers::{authorization::Bearer, Authorization},
    TypedHeader,
};

use crate::adapters::jwt::Claims;
use crate::errors::auth_error::AuthenticationError;
use crate::services::authentication_service::{AuthenticationService, AuthenticationServiceTrait};

impl<S> FromRequestParts<S> for Claims
where
    S: Send + Sync,
    AuthenticationService: FromRef<S>,
{
    type Rejection = AuthenticationError;

    async fn from_request_parts(parts: &mut Parts, state: &S) -> Result<Self, Self::Rejection> {
        let TypedHeader(Authorization(bearer)) = parts
            .extract::<TypedHeader<Authorization<Bearer>>>()
            .await
            .map_err(|err| {
                tracing::error!("failed to extract authorization header due to {err}");
                AuthenticationError::MissingCredentials
            })?;

        let claims = Claims::from_token(bearer.token())?;

        let auth_service = AuthenticationService::from_ref(state);
        if auth_service
            .is_token_revoked(&claims)
            .await
            .map_err(|_| AuthenticationError::InvalidToken)?
        {
            return Err(AuthenticationError::InvalidToken);
        }

        Ok(claims)
    }
}
