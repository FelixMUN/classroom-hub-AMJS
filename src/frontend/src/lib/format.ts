import {
  format,
  formatDistanceToNowStrict,
  isPast,
  isToday,
  isTomorrow,
} from "date-fns";

/**
 * Motoko `Time.now()` values are nanosecond bigints. Convert through this helper
 * before any JavaScript Date operation.
 */
export function timestampToDate(timestamp: bigint): Date | null {
  const date = new Date(Number(timestamp / 1_000_000n));
  return Number.isNaN(date.getTime()) ? null : date;
}

/** Convert a JS Date to the nanosecond bigint the backend expects. */
export function dateToTimestamp(date: Date): bigint {
  return BigInt(date.getTime()) * 1_000_000n;
}

export function formatDate(timestamp: bigint): string {
  const date = timestampToDate(timestamp);
  return date ? format(date, "d MMM yyyy") : "—";
}

export function formatDateTime(timestamp: bigint): string {
  const date = timestampToDate(timestamp);
  return date ? format(date, "d MMM yyyy, HH:mm") : "—";
}

export function formatTime(timestamp: bigint): string {
  const date = timestampToDate(timestamp);
  return date ? format(date, "HH:mm") : "—";
}

export function formatDay(timestamp: bigint): string {
  const date = timestampToDate(timestamp);
  return date ? format(date, "EEE d MMM") : "—";
}

/** Human-friendly due label: "Due today", "Due tomorrow", "Due 3 days ago". */
export function formatDueLabel(timestamp: bigint): string {
  const date = timestampToDate(timestamp);
  if (!date) return "No due date";
  if (isToday(date)) return "Due today";
  if (isTomorrow(date)) return "Due tomorrow";
  if (isPast(date)) return `Overdue by ${formatDistanceToNowStrict(date)}`;
  return `Due in ${formatDistanceToNowStrict(date)}`;
}

export function isOverdue(timestamp: bigint): boolean {
  const date = timestampToDate(timestamp);
  return date ? isPast(date) && !isToday(date) : false;
}

/** Convert a Date to the `yyyy-MM-dd` value an <input type="date"> expects. */
export function toDateInputValue(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

/** Parse an <input type="date"> value into a local Date at noon (avoids TZ drift). */
export function fromDateInputValue(value: string): Date | null {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  const date = new Date(year, month - 1, day, 12, 0, 0, 0);
  return Number.isNaN(date.getTime()) ? null : date;
}
