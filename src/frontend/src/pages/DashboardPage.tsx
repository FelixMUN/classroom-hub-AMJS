import type { HomeworkView } from "@/backend";
import { PageHeader } from "@/components/PageHeader";
import { ErrorState, LoadingState } from "@/components/States";
import { DailyTimetable } from "@/components/dashboard/DailyTimetable";
import { ProfileSummary } from "@/components/dashboard/ProfileSummary";
import { type QuickLink, QuickLinks } from "@/components/dashboard/QuickLinks";
import { StatCard, type StatTone } from "@/components/dashboard/StatCard";
import {
  useCallerProfile,
  useListHomework,
  useListMyCompletions,
  useListTimetableEvents,
} from "@/hooks/useQueries";
import { timestampToDate } from "@/lib/format";
import {
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  ListChecks,
  Megaphone,
  PlusCircle,
  Sparkles,
} from "lucide-react";
import { useMemo } from "react";

const QUICK_LINKS: QuickLink[] = [
  {
    to: "/calendar",
    label: "Calendar",
    description: "See the month at a glance",
    icon: CalendarDays,
    tone: "blue",
  },
  {
    to: "/homework",
    label: "Add homework",
    description: "Log a new assignment",
    icon: PlusCircle,
    tone: "yellow",
  },
  {
    to: "/announcements",
    label: "Announcements",
    description: "Catch up on class news",
    icon: Megaphone,
    tone: "red",
  },
];

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** A task is "daily" when it is due today; everything else is long-term. */
function isDailyTask(homework: HomeworkView, today: Date): boolean {
  const due = timestampToDate(homework.dueDate);
  return due ? isSameDay(due, today) : false;
}

export default function DashboardPage() {
  const profileQuery = useCallerProfile();
  const homeworkQuery = useListHomework();
  const completionsQuery = useListMyCompletions();
  const timetableQuery = useListTimetableEvents();

  const today = useMemo(() => new Date(), []);

  const stats = useMemo(() => {
    const homework = homeworkQuery.data ?? [];
    const completedIds = new Set(
      (completionsQuery.data ?? [])
        .filter((completion) => completion.completed)
        .map((completion) => completion.homeworkId.toString()),
    );

    const daily = homework.filter((item) => isDailyTask(item, today));
    const longTerm = homework.filter((item) => !isDailyTask(item, today));
    const countCompleted = (items: HomeworkView[]) =>
      items.filter((item) => completedIds.has(item.id.toString())).length;

    return {
      dailyTotal: daily.length,
      dailyCompleted: countCompleted(daily),
      longTermTotal: longTerm.length,
      longTermCompleted: countCompleted(longTerm),
    };
  }, [homeworkQuery.data, completionsQuery.data, today]);

  const isLoading =
    profileQuery.isLoading ||
    homeworkQuery.isLoading ||
    completionsQuery.isLoading ||
    timetableQuery.isLoading;

  const isError =
    profileQuery.isError ||
    homeworkQuery.isError ||
    completionsQuery.isError ||
    timetableQuery.isError;

  const retry = () => {
    void profileQuery.refetch();
    void homeworkQuery.refetch();
    void completionsQuery.refetch();
    void timetableQuery.refetch();
  };

  const profile = profileQuery.data ?? null;
  const firstName = profile?.displayName?.trim().split(/\s+/)[0] || "there";

  const statCards: {
    label: string;
    value: number;
    caption: string;
    icon: typeof ListChecks;
    tone: StatTone;
  }[] = [
    {
      label: "Daily tasks",
      value: stats.dailyTotal,
      caption: "Assignments due today",
      icon: ListChecks,
      tone: "blue",
    },
    {
      label: "Daily done",
      value: stats.dailyCompleted,
      caption: "Completed today's work",
      icon: CheckCircle2,
      tone: "yellow",
    },
    {
      label: "Long-term",
      value: stats.longTermTotal,
      caption: "Assignments due later",
      icon: BookOpenCheck,
      tone: "red",
    },
    {
      label: "Long-term done",
      value: stats.longTermCompleted,
      caption: "Completed ahead of time",
      icon: Sparkles,
      tone: "green",
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Overview"
        title={`Welcome back, ${firstName}!`}
        description="Let's smash today's goals."
      />

      {isLoading ? (
        <LoadingState label="Loading your dashboard…" />
      ) : isError ? (
        <ErrorState
          message="We couldn't load your dashboard right now."
          onRetry={retry}
        />
      ) : (
        <>
          <section
            data-ocid="dashboard.stats"
            aria-label="Task statistics"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {statCards.map((card, index) => (
              <StatCard
                key={card.label}
                label={card.label}
                value={card.value}
                caption={card.caption}
                icon={card.icon}
                tone={card.tone}
                index={index + 1}
              />
            ))}
          </section>

          <section className="space-y-4" aria-labelledby="timetable-heading">
            <div className="flex items-center justify-between gap-3">
              <h2
                id="timetable-heading"
                className="font-display text-xl font-bold text-foreground"
              >
                Today's timetable
              </h2>
              <span className="text-sm text-muted-foreground">
                {today.toLocaleDateString(undefined, {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </span>
            </div>
            <DailyTimetable events={timetableQuery.data ?? []} day={today} />
          </section>

          <section className="space-y-4" aria-labelledby="quick-links-heading">
            <h2
              id="quick-links-heading"
              className="font-display text-xl font-bold text-foreground"
            >
              Quick links
            </h2>
            <QuickLinks links={QUICK_LINKS} />
          </section>

          {profile && <ProfileSummary profile={profile} />}
        </>
      )}
    </div>
  );
}
