import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";

export interface AnnouncementDraft {
  title: string;
  body: string;
}

export function AnnouncementComposer({
  onSubmit,
  isPending,
  error,
  className,
}: {
  onSubmit: (draft: AnnouncementDraft) => void;
  isPending: boolean;
  error?: string | null;
  className?: string;
}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const canSubmit = title.trim().length > 0 && body.trim().length > 0;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit || isPending) return;
    const draft = { title: title.trim(), body: body.trim() };
    setTitle("");
    setBody("");
    onSubmit(draft);
  }

  return (
    <form
      onSubmit={handleSubmit}
      data-ocid="announcements.composer"
      className={cn(
        "flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:p-6",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground">
          <Send className="size-4" aria-hidden="true" />
        </span>
        <h2 className="font-display text-lg font-bold text-foreground">
          Publish an announcement
        </h2>
      </div>

      <div className="space-y-2">
        <Label htmlFor="announcement-title">Title</Label>
        <Input
          id="announcement-title"
          data-ocid="announcements.title_input"
          value={title}
          maxLength={120}
          placeholder="Field trip permission slips due Friday"
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="announcement-body">Message</Label>
        <Textarea
          id="announcement-body"
          data-ocid="announcements.body_textarea"
          value={body}
          rows={4}
          maxLength={2000}
          placeholder="Share the details your class needs to know."
          onChange={(event) => setBody(event.target.value)}
        />
      </div>

      {error && (
        <p
          role="alert"
          data-ocid="announcements.error_state"
          className="text-sm text-destructive"
        >
          {error}
        </p>
      )}

      <div className="flex justify-end">
        <Button
          type="submit"
          data-ocid="announcements.publish_button"
          disabled={!canSubmit || isPending}
          className="rounded-xl bg-gradient-primary font-semibold text-primary-foreground transition-smooth hover:brightness-110"
        >
          {isPending ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="size-4" aria-hidden="true" />
          )}
          {isPending ? "Publishing…" : "Publish"}
        </Button>
      </div>
    </form>
  );
}
