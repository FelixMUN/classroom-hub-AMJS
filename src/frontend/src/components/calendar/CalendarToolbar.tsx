import type { CalendarView } from "@/components/calendar/calendar-utils";
import { periodLabel } from "@/components/calendar/calendar-utils";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

const VIEWS: Array<{ value: CalendarView; label: string }> = [
  { value: "month", label: "Month" },
  { value: "week", label: "Week" },
  { value: "day", label: "Day" },
];

/** Period navigation plus the month/week/day view switcher. */
export function CalendarToolbar({
  anchor,
  view,
  onViewChange,
  onShift,
  onToday,
}: {
  anchor: Date;
  view: CalendarView;
  onViewChange: (view: CalendarView) => void;
  onShift: (direction: -1 | 1) => void;
  onToday: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => onShift(-1)}
          data-ocid="calendar.pagination_prev"
          aria-label="Previous period"
          className="rounded-full"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => onShift(1)}
          data-ocid="calendar.pagination_next"
          aria-label="Next period"
          className="rounded-full"
        >
          <ChevronRight className="size-4" aria-hidden="true" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onToday}
          data-ocid="calendar.today_button"
          className="rounded-full font-semibold"
        >
          <CalendarDays className="size-4" aria-hidden="true" />
          Today
        </Button>
      </div>

      <p
        data-ocid="calendar.period_label"
        className="font-display text-lg font-bold text-foreground sm:text-center"
      >
        {periodLabel(anchor, view)}
      </p>

      <div
        role="tablist"
        aria-label="Calendar view"
        className="flex items-center gap-1 rounded-full border border-border bg-muted/40 p-1"
      >
        {VIEWS.map((option) => (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={view === option.value}
            data-ocid={`calendar.view.${option.value}`}
            onClick={() => onViewChange(option.value)}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm font-semibold transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              view === option.value
                ? "bg-gradient-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
