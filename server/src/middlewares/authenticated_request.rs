use axum::{
    body::Body,
    extract::{FromRequest, FromRequestParts},
    http::{Request, request::Parts},
    response::{IntoResponse, Response},
};

use crate::adapters::jwt::Claims;

// Newtype to bundle authenticated user with payload
pub struct Authed<T> {
    pub user: Claims,
    pub payload: T,
}

// Custom extractor
impl<S, T> FromRequest<S> for Authed<T>
where
    T: FromRequest<S> + Send,
    T::Rejection: IntoResponse,
    Claims: FromRequestParts<S> + Send,
    S: Send + Sync,
{
    type Rejection = Response;

    async fn from_request(
        req: axum::http::Request<Body>,
        state: &S,
    ) -> Result<Self, Self::Rejection> {
        let (parts, body) = req.into_parts();
        let user = Claims::from_request_parts(&mut &parts, state)
            .await
            .map_err(IntoResponse::into_response)?;
        let payload = T::from_request(Request::from_parts(parts, body), state)
            .await
            .map_err(IntoResponse::into_response)?;
        Ok(Self { user, payload })
    }
}
