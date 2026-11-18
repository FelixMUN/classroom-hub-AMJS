import { EmptyState } from "@/components/States";
import { HomeworkCard } from "@/components/calendar/HomeworkCard";
import type { CalendarItem } from "@/components/calendar/calendar-utils";
import { format } from "date-fns";
import { CalendarCheck } from "lucide-react";

/** Day view: the selected day's assignments as full interactive cards. */
export function DayView({
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
  if (items.length === 0) {
    return (
      <EmptyState
        icon={CalendarCheck}
        title="Nothing due this day"
        description={`No homework is scheduled for ${format(date, "EEEE d MMMM yyyy")}. Pick another date or clear your filters.`}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
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
  );
}
