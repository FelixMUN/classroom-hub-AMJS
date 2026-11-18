import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";

export interface QuickLink {
  to: string;
  label: string;
  description: string;
  icon: LucideIcon;
  tone: "blue" | "yellow" | "red";
}

const TONE_STYLES: Record<QuickLink["tone"], string> = {
  blue: "border-secondary/40 hover:border-secondary/70 hover:bg-secondary/10",
  yellow: "border-accent/40 hover:border-accent/70 hover:bg-accent/10",
  red: "border-primary/40 hover:border-primary/70 hover:bg-primary/10",
};

const ICON_STYLES: Record<QuickLink["tone"], string> = {
  blue: "bg-secondary/15 text-secondary",
  yellow: "bg-accent/15 text-accent",
  red: "bg-primary/15 text-primary",
};

export function QuickLinks({ links }: { links: QuickLink[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {links.map((link, index) => {
        const Icon = link.icon;
        return (
          <Link
            key={link.to}
            to={link.to}
            data-ocid={`dashboard.quick_link.${index + 1}`}
            className={cn(
              "card-hover flex items-center gap-3 rounded-2xl border bg-card/70 p-4 transition-smooth",
              TONE_STYLES[link.tone],
            )}
          >
            <span
              className={cn(
                "flex size-11 shrink-0 items-center justify-center rounded-xl",
                ICON_STYLES[link.tone],
              )}
            >
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block font-display text-base font-bold text-foreground">
                {link.label}
              </span>
              <span className="block truncate text-sm text-muted-foreground">
                {link.description}
              </span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
