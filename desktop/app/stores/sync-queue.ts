import { ref } from "vue";
import { useNetwork } from "@vueuse/core";
import { defineStore } from "pinia";
import { useBookmarkStore } from "~/stores/bookmarks";
import { useNoteStore } from "~/stores/notes";
import { useTodoStore } from "~/stores/todo";
import { useWorkspacesStore } from "~/stores/workspaces";
import { useReminderStore } from "~/stores/reminder";
import { useUserPreferenceStore } from "~/stores/workspace-preferences";
import { useSnippetStore } from "~/stores/snippets";
import { useRecycleBinStore } from "~/stores/recycle-bin";
import { useNotificationStore } from "~/stores/notifications";
import { gql } from "@apollo/client";

export const useSyncQueueStore = defineStore("sync_queue_store", () => {
  const { isOnline } = useNetwork();
  const runningSync = ref(false);

  async function preflightCheck(name: string) {
    const query = gql`
      mutation PreflightCheck($name: String!) {
        preflight(name: $name)
      }
    `;

    const variables = { name };

    const { mutate } = useMutation(query, { variables });
    const data = await mutate();
    console.log("Preflight check response:", data);
  }

  async function runSync() {
    if (runningSync.value || !isOnline.value) return;
    runningSync.value = true;
    try {
      await useWorkspacesStore().syncUpstream();
      await Promise.all([
        useBookmarkStore().syncUpstream(),
        useNoteStore().syncUpstream(),
        useTodoStore().syncUpstream(),
        useReminderStore().syncUpstream(),
        useUserPreferenceStore().syncUpstream(),
        useSnippetStore().syncUpstream(),
        useRecycleBinStore().syncUpstream(),
      ]);
      await useNotificationStore().createNotification({
        title: "Sync complete",
        body: "Your data has been synced successfully.",
        notificationType: "BackupSuccess",
      });
    } catch (err) {
      console.error("Error during sync:", err);
      await useNotificationStore().createNotification({
        title: "Sync failed",
        body:
          err instanceof Error ? err.message : "An error occurred during sync.",
        notificationType: "BackupFailed",
      });
    } finally {
      runningSync.value = false;
    }
  }

  return { isOnline, runningSync, preflightCheck, runSync };
});
