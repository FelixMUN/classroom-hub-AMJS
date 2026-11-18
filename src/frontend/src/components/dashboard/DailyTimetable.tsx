import type { TimetableView } from "@/backend";
import { EmptyState } from "@/components/States";
import { SubjectBadge } from "@/components/SubjectBadge";
import { formatTime, timestampToDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import { CalendarClock, Clock, DoorOpen, StickyNote } from "lucide-react";
import { useMemo, useState } from "react";

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** Events whose start time falls on the given day, sorted by start time. */
export function eventsForDay(
  events: TimetableView[],
  day: Date,
): TimetableView[] {
  return events
    .filter((event) => {
      const start = timestampToDate(event.startTime);
      return start ? isSameDay(start, day) : false;
    })
    .sort((a, b) => Number(a.startTime - b.startTime));
}

export function DailyTimetable({
  events,
  day,
}: {
  events: TimetableView[];
  day: Date;
}) {
  const [activeId, setActiveId] = useState<bigint | null>(null);
  const todayEvents = useMemo(() => eventsForDay(events, day), [events, day]);

  if (todayEvents.length === 0) {
    return (
      <EmptyState
        icon={CalendarClock}
        title="No classes today"
        description="Your timetable is clear for today. Check the calendar for the rest of the week."
      />
    );
  }

  return (
    <div
      data-ocid="dashboard.timetable"
      className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
    >
      {todayEvents.map((event, index) => {
        const active = activeId === event.id;
        return (
          <button
            key={event.id.toString()}
            type="button"
            data-ocid={`dashboard.timetable.item.${index + 1}`}
            aria-expanded={active}
            onClick={() => setActiveId(active ? null : event.id)}
            onMouseEnter={() => setActiveId(event.id)}
            onMouseLeave={() =>
              setActiveId((current) => (current === event.id ? null : current))
            }
            onFocus={() => setActiveId(event.id)}
            onBlur={() =>
              setActiveId((current) => (current === event.id ? null : current))
            }
            className={cn(
              "group flex flex-col gap-3 rounded-2xl border bg-card/70 p-4 text-left transition-smooth",
              active
                ? "-translate-y-1 border-accent/60 shadow-[0_12px_28px_-10px_oklch(0.86_0.17_92/0.45)]"
                : "border-border hover:border-accent/40",
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <SubjectBadge subject={event.subject} />
              <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                <Clock className="size-3.5" aria-hidden="true" />
                {formatTime(event.startTime)}–{formatTime(event.endTime)}
              </span>
            </div>

            <div
              className={cn(
                "grid overflow-hidden transition-all duration-300",
                active
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="min-h-0 space-y-2 text-sm">
                <p className="flex items-center gap-2 text-foreground">
                  <DoorOpen
                    className="size-4 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  <span className="truncate">
                    {event.room.trim() || "Room to be confirmed"}
                  </span>
                </p>
                {event.notes.trim() && (
                  <p className="flex items-start gap-2 text-muted-foreground">
                    <StickyNote
                      className="mt-0.5 size-4 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    <span className="line-clamp-3">{event.notes}</span>
                  </p>
                )}
              </div>
            </div>

            <p className="text-xs font-medium text-muted-foreground">
              {active
                ? "Tap again to hide details"
                : "Hover or tap for details"}
            </p>
          </button>
        );
      })}
    </div>
  );
}
