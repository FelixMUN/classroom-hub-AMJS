import type { HomeworkView } from "@/backend";
import { SubjectBadge } from "@/components/SubjectBadge";
import { Button } from "@/components/ui/button";
import { formatDate, formatDueLabel, isOverdue } from "@/lib/format";
import { cn } from "@/lib/utils";
import { CalendarClock, Pencil, Trash2 } from "lucide-react";

export function HomeworkCard({
  homework,
  isAdmin,
  onEdit,
  onDelete,
  onSuggestEdit,
  index,
}: {
  homework: HomeworkView;
  isAdmin: boolean;
  onEdit: (homework: HomeworkView) => void;
  onDelete: (homework: HomeworkView) => void;
  onSuggestEdit: (homework: HomeworkView) => void;
  index: number;
}) {
  const overdue = isOverdue(homework.dueDate);

  return (
    <article
      data-ocid={`homework.item.${index}`}
      className="card-hover group flex flex-col gap-4 rounded-2xl border border-border bg-card p-5"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <SubjectBadge subject={homework.subject} />
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
            overdue
              ? "bg-destructive/15 text-destructive"
              : "bg-muted text-muted-foreground",
          )}
        >
          <CalendarClock className="size-3.5" aria-hidden="true" />
          {formatDueLabel(homework.dueDate)}
        </span>
      </div>

      <div className="min-w-0 space-y-2">
        <h3 className="font-display text-lg font-bold leading-snug text-foreground">
          {homework.title}
        </h3>
        {homework.description && (
          <p className="whitespace-pre-line break-words text-sm text-muted-foreground">
            {homework.description}
          </p>
        )}
      </div>

      <dl className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <dt className="font-semibold uppercase tracking-wider">Assigned</dt>
          <dd>{formatDate(homework.assignedDate)}</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <dt className="font-semibold uppercase tracking-wider">Due</dt>
          <dd>{formatDate(homework.dueDate)}</dd>
        </div>
      </dl>

      <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-border pt-4">
        {isAdmin ? (
          <>
            <Button
              type="button"
              variant="outline"
              size="sm"
              data-ocid={`homework.edit_button.${index}`}
              onClick={() => onEdit(homework)}
              className="rounded-full border-secondary/50 text-secondary transition-smooth hover:bg-secondary/15 hover:text-secondary"
            >
              <Pencil className="size-3.5" aria-hidden="true" />
              Edit
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              data-ocid={`homework.delete_button.${index}`}
              onClick={() => onDelete(homework)}
              className="rounded-full border-destructive/50 text-destructive transition-smooth hover:bg-destructive/15 hover:text-destructive"
            >
              <Trash2 className="size-3.5" aria-hidden="true" />
              Delete
            </Button>
          </>
        ) : (
          <Button
            type="button"
            variant="outline"
            size="sm"
            data-ocid={`homework.suggest_button.${index}`}
            onClick={() => onSuggestEdit(homework)}
            className="rounded-full border-accent/50 text-accent transition-smooth hover:bg-accent/15 hover:text-accent"
          >
            <Pencil className="size-3.5" aria-hidden="true" />
            Suggest an edit
          </Button>
        )}
      </div>
    </article>
  );
}
