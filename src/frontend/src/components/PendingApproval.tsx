import { SignInButton } from "@/components/InternetIdentity";
import { Button } from "@/components/ui/button";
import { useCallerProfile, useRequestApproval } from "@/hooks/useQueries";
import { Clock, ShieldX } from "lucide-react";

/** Blocks all app content until an admin approves the signed-in user's access request. */
export function PendingApproval() {
  const { data: profile } = useCallerProfile();
  const requestApproval = useRequestApproval();
  const rejected = profile?.approval === "rejected";

  return (
    <section
      aria-label="Awaiting approval"
      data-ocid="approval.panel"
      className="flex min-h-dvh items-center justify-center bg-background px-4 py-10"
    >
      <div className="w-full max-w-md animate-fade-up rounded-2xl border border-border bg-card p-6 text-center shadow-elevated sm:p-8">
        <span
          className={
            rejected
              ? "mx-auto flex size-14 items-center justify-center rounded-2xl bg-destructive/15 text-destructive"
              : "mx-auto flex size-14 items-center justify-center rounded-2xl bg-accent/15 text-accent"
          }
        >
          {rejected ? (
            <ShieldX className="size-7" aria-hidden="true" />
          ) : (
            <Clock className="size-7 animate-float" aria-hidden="true" />
          )}
        </span>

        <h1 className="mt-5 font-display text-2xl font-bold text-foreground">
          <span className="marker-underline">
            {rejected ? "Access not granted" : "Waiting for approval"}
          </span>
        </h1>

        <p className="mt-3 text-sm text-muted-foreground">
          {rejected
            ? "Your access request was declined. Ask your teacher to allow you again, then request access once more."
            : `Thanks${profile?.displayName ? `, ${profile.displayName}` : ""}! Your request is with your teacher. You'll get in as soon as it's approved.`}
        </p>

        {!rejected && (
          <p className="mt-4 rounded-xl border border-border bg-muted/40 px-4 py-3 text-xs text-muted-foreground">
            This page refreshes automatically. You can also check again below.
          </p>
        )}

        <div className="mt-6 flex flex-col gap-3">
          <Button
            type="button"
            data-ocid="approval.primary_button"
            onClick={() => requestApproval.mutate()}
            disabled={requestApproval.isPending}
            className="w-full rounded-xl bg-gradient-primary text-primary-foreground shadow-highlight transition-smooth hover:brightness-110"
          >
            {requestApproval.isPending ? "Sending…" : "Request access again"}
          </Button>
          <SignInButton className="w-full rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-smooth hover:border-accent/60 hover:text-foreground" />
        </div>
      </div>
    </section>
  );
}
