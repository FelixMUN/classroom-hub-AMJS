import { ApprovalStatus, Role } from "@/backend";
import type { UserView } from "@/backend";
import { cn } from "@/lib/utils";
import {
  BadgeCheck,
  GraduationCap,
  ShieldCheck,
  UserRound,
} from "lucide-react";

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const APPROVAL_LABEL: Record<ApprovalStatus, string> = {
  [ApprovalStatus.approved]: "Approved",
  [ApprovalStatus.pending]: "Pending approval",
  [ApprovalStatus.rejected]: "Access rejected",
};

const APPROVAL_STYLE: Record<ApprovalStatus, string> = {
  [ApprovalStatus.approved]:
    "border-[oklch(0.72_0.16_150)]/50 bg-[oklch(0.72_0.16_150)]/15 text-[oklch(0.72_0.16_150)]",
  [ApprovalStatus.pending]: "border-accent/50 bg-accent/15 text-accent",
  [ApprovalStatus.rejected]: "border-primary/50 bg-primary/15 text-primary",
};

export function ProfileSummary({ profile }: { profile: UserView }) {
  const name = profile.displayName.trim() || "Classmate";
  const isAdmin = profile.role === Role.admin;

  return (
    <section
      data-ocid="dashboard.profile_summary"
      className="flex flex-col gap-4 rounded-2xl border border-border bg-card/70 p-5 sm:flex-row sm:items-center"
    >
      <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-primary font-display text-2xl font-extrabold text-primary-foreground">
        {initials(name)}
      </span>
      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="truncate font-display text-xl font-bold text-foreground">
            {name}
          </h2>
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
              isAdmin
                ? "border-secondary/50 bg-secondary/15 text-secondary"
                : "border-border bg-muted/60 text-muted-foreground",
            )}
          >
            {isAdmin ? (
              <ShieldCheck className="size-3.5" aria-hidden="true" />
            ) : (
              <GraduationCap className="size-3.5" aria-hidden="true" />
            )}
            {isAdmin ? "Admin" : "Student"}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <UserRound className="size-4" aria-hidden="true" />
            {profile.className.trim() || "No class set"}
          </span>
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
              APPROVAL_STYLE[profile.approval],
            )}
          >
            <BadgeCheck className="size-3.5" aria-hidden="true" />
            {APPROVAL_LABEL[profile.approval]}
          </span>
        </div>
      </div>
    </section>
  );
}
