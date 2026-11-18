import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Check, Loader2, X } from "lucide-react";
import { type ReactNode, useState } from "react";

/**
 * One approval queue row: a summary block plus approve/reject actions with an
 * optional reason. The reason input is shared by both actions.
 */
export function ApprovalQueueItem({
  index,
  ocidPrefix,
  title,
  subtitle,
  meta,
  body,
  isPending,
  onApprove,
  onReject,
  className,
}: {
  index: number;
  ocidPrefix: string;
  title: string;
  subtitle?: string;
  meta?: ReactNode;
  body?: string;
  isPending: boolean;
  onApprove: (reason: string | null) => void;
  onReject: (reason: string | null) => void;
  className?: string;
}) {
  const [reason, setReason] = useState("");

  function withReason(): string | null {
    const trimmed = reason.trim();
    return trimmed.length > 0 ? trimmed : null;
  }

  return (
    <article
      data-ocid={`${ocidPrefix}.item.${index + 1}`}
      className={cn(
        "card-hover flex flex-col gap-4 rounded-2xl border border-border bg-card p-5",
        className,
      )}
    >
      <div className="min-w-0 space-y-1">
        <h3 className="font-display text-base font-bold leading-snug text-foreground">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
        {meta && (
          <div className="flex flex-wrap items-center gap-2 pt-1">{meta}</div>
        )}
      </div>

      {body && (
        <p className="whitespace-pre-wrap break-words rounded-xl bg-muted/40 p-3 text-sm leading-relaxed text-muted-foreground">
          {body}
        </p>
      )}

      <div className="space-y-2">
        <label
          htmlFor={`${ocidPrefix}-reason-${index}`}
          className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
        >
          Reason (optional)
        </label>
        <Input
          id={`${ocidPrefix}-reason-${index}`}
          data-ocid={`${ocidPrefix}.reason_input.${index + 1}`}
          value={reason}
          maxLength={280}
          placeholder="Add a note for the student"
          onChange={(event) => setReason(event.target.value)}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          data-ocid={`${ocidPrefix}.approve_button.${index + 1}`}
          disabled={isPending}
          className="rounded-xl bg-gradient-primary font-semibold text-primary-foreground transition-smooth hover:brightness-110"
          onClick={() => onApprove(withReason())}
        >
          {isPending ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <Check className="size-4" aria-hidden="true" />
          )}
          Approve
        </Button>
        <Button
          type="button"
          variant="outline"
          data-ocid={`${ocidPrefix}.reject_button.${index + 1}`}
          disabled={isPending}
          className="rounded-xl border-destructive/50 text-destructive transition-smooth hover:bg-destructive/10 hover:text-destructive"
          onClick={() => onReject(withReason())}
        >
          <X className="size-4" aria-hidden="true" />
          Reject
        </Button>
      </div>
    </article>
  );
}
