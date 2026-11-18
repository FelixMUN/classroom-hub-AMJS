import type { ReactNode } from "react";

/** Decorative page heading with the signature highlighter-marker underline. */
export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0 space-y-2">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          <span className="marker-underline">{title}</span>
        </h1>
        {description && (
          <p className="max-w-2xl text-base text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  );
}
