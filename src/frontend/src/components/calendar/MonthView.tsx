import type { CalendarItem } from "@/components/calendar/calendar-utils";
import {
  dayKey,
  isSameDay,
  isSameMonth,
  monthGrid,
} from "@/components/calendar/calendar-utils";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/** Month grid: 6 weeks of day cells with subject chips and completion dots. */
export function MonthView({
  anchor,
  selected,
  itemsByDay,
  onSelectDate,
}: {
  anchor: Date;
  selected: Date;
  itemsByDay: Map<string, CalendarItem[]>;
  onSelectDate: (date: Date) => void;
}) {
  const days = monthGrid(anchor);
  const today = new Date();

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="grid grid-cols-7 border-b border-border bg-muted/40">
        {WEEKDAY_LABELS.map((label) => (
          <div
            key={label}
            className="px-2 py-2 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            {label}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {days.map((day) => {
          const key = dayKey(day);
          const dayItems = itemsByDay.get(key) ?? [];
          const inMonth = isSameMonth(day, anchor);
          const isSelected = isSameDay(day, selected);
          const isToday = isSameDay(day, today);
          const pending = dayItems.filter((item) => !item.completed).length;

          return (
            <button
              key={key}
              type="button"
              data-ocid={`calendar.day.${key}`}
              onClick={() => onSelectDate(day)}
              aria-pressed={isSelected}
              aria-label={`${format(day, "d MMMM yyyy")}, ${dayItems.length} assignments`}
              className={cn(
                "group relative flex min-h-[5.5rem] flex-col gap-1 border-b border-r border-border p-2 text-left transition-smooth last:border-r-0 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:min-h-[7rem]",
                !inMonth && "bg-background/40 opacity-50",
                isSelected && "bg-accent/10 ring-1 ring-inset ring-accent/60",
              )}
            >
              <span className="flex items-center justify-between">
                <span
                  className={cn(
                    "flex size-6 items-center justify-center rounded-full text-xs font-semibold",
                    isToday
                      ? "bg-gradient-primary text-primary-foreground"
                      : "text-foreground",
                  )}
                >
                  {format(day, "d")}
                </span>
                {dayItems.length > 0 && (
                  <span className="text-[0.65rem] font-semibold text-muted-foreground">
                    {dayItems.length}
                  </span>
                )}
              </span>

              <span className="flex flex-col gap-1">
                {dayItems.slice(0, 2).map((item) => (
                  <span
                    key={item.homework.id.toString()}
                    className={cn(
                      "truncate rounded-md px-1.5 py-0.5 text-[0.65rem] font-medium",
                      item.completed
                        ? "bg-[oklch(0.72_0.16_150)]/15 text-[oklch(0.72_0.16_150)] line-through"
                        : "bg-secondary/15 text-secondary",
                    )}
                  >
                    {item.homework.title}
                  </span>
                ))}
                {dayItems.length > 2 && (
                  <span className="px-1.5 text-[0.65rem] font-medium text-muted-foreground">
                    +{dayItems.length - 2} more
                  </span>
                )}
              </span>

              {pending > 0 && (
                <span
                  className="absolute bottom-1.5 right-1.5 size-1.5 rounded-full bg-accent"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
