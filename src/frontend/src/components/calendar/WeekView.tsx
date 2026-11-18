import type { CalendarItem } from "@/components/calendar/calendar-utils";
import {
  dayKey,
  isSameDay,
  weekDays,
} from "@/components/calendar/calendar-utils";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

/** Week view: seven day columns, each listing that day's assignments. */
export function WeekView({
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
  const days = weekDays(anchor);
  const today = new Date();

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-7">
      {days.map((day) => {
        const key = dayKey(day);
        const dayItems = itemsByDay.get(key) ?? [];
        const isSelected = isSameDay(day, selected);
        const isToday = isSameDay(day, today);

        return (
          <button
            key={key}
            type="button"
            data-ocid={`calendar.weekday.${key}`}
            onClick={() => onSelectDate(day)}
            aria-pressed={isSelected}
            className={cn(
              "flex min-h-[9rem] flex-col gap-2 rounded-2xl border bg-card p-3 text-left transition-smooth hover:border-accent/50 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isSelected
                ? "border-accent/70 ring-1 ring-accent/40"
                : "border-border",
            )}
          >
            <span className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {format(day, "EEE")}
              </span>
              <span
                className={cn(
                  "flex size-7 items-center justify-center rounded-full text-sm font-bold",
                  isToday
                    ? "bg-gradient-primary text-primary-foreground"
                    : "text-foreground",
                )}
              >
                {format(day, "d")}
              </span>
            </span>

            <span className="flex flex-1 flex-col gap-1.5">
              {dayItems.length === 0 ? (
                <span className="text-xs text-muted-foreground">
                  No homework
                </span>
              ) : (
                dayItems.map((item) => (
                  <span
                    key={item.homework.id.toString()}
                    className={cn(
                      "truncate rounded-lg px-2 py-1 text-xs font-medium",
                      item.completed
                        ? "bg-[oklch(0.72_0.16_150)]/15 text-[oklch(0.72_0.16_150)] line-through"
                        : "bg-secondary/15 text-secondary",
                    )}
                  >
                    {item.homework.title}
                  </span>
                ))
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
