import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      data-ocid="empty_state"
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card/50 px-6 py-14 text-center",
        className,
      )}
    >
      <span className="flex size-14 items-center justify-center rounded-2xl bg-accent/15 text-accent">
        <Icon className="size-7" aria-hidden="true" />
      </span>
      <h3 className="font-display text-xl font-bold text-foreground">
        {title}
      </h3>
      <p className="max-w-md text-sm text-muted-foreground">{description}</p>
      {action}
    </div>
  );
}

export function LoadingState({ label = "Loading…" }: { label?: string }) {
  return (
    <output
      data-ocid="loading_state"
      className="flex items-center justify-center gap-3 rounded-2xl border border-border bg-card/50 px-6 py-14 text-sm text-muted-foreground"
    >
      <span className="size-4 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      {label}
    </output>
  );
}

export function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div
      data-ocid="error_state"
      role="alert"
      className="flex flex-col items-center gap-3 rounded-2xl border border-destructive/40 bg-destructive/10 px-6 py-10 text-center"
    >
      <p className="text-sm font-medium text-foreground">{message}</p>
      {onRetry && (
        <Button
          type="button"
          variant="outline"
          onClick={onRetry}
          data-ocid="retry_button"
        >
          Try again
        </Button>
      )}
    </div>
  );
}
