import { EmptyState } from "@/components/States";
import { SubjectBadge } from "@/components/SubjectBadge";
import { HomeworkCard } from "@/components/calendar/HomeworkCard";
import type { CalendarItem } from "@/components/calendar/calendar-utils";
import { groupBySubject } from "@/components/calendar/calendar-utils";
import { BookOpenCheck } from "lucide-react";

/** Subject view: assignments grouped by subject across the whole history. */
export function SubjectView({
  items,
  onToggle,
  togglingId,
}: {
  items: CalendarItem[];
  onToggle: (item: CalendarItem) => void;
  togglingId: string | null;
}) {
  const groups = groupBySubject(items);

  if (groups.length === 0) {
    return (
      <EmptyState
        icon={BookOpenCheck}
        title="No homework matches"
        description="No assignments match your current search and filters. Try clearing them to see the full history."
      />
    );
  }

  return (
    <div className="space-y-8">
      {groups.map((group) => {
        const pending = group.items.filter((item) => !item.completed).length;
        return (
          <section
            key={group.subject}
            data-ocid={`calendar.subject_group.${group.subject}`}
            className="space-y-3"
          >
            <header className="flex flex-wrap items-center gap-3">
              <SubjectBadge subject={group.subject} />
              <span className="text-sm text-muted-foreground">
                {group.items.length} assignment
                {group.items.length === 1 ? "" : "s"} · {pending} pending
              </span>
            </header>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {group.items.map((item, index) => (
                <HomeworkCard
                  key={item.homework.id.toString()}
                  item={item}
                  index={index}
                  onToggle={onToggle}
                  isToggling={togglingId === item.homework.id.toString()}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
