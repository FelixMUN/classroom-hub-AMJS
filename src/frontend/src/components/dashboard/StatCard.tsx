import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export type StatTone = "blue" | "yellow" | "red" | "green";

const TONE_STYLES: Record<
  StatTone,
  { frame: string; label: string; value: string; icon: string }
> = {
  blue: {
    frame:
      "border-secondary/50 hover:shadow-[0_12px_28px_-10px_oklch(0.6_0.18_250/0.5)]",
    label: "bg-secondary text-secondary-foreground",
    value: "text-secondary",
    icon: "text-secondary",
  },
  yellow: {
    frame:
      "border-accent/50 hover:shadow-[0_12px_28px_-10px_oklch(0.86_0.17_92/0.5)]",
    label: "bg-accent text-accent-foreground",
    value: "text-accent",
    icon: "text-accent",
  },
  red: {
    frame:
      "border-primary/50 hover:shadow-[0_12px_28px_-10px_oklch(0.52_0.21_25/0.55)]",
    label: "bg-primary text-primary-foreground",
    value: "text-primary",
    icon: "text-primary",
  },
  green: {
    frame:
      "border-[oklch(0.72_0.16_150)]/50 hover:shadow-[0_12px_28px_-10px_oklch(0.72_0.16_150/0.5)]",
    label: "bg-[oklch(0.72_0.16_150)] text-[oklch(0.14_0.02_150)]",
    value: "text-[oklch(0.72_0.16_150)]",
    icon: "text-[oklch(0.72_0.16_150)]",
  },
};

export function StatCard({
  label,
  value,
  caption,
  icon: Icon,
  tone,
  index,
}: {
  label: string;
  value: number;
  caption: string;
  icon: LucideIcon;
  tone: StatTone;
  index: number;
}) {
  const styles = TONE_STYLES[tone];
  return (
    <article
      data-ocid={`dashboard.stat_card.${index}`}
      className={cn(
        "card-hover flex flex-col gap-4 rounded-2xl border bg-card/70 p-5 backdrop-blur-sm",
        styles.frame,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={cn(
            "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider",
            styles.label,
          )}
        >
          {label}
        </span>
        <Icon className={cn("size-5", styles.icon)} aria-hidden="true" />
      </div>
      <p
        className={cn(
          "font-display text-5xl font-extrabold leading-none tabular-nums",
          styles.value,
        )}
      >
        {value}
      </p>
      <p className="text-sm text-muted-foreground">{caption}</p>
    </article>
  );
}
