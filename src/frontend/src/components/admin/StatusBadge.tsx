import type { ApprovalStatus, RequestStatus } from "@/backend";
import { cn } from "@/lib/utils";

type StatusValue = ApprovalStatus | RequestStatus;

const STATUS_STYLES: Record<StatusValue, string> = {
  pending: "border-accent/50 bg-accent/15 text-accent",
  approved:
    "border-[oklch(0.72_0.16_150)]/50 bg-[oklch(0.72_0.16_150)]/15 text-[oklch(0.72_0.16_150)]",
  rejected: "border-destructive/50 bg-destructive/15 text-destructive",
};

const STATUS_LABELS: Record<StatusValue, string> = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
};

export function StatusBadge({
  status,
  className,
}: {
  status: StatusValue;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider",
        STATUS_STYLES[status],
        className,
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
