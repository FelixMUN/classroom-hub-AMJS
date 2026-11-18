import { EmptyState } from "@/components/States";
import { HomeworkCard } from "@/components/calendar/HomeworkCard";
import type { CalendarItem } from "@/components/calendar/calendar-utils";
import { format } from "date-fns";
import { CalendarCheck } from "lucide-react";

/** Detail panel for the selected date: that day's homework as cards. */
export function DetailPanel({
  date,
  items,
  onToggle,
  togglingId,
}: {
  date: Date;
  items: CalendarItem[];
  onToggle: (item: CalendarItem) => void;
  togglingId: string | null;
}) {
  const pending = items.filter((item) => !item.completed).length;

  return (
    <section
      aria-label="Selected date homework"
      data-ocid="calendar.detail_panel"
      className="flex flex-col gap-4 rounded-2xl border border-border bg-card/60 p-4 sm:p-5"
    >
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            Selected date
          </p>
          <h2 className="font-display text-xl font-bold text-foreground">
            {format(date, "EEEE d MMMM yyyy")}
          </h2>
        </div>
        <p className="text-sm text-muted-foreground">
          {items.length} assignment{items.length === 1 ? "" : "s"} · {pending}{" "}
          pending
        </p>
      </header>

      {items.length === 0 ? (
        <EmptyState
          icon={CalendarCheck}
          title="No homework on this date"
          description="Select another day on the calendar, or adjust your search and filters to find assignments."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {items.map((item, index) => (
            <HomeworkCard
              key={item.homework.id.toString()}
              item={item}
              index={index}
              onToggle={onToggle}
              isToggling={togglingId === item.homework.id.toString()}
            />
          ))}
        </div>
      )}
    </section>
  );
}
