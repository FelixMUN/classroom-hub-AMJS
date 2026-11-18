import type { TimetableView } from "@/backend";
import { SubjectBadge } from "@/components/SubjectBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export interface TimetableDraft {
  subject: string;
  startTime: bigint;
  endTime: bigint;
  room: string;
  notes: string;
}

/** Convert a `datetime-local` value into a nanosecond bigint. */
function localInputToTimestamp(value: string): bigint | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return BigInt(date.getTime()) * 1_000_000n;
}

export function TimetableEventForm({
  isPending,
  error,
  onSubmit,
  className,
}: {
  isPending: boolean;
  error?: string | null;
  onSubmit: (draft: TimetableDraft) => void;
  className?: string;
}) {
  const [subject, setSubject] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [room, setRoom] = useState("");
  const [notes, setNotes] = useState("");
  const [validation, setValidation] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isPending) return;
    const startTime = localInputToTimestamp(start);
    const endTime = localInputToTimestamp(end);
    if (!subject.trim() || startTime === null || endTime === null) {
      setValidation("Add a subject, start time and end time.");
      return;
    }
    if (endTime <= startTime) {
      setValidation("The end time must be after the start time.");
      return;
    }
    setValidation(null);
    const draft: TimetableDraft = {
      subject: subject.trim(),
      startTime,
      endTime,
      room: room.trim(),
      notes: notes.trim(),
    };
    setSubject("");
    setStart("");
    setEnd("");
    setRoom("");
    setNotes("");
    onSubmit(draft);
  }

  return (
    <form
      onSubmit={handleSubmit}
      data-ocid="admin.timetable_form"
      className={cn(
        "flex flex-col gap-4 rounded-2xl border border-border bg-card p-5",
        className,
      )}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="timetable-subject">Subject</Label>
          <Input
            id="timetable-subject"
            data-ocid="admin.timetable_subject_input"
            value={subject}
            maxLength={80}
            placeholder="Mathematics"
            onChange={(event) => setSubject(event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="timetable-room">Room</Label>
          <Input
            id="timetable-room"
            data-ocid="admin.timetable_room_input"
            value={room}
            maxLength={60}
            placeholder="Room 12"
            onChange={(event) => setRoom(event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="timetable-start">Starts</Label>
          <Input
            id="timetable-start"
            type="datetime-local"
            data-ocid="admin.timetable_start_input"
            value={start}
            onChange={(event) => setStart(event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="timetable-end">Ends</Label>
          <Input
            id="timetable-end"
            type="datetime-local"
            data-ocid="admin.timetable_end_input"
            value={end}
            onChange={(event) => setEnd(event.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="timetable-notes">Notes</Label>
        <Input
          id="timetable-notes"
          data-ocid="admin.timetable_notes_input"
          value={notes}
          maxLength={200}
          placeholder="Bring the textbook and calculator"
          onChange={(event) => setNotes(event.target.value)}
        />
      </div>

      {(validation || error) && (
        <p
          role="alert"
          data-ocid="admin.timetable_error_state"
          className="text-sm text-destructive"
        >
          {validation ?? error}
        </p>
      )}

      <div className="flex justify-end">
        <Button
          type="submit"
          data-ocid="admin.timetable_add_button"
          disabled={isPending}
          className="rounded-xl bg-gradient-primary font-semibold text-primary-foreground transition-smooth hover:brightness-110"
        >
          {isPending ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <Plus className="size-4" aria-hidden="true" />
          )}
          Add event
        </Button>
      </div>
    </form>
  );
}

export function TimetableEventRow({
  event,
  index,
  isPending,
  onDelete,
  className,
}: {
  event: TimetableView;
  index: number;
  isPending: boolean;
  onDelete: () => void;
  className?: string;
}) {
  return (
    <li
      data-ocid={`admin.timetable_row.${index + 1}`}
      className={cn(
        "flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4",
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        <SubjectBadge subject={event.subject} variant="soft" />
        <div className="min-w-0">
          <p className="truncate font-mono text-sm text-foreground">
            {formatTime(event.startTime)} – {formatTime(event.endTime)}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {event.room.trim() || "No room"}
            {event.notes.trim() ? ` · ${event.notes}` : ""}
          </p>
        </div>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        data-ocid={`admin.timetable_delete_button.${index + 1}`}
        disabled={isPending}
        aria-label={`Delete ${event.subject} event`}
        className="shrink-0 text-muted-foreground transition-smooth hover:text-destructive"
        onClick={onDelete}
      >
        {isPending ? (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          <Trash2 className="size-4" />
        )}
      </Button>
    </li>
  );
}
