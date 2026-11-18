import type {
  CalendarFilters,
  StatusFilter,
} from "@/components/calendar/calendar-utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";

const STATUS_OPTIONS: Array<{ value: StatusFilter; label: string }> = [
  { value: "all", label: "All statuses" },
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
];

/** Search by title/subject plus subject, status and date-range filters. */
export function CalendarFiltersBar({
  filters,
  subjects,
  onChange,
  onReset,
}: {
  filters: CalendarFilters;
  subjects: string[];
  onChange: (patch: Partial<CalendarFilters>) => void;
  onReset: () => void;
}) {
  const active =
    filters.query !== "" ||
    filters.subject !== "all" ||
    filters.status !== "all" ||
    filters.from !== "" ||
    filters.to !== "";

  return (
    <section
      aria-label="Search and filters"
      data-ocid="calendar.filters"
      className="grid grid-cols-1 gap-3 rounded-2xl border border-border bg-card p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
    >
      <div className="space-y-1.5 sm:col-span-2 lg:col-span-1 xl:col-span-2">
        <Label htmlFor="calendar-search">Search</Label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="calendar-search"
            data-ocid="calendar.search_input"
            value={filters.query}
            onChange={(event) => onChange({ query: event.target.value })}
            placeholder="Title or subject"
            className="pl-9"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="calendar-subject">Subject</Label>
        <Select
          value={filters.subject}
          onValueChange={(value) => onChange({ subject: value })}
        >
          <SelectTrigger
            id="calendar-subject"
            data-ocid="calendar.subject_select"
            className="w-full"
          >
            <SelectValue placeholder="All subjects" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All subjects</SelectItem>
            {subjects.map((subject) => (
              <SelectItem key={subject} value={subject}>
                {subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="calendar-status">Status</Label>
        <Select
          value={filters.status}
          onValueChange={(value) => onChange({ status: value as StatusFilter })}
        >
          <SelectTrigger
            id="calendar-status"
            data-ocid="calendar.status_select"
            className="w-full"
          >
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="calendar-from">From</Label>
        <Input
          id="calendar-from"
          type="date"
          data-ocid="calendar.from_input"
          value={filters.from}
          onChange={(event) => onChange({ from: event.target.value })}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="calendar-to">To</Label>
        <Input
          id="calendar-to"
          type="date"
          data-ocid="calendar.to_input"
          value={filters.to}
          onChange={(event) => onChange({ to: event.target.value })}
        />
      </div>

      {active && (
        <div className="flex items-end sm:col-span-2 lg:col-span-3 xl:col-span-6">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onReset}
            data-ocid="calendar.reset_button"
            className="rounded-full text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" aria-hidden="true" />
            Clear filters
          </Button>
        </div>
      )}
    </section>
  );
}
