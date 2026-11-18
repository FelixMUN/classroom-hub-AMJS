import { PageHeader } from "@/components/PageHeader";
import { ErrorState, LoadingState } from "@/components/States";
import { CalendarFiltersBar } from "@/components/calendar/CalendarFilters";
import { CalendarToolbar } from "@/components/calendar/CalendarToolbar";
import { DayView } from "@/components/calendar/DayView";
import { DetailPanel } from "@/components/calendar/DetailPanel";
import { MonthView } from "@/components/calendar/MonthView";
import { SubjectView } from "@/components/calendar/SubjectView";
import { WeekView } from "@/components/calendar/WeekView";
import {
  type CalendarFilters,
  type CalendarItem,
  type CalendarView,
  EMPTY_FILTERS,
  applyFilters,
  completionMap,
  dayKey,
  groupByDay,
  shiftPeriod,
  subjectOptions,
  toCalendarItems,
} from "@/components/calendar/calendar-utils";
import {
  useListHomework,
  useListMyCompletions,
  useSetCompletion,
} from "@/hooks/useQueries";
import { cn } from "@/lib/utils";
import { LayoutGrid, ListChecks } from "lucide-react";
import { useMemo, useState } from "react";

type Grouping = "daily" | "subject";

export default function CalendarPage() {
  const homeworkQuery = useListHomework();
  const completionsQuery = useListMyCompletions();
  const setCompletion = useSetCompletion();

  const [view, setView] = useState<CalendarView>("month");
  const [grouping, setGrouping] = useState<Grouping>("daily");
  const [anchor, setAnchor] = useState<Date>(() => new Date());
  const [selected, setSelected] = useState<Date>(() => new Date());
  const [filters, setFilters] = useState<CalendarFilters>(EMPTY_FILTERS);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const allItems = useMemo(
    () =>
      toCalendarItems(homeworkQuery.data, completionMap(completionsQuery.data)),
    [homeworkQuery.data, completionsQuery.data],
  );

  const filtered = useMemo(
    () => applyFilters(allItems, filters),
    [allItems, filters],
  );

  const itemsByDay = useMemo(() => groupByDay(filtered), [filtered]);
  const subjects = useMemo(() => subjectOptions(allItems), [allItems]);

  const selectedItems = useMemo(
    () => itemsByDay.get(dayKey(selected)) ?? [],
    [itemsByDay, selected],
  );

  const isLoading =
    homeworkQuery.isLoading ||
    completionsQuery.isLoading ||
    !homeworkQuery.isFetched;

  function handleToggle(item: CalendarItem) {
    const id = item.homework.id.toString();
    setTogglingId(id);
    setCompletion.mutate(
      { homeworkId: item.homework.id, completed: !item.completed },
      { onSettled: () => setTogglingId(null) },
    );
  }

  function handleSelectDate(date: Date) {
    setSelected(date);
    setAnchor(date);
  }

  function handleShift(direction: -1 | 1) {
    const next = shiftPeriod(anchor, view, direction);
    setAnchor(next);
    setSelected(next);
  }

  function handleToday() {
    const now = new Date();
    setAnchor(now);
    setSelected(now);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Schedule"
        title="Calendar"
        description="Browse every assignment by month, week or day — and keep the whole year's history at your fingertips."
      />

      <CalendarToolbar
        anchor={anchor}
        view={view}
        onViewChange={setView}
        onShift={handleShift}
        onToday={handleToday}
      />

      <CalendarFiltersBar
        filters={filters}
        subjects={subjects}
        onChange={(patch) => setFilters((prev) => ({ ...prev, ...patch }))}
        onReset={() => setFilters(EMPTY_FILTERS)}
      />

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          Group by
        </span>
        <div
          role="tablist"
          aria-label="Grouping"
          className="flex items-center gap-1 rounded-full border border-border bg-muted/40 p-1"
        >
          <button
            type="button"
            role="tab"
            aria-selected={grouping === "daily"}
            data-ocid="calendar.grouping.daily"
            onClick={() => setGrouping("daily")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              grouping === "daily"
                ? "bg-gradient-ink text-secondary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <ListChecks className="size-4" aria-hidden="true" />
            Daily View
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={grouping === "subject"}
            data-ocid="calendar.grouping.subject"
            onClick={() => setGrouping("subject")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              grouping === "subject"
                ? "bg-gradient-ink text-secondary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <LayoutGrid className="size-4" aria-hidden="true" />
            Subject View
          </button>
        </div>
      </div>

      {homeworkQuery.isError ? (
        <ErrorState
          message="We couldn't load the homework calendar."
          onRetry={() => void homeworkQuery.refetch()}
        />
      ) : isLoading ? (
        <LoadingState label="Loading your calendar…" />
      ) : grouping === "subject" ? (
        <SubjectView
          items={filtered}
          onToggle={handleToggle}
          togglingId={togglingId}
        />
      ) : (
        <div className="space-y-6">
          {view === "month" && (
            <MonthView
              anchor={anchor}
              selected={selected}
              itemsByDay={itemsByDay}
              onSelectDate={handleSelectDate}
            />
          )}
          {view === "week" && (
            <WeekView
              anchor={anchor}
              selected={selected}
              itemsByDay={itemsByDay}
              onSelectDate={handleSelectDate}
            />
          )}
          {view === "day" && (
            <DayView
              date={selected}
              items={selectedItems}
              onToggle={handleToggle}
              togglingId={togglingId}
            />
          )}

          {view !== "day" && (
            <DetailPanel
              date={selected}
              items={selectedItems}
              onToggle={handleToggle}
              togglingId={togglingId}
            />
          )}
        </div>
      )}
    </div>
  );
}
