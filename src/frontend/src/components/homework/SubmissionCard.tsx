import { SubmissionKind, type SubmissionView } from "@/backend";
import { SubjectBadge } from "@/components/SubjectBadge";
import { StatusBadge } from "@/components/homework/StatusBadge";
import { formatDate } from "@/lib/format";
import { Lightbulb, PlusCircle } from "lucide-react";

export function SubmissionCard({
  submission,
  index,
}: {
  submission: SubmissionView;
  index: number;
}) {
  const isSuggestion = submission.kind === SubmissionKind.editSuggestion;
  const KindIcon = isSuggestion ? Lightbulb : PlusCircle;

  return (
    <article
      data-ocid={`submission.item.${index}`}
      className="card-hover flex flex-col gap-3 rounded-2xl border border-border bg-card p-5"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <KindIcon className="size-4 text-accent" aria-hidden="true" />
          {isSuggestion ? "Edit suggestion" : "New homework"}
        </span>
        <StatusBadge status={submission.status} />
      </div>

      <div className="min-w-0 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <SubjectBadge subject={submission.subject} variant="soft" />
          <h3 className="min-w-0 break-words font-display text-base font-bold text-foreground">
            {submission.title}
          </h3>
        </div>
        {submission.description && (
          <p className="whitespace-pre-line break-words text-sm text-muted-foreground">
            {submission.description}
          </p>
        )}
      </div>

      <dl className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <dt className="font-semibold uppercase tracking-wider">Assigned</dt>
          <dd>{formatDate(submission.assignedDate)}</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <dt className="font-semibold uppercase tracking-wider">Due</dt>
          <dd>{formatDate(submission.dueDate)}</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <dt className="font-semibold uppercase tracking-wider">Sent</dt>
          <dd>{formatDate(submission.submittedAt)}</dd>
        </div>
      </dl>

      {submission.status === "rejected" && submission.adminReason && (
        <p
          data-ocid={`submission.reason.${index}`}
          className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-foreground"
        >
          <span className="font-semibold text-destructive">Reason: </span>
          {submission.adminReason}
        </p>
      )}
    </article>
  );
}
