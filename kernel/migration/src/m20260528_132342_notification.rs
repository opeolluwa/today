use sea_orm_migration::{
    prelude::*, schema::*, sea_orm::DbBackend, sea_query::extension::postgres::Type,
};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        let db_backend = manager.get_database_backend();
        if db_backend == DbBackend::Postgres {
            let has_type = manager
                .get_connection()
                .execute_unprepared("SELECT 1 FROM pg_type WHERE typname = 'notification_type'")
                .await?
                .rows_affected()
                > 0;

            if !has_type {
                manager
                    .create_type(
                        Type::create()
                            .as_enum(NotificationType::Type)
                            .values([
                                NotificationType::BackupFailed,
                                NotificationType::BackupSuccess,
                                NotificationType::WorkspaceInviteReceived,
                                NotificationType::WorkspaceInviteAccepted,
                                NotificationType::WorkspaceInviteDeclined,
                                NotificationType::ItemShared,
                                NotificationType::ItemUnshared,
                                NotificationType::ItemUpdated,
                                NotificationType::ItemDeleted,
                                NotificationType::ItemAccessGranted,
                                NotificationType::ItemAccessRevoked,
                                NotificationType::Generic,
                            ])
                            .to_owned(),
                    )
                    .await?;
            }
        }

        manager
            .create_table(
                Table::create()
                    .table("notifications")
                    .if_not_exists()
                    .col(pk_uuid("identifier"))
                    .col(string("title"))
                    .col(string("body"))
                    .col(
                        enumeration(
                            "notification_type",
                            "notification_type",
                            [
                                NotificationType::BackupFailed,
                                NotificationType::BackupSuccess,
                                NotificationType::WorkspaceInviteReceived,
                                NotificationType::WorkspaceInviteAccepted,
                                NotificationType::WorkspaceInviteDeclined,
                                NotificationType::ItemShared,
                                NotificationType::ItemUnshared,
                                NotificationType::ItemUpdated,
                                NotificationType::ItemDeleted,
                                NotificationType::ItemAccessGranted,
                                NotificationType::ItemAccessRevoked,
                                NotificationType::Generic,
                            ],
                        )
                        .not_null()
                        .default("generic".to_string()),
                    )
                    .col(timestamp_with_time_zone("created_at"))
                    .col(timestamp_with_time_zone("updated_at"))
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .get_connection()
            .execute_unprepared("DROP TYPE IF EXISTS notification_type")
            .await?;

        manager
            .drop_table(Table::drop().table("notifications").to_owned())
            .await
    }
}

#[derive(DeriveIden)]
pub enum NotificationType {
    #[sea_orm(iden = "notification_type")]
    Type,
    BackupFailed,
    BackupSuccess,
    WorkspaceInviteReceived,
    WorkspaceInviteAccepted,
    WorkspaceInviteDeclined,
    ItemShared,
    ItemUnshared,
    ItemUpdated,
    ItemDeleted,
    ItemAccessGranted,
    ItemAccessRevoked,
    Generic,
}
