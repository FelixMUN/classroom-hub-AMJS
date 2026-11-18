import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  dateToTimestamp,
  fromDateInputValue,
  toDateInputValue,
} from "@/lib/format";
import { useState } from "react";

export interface HomeworkFormValues {
  subject: string;
  title: string;
  description: string;
  assignedDate: string;
  dueDate: string;
}

export function emptyHomeworkForm(): HomeworkFormValues {
  const today = toDateInputValue(new Date());
  return {
    subject: "",
    title: "",
    description: "",
    assignedDate: today,
    dueDate: today,
  };
}

export function homeworkFormFrom(input: {
  subject: string;
  title: string;
  description: string;
  assignedDate: bigint;
  dueDate: bigint;
}): HomeworkFormValues {
  const assigned = new Date(Number(input.assignedDate / 1_000_000n));
  const due = new Date(Number(input.dueDate / 1_000_000n));
  return {
    subject: input.subject,
    title: input.title,
    description: input.description,
    assignedDate: Number.isNaN(assigned.getTime())
      ? toDateInputValue(new Date())
      : toDateInputValue(assigned),
    dueDate: Number.isNaN(due.getTime())
      ? toDateInputValue(new Date())
      : toDateInputValue(due),
  };
}

/** Convert validated form values into the backend timestamp payload. */
export function toHomeworkPayload(values: HomeworkFormValues): {
  subject: string;
  title: string;
  description: string;
  assignedDate: bigint;
  dueDate: bigint;
} | null {
  const assigned = fromDateInputValue(values.assignedDate);
  const due = fromDateInputValue(values.dueDate);
  if (!assigned || !due) return null;
  return {
    subject: values.subject.trim(),
    title: values.title.trim(),
    description: values.description.trim(),
    assignedDate: dateToTimestamp(assigned),
    dueDate: dateToTimestamp(due),
  };
}

export function HomeworkForm({
  values,
  onChange,
  onSubmit,
  onCancel,
  submitLabel,
  pending,
  error,
  idPrefix,
}: {
  values: HomeworkFormValues;
  onChange: (values: HomeworkFormValues) => void;
  onSubmit: () => void;
  onCancel?: () => void;
  submitLabel: string;
  pending: boolean;
  error?: string | null;
  idPrefix: string;
}) {
  const [touched, setTouched] = useState(false);

  const subjectError = touched && !values.subject.trim();
  const titleError = touched && !values.title.trim();
  const dateError =
    touched &&
    (!values.assignedDate ||
      !values.dueDate ||
      values.dueDate < values.assignedDate);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setTouched(true);
    if (
      !values.subject.trim() ||
      !values.title.trim() ||
      !values.assignedDate ||
      !values.dueDate ||
      values.dueDate < values.assignedDate
    ) {
      return;
    }
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`${idPrefix}-subject`}>Subject</Label>
          <Input
            id={`${idPrefix}-subject`}
            data-ocid="homework.subject.input"
            value={values.subject}
            onChange={(e) => onChange({ ...values, subject: e.target.value })}
            placeholder="e.g. Biology"
            aria-invalid={subjectError}
            autoComplete="off"
          />
          {subjectError && (
            <p
              data-ocid="homework.subject.error"
              className="text-xs font-medium text-destructive"
            >
              Add a subject.
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${idPrefix}-title`}>Title</Label>
          <Input
            id={`${idPrefix}-title`}
            data-ocid="homework.title.input"
            value={values.title}
            onChange={(e) => onChange({ ...values, title: e.target.value })}
            placeholder="e.g. Cell structure worksheet"
            aria-invalid={titleError}
            autoComplete="off"
          />
          {titleError && (
            <p
              data-ocid="homework.title.error"
              className="text-xs font-medium text-destructive"
            >
              Add a title.
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}-description`}>Description</Label>
        <Textarea
          id={`${idPrefix}-description`}
          data-ocid="homework.description.textarea"
          value={values.description}
          onChange={(e) => onChange({ ...values, description: e.target.value })}
          placeholder="What should students do? Include page numbers, questions or links."
          rows={4}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`${idPrefix}-assigned`}>Assigned date</Label>
          <Input
            id={`${idPrefix}-assigned`}
            data-ocid="homework.assigned_date.input"
            type="date"
            value={values.assignedDate}
            onChange={(e) =>
              onChange({ ...values, assignedDate: e.target.value })
            }
            aria-invalid={dateError}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${idPrefix}-due`}>Due date</Label>
          <Input
            id={`${idPrefix}-due`}
            data-ocid="homework.due_date.input"
            type="date"
            value={values.dueDate}
            onChange={(e) => onChange({ ...values, dueDate: e.target.value })}
            aria-invalid={dateError}
          />
        </div>
      </div>

      {dateError && (
        <p
          data-ocid="homework.date.error"
          className="text-xs font-medium text-destructive"
        >
          Pick both dates, with the due date on or after the assigned date.
        </p>
      )}

      {error && (
        <p
          data-ocid="homework.form.error"
          role="alert"
          className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-foreground"
        >
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="submit"
          data-ocid="homework.submit_button"
          disabled={pending}
          className="rounded-full bg-gradient-primary font-semibold text-primary-foreground shadow-none transition-smooth hover:brightness-110"
        >
          {pending ? "Saving…" : submitLabel}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="ghost"
            data-ocid="homework.cancel_button"
            onClick={onCancel}
            disabled={pending}
            className="rounded-full"
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
