import type { CompletionView, HomeworkView } from "@/backend";
import { timestampToDate } from "@/lib/format";
import {
  addDays,
  addMonths,
  addWeeks,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";

export type CalendarView = "month" | "week" | "day";
export type StatusFilter = "all" | "completed" | "pending";

/** A homework item paired with the caller's completion state. */
export interface CalendarItem {
  homework: HomeworkView;
  completed: boolean;
  dueDate: Date | null;
  assignedDate: Date | null;
}

export interface CalendarFilters {
  query: string;
  subject: string;
  status: StatusFilter;
  from: string;
  to: string;
}

export const EMPTY_FILTERS: CalendarFilters = {
  query: "",
  subject: "all",
  status: "all",
  from: "",
  to: "",
};

/** Stable `yyyy-MM-dd` key for a Date in local time. */
export function dayKey(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

/** Build the caller's completion lookup keyed by homework id string. */
export function completionMap(
  completions: CompletionView[] | undefined,
): Map<string, boolean> {
  const map = new Map<string, boolean>();
  for (const entry of completions ?? []) {
    map.set(entry.homeworkId.toString(), entry.completed);
  }
  return map;
}

/** Pair homework with completion state and parsed dates. */
export function toCalendarItems(
  homework: HomeworkView[] | undefined,
  completions: Map<string, boolean>,
): CalendarItem[] {
  return (homework ?? []).map((item) => ({
    homework: item,
    completed: completions.get(item.id.toString()) ?? false,
    dueDate: timestampToDate(item.dueDate),
    assignedDate: timestampToDate(item.assignedDate),
  }));
}

/** Apply search, subject, status and date-range filters. */
export function applyFilters(
  items: CalendarItem[],
  filters: CalendarFilters,
): CalendarItem[] {
  const query = filters.query.trim().toLowerCase();
  const from = filters.from ? new Date(`${filters.from}T00:00:00`) : null;
  const to = filters.to ? new Date(`${filters.to}T23:59:59`) : null;

  return items.filter((item) => {
    if (query) {
      const haystack =
        `${item.homework.title} ${item.homework.subject}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    if (
      filters.subject !== "all" &&
      item.homework.subject !== filters.subject
    ) {
      return false;
    }
    if (filters.status === "completed" && !item.completed) return false;
    if (filters.status === "pending" && item.completed) return false;
    if (from && item.dueDate && item.dueDate < from) return false;
    if (to && item.dueDate && item.dueDate > to) return false;
    return true;
  });
}

/** Group items by their due-date key, sorted ascending by due date. */
export function groupByDay(items: CalendarItem[]): Map<string, CalendarItem[]> {
  const groups = new Map<string, CalendarItem[]>();
  for (const item of items) {
    if (!item.dueDate) continue;
    const key = dayKey(item.dueDate);
    const bucket = groups.get(key);
    if (bucket) bucket.push(item);
    else groups.set(key, [item]);
  }
  for (const bucket of groups.values()) {
    bucket.sort(
      (a, b) => (a.dueDate?.getTime() ?? 0) - (b.dueDate?.getTime() ?? 0),
    );
  }
  return groups;
}

/** Group items by subject, sorted alphabetically. */
export function groupBySubject(
  items: CalendarItem[],
): Array<{ subject: string; items: CalendarItem[] }> {
  const groups = new Map<string, CalendarItem[]>();
  for (const item of items) {
    const key = item.homework.subject || "General";
    const bucket = groups.get(key);
    if (bucket) bucket.push(item);
    else groups.set(key, [item]);
  }
  return [...groups.entries()]
    .map(([subject, groupItems]) => ({
      subject,
      items: groupItems.sort(
        (a, b) => (a.dueDate?.getTime() ?? 0) - (b.dueDate?.getTime() ?? 0),
      ),
    }))
    .sort((a, b) => a.subject.localeCompare(b.subject));
}

/** Distinct subject names present in the data, sorted. */
export function subjectOptions(items: CalendarItem[]): string[] {
  return [
    ...new Set(items.map((item) => item.homework.subject).filter(Boolean)),
  ].sort((a, b) => a.localeCompare(b));
}

/** The 6x7 grid of days covering a month, including leading/trailing days. */
export function monthGrid(anchor: Date): Date[] {
  const start = startOfWeek(startOfMonth(anchor), { weekStartsOn: 1 });
  const end = endOfWeek(endOfMonth(anchor), { weekStartsOn: 1 });
  const days: Date[] = [];
  let cursor = start;
  while (cursor <= end) {
    days.push(cursor);
    cursor = addDays(cursor, 1);
  }
  return days;
}

/** The seven days of the week containing the anchor. */
export function weekDays(anchor: Date): Date[] {
  const start = startOfWeek(anchor, { weekStartsOn: 1 });
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}

/** Move the anchor date by one period in the given direction. */
export function shiftPeriod(
  anchor: Date,
  view: CalendarView,
  direction: -1 | 1,
): Date {
  if (view === "month") return addMonths(anchor, direction);
  if (view === "week") return addWeeks(anchor, direction);
  return addDays(anchor, direction);
}

/** Human label for the current period. */
export function periodLabel(anchor: Date, view: CalendarView): string {
  if (view === "month") return format(anchor, "MMMM yyyy");
  if (view === "week") {
    const days = weekDays(anchor);
    const first = days[0];
    const last = days[days.length - 1];
    if (isSameMonth(first, last)) {
      return `${format(first, "d")}–${format(last, "d MMM yyyy")}`;
    }
    return `${format(first, "d MMM")} – ${format(last, "d MMM yyyy")}`;
  }
  return format(anchor, "EEEE d MMMM yyyy");
}

export { isSameDay, isSameMonth };
