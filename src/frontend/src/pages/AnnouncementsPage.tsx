import type { AnnouncementView } from "@/backend";
import { PageHeader } from "@/components/PageHeader";
import { EmptyState, ErrorState, LoadingState } from "@/components/States";
import { AnnouncementCard } from "@/components/announcements/AnnouncementCard";
import { AnnouncementComposer } from "@/components/announcements/AnnouncementComposer";
import { AnnouncementEditDialog } from "@/components/announcements/AnnouncementEditDialog";
import {
  useDeleteAnnouncement,
  useIsCallerAdmin,
  useListAnnouncements,
  usePublishAnnouncement,
  useUpdateAnnouncement,
} from "@/hooks/useQueries";
import { Megaphone } from "lucide-react";
import { useMemo, useState } from "react";

export default function AnnouncementsPage() {
  const { data: isAdmin } = useIsCallerAdmin();
  const announcementsQuery = useListAnnouncements();
  const publish = usePublishAnnouncement();
  const update = useUpdateAnnouncement();
  const remove = useDeleteAnnouncement();

  const [editing, setEditing] = useState<AnnouncementView | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  const announcements = useMemo(() => {
    const list = announcementsQuery.data ?? [];
    return [...list].sort((a, b) =>
      a.publishedAt === b.publishedAt
        ? Number(b.id - a.id)
        : Number(b.publishedAt - a.publishedAt),
    );
  }, [announcementsQuery.data]);

  function openEdit(announcement: AnnouncementView) {
    setEditing(announcement);
    setEditOpen(true);
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Class news"
        title="Announcements"
        description="Updates from your teacher, newest first."
      />

      {isAdmin && (
        <AnnouncementComposer
          isPending={publish.isPending}
          error={
            publish.isError ? "Could not publish. Please try again." : null
          }
          onSubmit={(draft) => publish.mutate(draft)}
        />
      )}

      {announcementsQuery.isLoading ? (
        <LoadingState label="Loading announcements…" />
      ) : announcementsQuery.isError ? (
        <ErrorState
          message="We couldn't load the announcements."
          onRetry={() => void announcementsQuery.refetch()}
        />
      ) : announcements.length === 0 ? (
        <EmptyState
          icon={Megaphone}
          title="No announcements yet"
          description={
            isAdmin
              ? "Publish your first announcement to keep the class in the loop."
              : "When your teacher posts an update, it will show up here."
          }
        />
      ) : (
        <ul
          data-ocid="announcements.list"
          className="grid gap-4 sm:grid-cols-2 lg:gap-6"
        >
          {announcements.map((announcement, index) => (
            <li key={announcement.id.toString()} className="flex">
              <AnnouncementCard
                announcement={announcement}
                index={index}
                canManage={!!isAdmin}
                onEdit={openEdit}
                onDelete={(item) => remove.mutate(item.id)}
                className="w-full"
              />
            </li>
          ))}
        </ul>
      )}

      <AnnouncementEditDialog
        announcement={editing}
        open={editOpen}
        onOpenChange={setEditOpen}
        isPending={update.isPending}
        error={
          update.isError ? "Could not save changes. Please try again." : null
        }
        onSave={(draft) =>
          update.mutate(draft, { onSuccess: () => setEditOpen(false) })
        }
      />
    </div>
  );
}
