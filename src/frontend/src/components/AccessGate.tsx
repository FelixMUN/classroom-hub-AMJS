import { SignInButton } from "@/components/InternetIdentity";
import { PendingApproval } from "@/components/PendingApproval";
import { ProfileSetup } from "@/components/ProfileSetup";
import { useCallerProfile, useIsCallerApproved } from "@/hooks/useQueries";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { BookOpenCheck } from "lucide-react";
import type { ReactNode } from "react";

function SignInScreen() {
  return (
    <section
      aria-label="Sign in"
      data-ocid="auth.panel"
      className="flex min-h-dvh flex-col items-center justify-center gap-5 bg-background px-6 text-center"
    >
      <span className="flex size-16 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-highlight">
        <BookOpenCheck className="size-8" aria-hidden="true" />
      </span>
      <h1 className="font-display text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
        CLASSROOM <span className="text-accent">HUB</span>
      </h1>
      <p className="max-w-md text-base text-muted-foreground">
        Your class homework, all in one place. Sign in with Internet Identity to
        see what's due.
      </p>
      <SignInButton className="rounded-xl bg-gradient-primary px-6 py-3 font-semibold text-primary-foreground shadow-highlight transition-smooth hover:brightness-110 disabled:opacity-60" />
    </section>
  );
}

function LoadingScreen({ label }: { label: string }) {
  return (
    <output
      data-ocid="auth.loading_state"
      className="flex min-h-dvh items-center justify-center gap-3 bg-background text-sm text-muted-foreground"
    >
      <span className="size-4 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      {label}
    </output>
  );
}

/**
 * Full access boundary: sign-in → profile setup → admin approval → app content.
 * Private queries live inside this component so they never run while signed out.
 *
 * The backend guards `getCallerProfile` with the approved-member check, so an
 * unapproved caller's profile query rejects. That rejection is the expected
 * pending-approval state, not an error, and must never leave the gate loading.
 */
export function AccessGate({ children }: { children: ReactNode }) {
  const { identity, isInitializing, isLoggingIn } = useInternetIdentity();
  const authenticated = !!identity && !identity.getPrincipal().isAnonymous();

  const profileQuery = useCallerProfile();
  const approvedQuery = useIsCallerApproved();

  if (isInitializing || isLoggingIn) {
    return <LoadingScreen label="Loading your session…" />;
  }

  if (!authenticated) {
    return <SignInScreen />;
  }

  // A rejected profile query means the caller is not approved yet: the backend
  // traps `getCallerProfile` for unapproved callers. Show the pending screen
  // instead of staying on the loading state.
  if (profileQuery.isError) {
    return <PendingApproval />;
  }

  if (profileQuery.isPending) {
    return <LoadingScreen label="Loading your profile…" />;
  }

  if (profileQuery.data === null) {
    return <ProfileSetup />;
  }

  // Approval check: a rejection or a false reply both mean "not approved yet".
  if (approvedQuery.isError) {
    return <PendingApproval />;
  }

  if (approvedQuery.isPending) {
    return <LoadingScreen label="Checking your access…" />;
  }

  if (!approvedQuery.data) {
    return <PendingApproval />;
  }

  return <>{children}</>;
}
