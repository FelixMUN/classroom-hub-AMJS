import { SubjectBadge } from "@/components/SubjectBadge";
import type { CalendarItem } from "@/components/calendar/calendar-utils";
import { Button } from "@/components/ui/button";
import { formatDate, formatDueLabel, isOverdue } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Check, Circle, Clock } from "lucide-react";

/**
 * Interactive assignment card: subject badge, title, due date and a
 * complete/incomplete toggle that persists per student.
 */
export function HomeworkCard({
  item,
  index,
  onToggle,
  isToggling,
  compact = false,
}: {
  item: CalendarItem;
  index: number;
  onToggle: (item: CalendarItem) => void;
  isToggling: boolean;
  compact?: boolean;
}) {
  const { homework, completed, dueDate } = item;
  const overdue = !completed && isOverdue(homework.dueDate);

  return (
    <article
      data-ocid={`calendar.item.${index}`}
      className={cn(
        "card-hover group relative flex flex-col gap-3 rounded-2xl border bg-card p-4",
        completed
          ? "border-[oklch(0.72_0.16_150)]/40"
          : overdue
            ? "border-destructive/50"
            : "border-border",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <SubjectBadge subject={homework.subject} variant="soft" />
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
            completed
              ? "bg-[oklch(0.72_0.16_150)]/15 text-[oklch(0.72_0.16_150)]"
              : overdue
                ? "bg-destructive/15 text-destructive"
                : "bg-accent/15 text-accent",
          )}
        >
          {completed ? (
            <Check className="size-3" aria-hidden="true" />
          ) : (
            <Clock className="size-3" aria-hidden="true" />
          )}
          {completed ? "Completed" : overdue ? "Overdue" : "Pending"}
        </span>
      </div>

      <div className="min-w-0 space-y-1">
        <h3
          className={cn(
            "font-display text-base font-bold leading-snug text-foreground",
            completed && "text-muted-foreground line-through",
          )}
        >
          {homework.title}
        </h3>
        {!compact && homework.description && (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {homework.description}
          </p>
        )}
      </div>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
        <div className="min-w-0 text-xs text-muted-foreground">
          <p className="font-medium text-foreground">
            {dueDate ? formatDueLabel(homework.dueDate) : "No due date"}
          </p>
          <p>Due {formatDate(homework.dueDate)}</p>
        </div>
        <Button
          type="button"
          size="sm"
          variant={completed ? "outline" : "default"}
          disabled={isToggling}
          onClick={() => onToggle(item)}
          data-ocid={`calendar.toggle.${index}`}
          aria-pressed={completed}
          className={cn(
            "rounded-full transition-smooth",
            completed
              ? "border-[oklch(0.72_0.16_150)]/50 text-[oklch(0.72_0.16_150)] hover:bg-[oklch(0.72_0.16_150)]/10"
              : "bg-gradient-primary text-primary-foreground hover:brightness-110",
          )}
        >
          {completed ? (
            <Circle className="size-3.5" aria-hidden="true" />
          ) : (
            <Check className="size-3.5" aria-hidden="true" />
          )}
          {completed ? "Mark incomplete" : "Mark complete"}
        </Button>
      </div>
    </article>
  );
}
