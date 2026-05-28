use std::fmt;

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Tag {
    Development,
    Inspiration,
    Design,
    Research,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub enum ItemType {
    Todo,
    Note,
    Reminder,
    Snippet,
    Bookmark,
}

impl fmt::Display for ItemType {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            ItemType::Todo => write!(f, "todo"),
            ItemType::Note => write!(f, "note"),
            ItemType::Reminder => write!(f, "reminder"),
            ItemType::Snippet => write!(f, "snippet"),
            ItemType::Bookmark => write!(f, "bookmark"),
            // ItemType::Workspace => write!(f, "workspace"),
        }
    }
}

impl fmt::Display for Tag {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Tag::Development => write!(f, "development"),
            Tag::Inspiration => write!(f, "inspiration"),
            Tag::Design => write!(f, "design"),
            Tag::Research => write!(f, "research"),
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum NotificationType {
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

impl fmt::Display for NotificationType {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            NotificationType::BackupFailed => write!(f, "backup_failed"),
            NotificationType::BackupSuccess => write!(f, "backup_success"),
            NotificationType::WorkspaceInviteReceived => write!(f, "workspace_invite_received"),
            NotificationType::WorkspaceInviteAccepted => write!(f, "workspace_invite_accepted"),
            NotificationType::WorkspaceInviteDeclined => write!(f, "workspace_invite_declined"),
            NotificationType::ItemShared => write!(f, "item_shared"),
            NotificationType::ItemUnshared => write!(f, "item_unshared"),
            NotificationType::ItemUpdated => write!(f, "item_updated"),
            NotificationType::ItemDeleted => write!(f, "item_deleted"),
            NotificationType::ItemAccessGranted => write!(f, "item_access_granted"),
            NotificationType::ItemAccessRevoked => write!(f, "item_access_revoked"),
            NotificationType::Generic => write!(f, "generic"),
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Priority {
    High,
    Medium,
    Low,
}

impl fmt::Display for Priority {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Priority::High => write!(f, "high"),
            Priority::Medium => write!(f, "medium"),
            Priority::Low => write!(f, "low"),
        }
    }
}
