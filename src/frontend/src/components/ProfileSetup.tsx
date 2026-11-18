import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegisterProfile } from "@/hooks/useQueries";
import { BookOpenCheck } from "lucide-react";
import { type FormEvent, useState } from "react";

/** First-time profile + access-request form shown to a signed-in user with no profile. */
export function ProfileSetup() {
  const [displayName, setDisplayName] = useState("");
  const [className, setClassName] = useState("");
  const register = useRegisterProfile();

  const canSubmit =
    displayName.trim().length > 0 && className.trim().length > 0;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
    register.mutate({
      displayName: displayName.trim(),
      className: className.trim(),
    });
  }

  return (
    <section
      aria-label="Set up your profile"
      data-ocid="profile.panel"
      className="flex min-h-dvh items-center justify-center bg-background px-4 py-10"
    >
      <div className="w-full max-w-md animate-fade-up rounded-2xl border border-border bg-card p-6 shadow-elevated sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground">
            <BookOpenCheck className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-display text-lg font-extrabold tracking-tight text-foreground">
              CLASSROOM <span className="text-accent">HUB</span>
            </p>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Join the class
            </p>
          </div>
        </div>

        <h1 className="font-display text-2xl font-bold text-foreground">
          <span className="marker-underline">Set up your profile</span>
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Tell us who you are. Your teacher will approve your access before you
          can see the homework.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="displayName">Your name</Label>
            <Input
              id="displayName"
              data-ocid="profile.input"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              placeholder="Alex Morgan"
              autoComplete="name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="className">Class</Label>
            <Input
              id="className"
              data-ocid="profile.input"
              value={className}
              onChange={(event) => setClassName(event.target.value)}
              placeholder="Year 10 — Class B"
              required
            />
          </div>

          {register.isError && (
            <p
              role="alert"
              data-ocid="profile.error_state"
              className="text-sm text-destructive"
            >
              We could not save your profile. Please try again.
            </p>
          )}

          <Button
            type="submit"
            data-ocid="profile.submit_button"
            disabled={!canSubmit || register.isPending}
            className="w-full rounded-xl bg-gradient-primary text-primary-foreground shadow-highlight transition-smooth hover:brightness-110"
          >
            {register.isPending ? "Sending request…" : "Request access"}
          </Button>
        </form>
      </div>
    </section>
  );
}
