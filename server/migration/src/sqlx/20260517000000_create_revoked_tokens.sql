CREATE TABLE revoked_tokens (
    identifier UUID PRIMARY KEY NOT NULL,
    jti UUID UNIQUE NOT NULL,
    user_identifier UUID NOT NULL REFERENCES users (identifier) ON DELETE CASCADE,
    expires_at TIMESTAMPTZ NOT NULL,
    revoked_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX revoked_tokens_jti_idx ON revoked_tokens (jti);
CREATE INDEX revoked_tokens_expires_at_idx ON revoked_tokens (expires_at);
