import { RequestStatus } from "@/backend";
import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, XCircle } from "lucide-react";

const STATUS_META: Record<
  RequestStatus,
  { label: string; icon: typeof Clock; className: string }
> = {
  [RequestStatus.pending]: {
    label: "Pending",
    icon: Clock,
    className: "border-accent/50 bg-accent/15 text-accent",
  },
  [RequestStatus.approved]: {
    label: "Approved",
    icon: CheckCircle2,
    className:
      "border-[oklch(0.72_0.16_150)]/50 bg-[oklch(0.72_0.16_150)]/15 text-[oklch(0.72_0.16_150)]",
  },
  [RequestStatus.rejected]: {
    label: "Rejected",
    icon: XCircle,
    className: "border-destructive/50 bg-destructive/15 text-destructive",
  },
};

export function StatusBadge({
  status,
  className,
}: {
  status: RequestStatus;
  className?: string;
}) {
  const meta = STATUS_META[status];
  const Icon = meta.icon;
  return (
    <span
      data-ocid="submission.status"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider",
        meta.className,
        className,
      )}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {meta.label}
    </span>
  );
}
