import type { AnnouncementView } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Megaphone, Pencil, Trash2 } from "lucide-react";

export function AnnouncementCard({
  announcement,
  index,
  canManage,
  onEdit,
  onDelete,
  className,
}: {
  announcement: AnnouncementView;
  index: number;
  canManage: boolean;
  onEdit: (announcement: AnnouncementView) => void;
  onDelete: (announcement: AnnouncementView) => void;
  className?: string;
}) {
  return (
    <article
      data-ocid={`announcements.item.${index + 1}`}
      className={cn(
        "card-hover group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card p-5 sm:p-6",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-gradient-highlight opacity-80"
      />
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
          <Megaphone className="size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg font-bold leading-snug text-foreground">
            {announcement.title}
          </h3>
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            {formatDateTime(announcement.publishedAt)}
          </p>
        </div>
        {canManage && (
          <div className="flex shrink-0 items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={`Edit ${announcement.title}`}
              data-ocid={`announcements.edit_button.${index + 1}`}
              className="text-muted-foreground transition-smooth hover:text-accent"
              onClick={() => onEdit(announcement)}
            >
              <Pencil className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={`Delete ${announcement.title}`}
              data-ocid={`announcements.delete_button.${index + 1}`}
              className="text-muted-foreground transition-smooth hover:text-destructive"
              onClick={() => onDelete(announcement)}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        )}
      </div>
      <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-muted-foreground">
        {announcement.body}
      </p>
      <div className="mt-auto flex items-center gap-2">
        <Badge
          variant="outline"
          className="rounded-full border-accent/40 bg-accent/10 font-mono text-[0.65rem] uppercase tracking-wider text-accent"
        >
          Class notice
        </Badge>
      </div>
    </article>
  );
}
