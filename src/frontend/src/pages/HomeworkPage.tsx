import { type HomeworkView, SubmissionKind } from "@/backend";
import { PageHeader } from "@/components/PageHeader";
import { EmptyState, ErrorState, LoadingState } from "@/components/States";
import { HomeworkCard } from "@/components/homework/HomeworkCard";
import {
  HomeworkForm,
  type HomeworkFormValues,
  emptyHomeworkForm,
  homeworkFormFrom,
  toHomeworkPayload,
} from "@/components/homework/HomeworkForm";
import { SubmissionCard } from "@/components/homework/SubmissionCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  useAddHomework,
  useDeleteHomework,
  useIsCallerAdmin,
  useListHomework,
  useListMySubmissions,
  useSubmitHomework,
  useUpdateHomework,
} from "@/hooks/useQueries";
import { BookOpenCheck, Inbox, Plus, Sparkles } from "lucide-react";
import { useState } from "react";

type FormMode =
  | { kind: "closed" }
  | { kind: "create" }
  | { kind: "submit" }
  | { kind: "edit"; homework: HomeworkView }
  | { kind: "suggest"; homework: HomeworkView };

export default function HomeworkPage() {
  const { data: isAdmin } = useIsCallerAdmin();
  const homeworkQuery = useListHomework();
  const submissionsQuery = useListMySubmissions();

  const addHomework = useAddHomework();
  const updateHomework = useUpdateHomework();
  const deleteHomework = useDeleteHomework();
  const submitHomework = useSubmitHomework();

  const [mode, setMode] = useState<FormMode>({ kind: "closed" });
  const [values, setValues] = useState<HomeworkFormValues>(emptyHomeworkForm);
  const [formError, setFormError] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<HomeworkView | null>(null);

  const homework = homeworkQuery.data ?? [];
  const submissions = submissionsQuery.data ?? [];

  function openCreate() {
    setValues(emptyHomeworkForm());
    setFormError(null);
    setMode({ kind: "create" });
  }

  function openSubmit() {
    setValues(emptyHomeworkForm());
    setFormError(null);
    setMode({ kind: "submit" });
  }

  function openEdit(item: HomeworkView) {
    setValues(homeworkFormFrom(item));
    setFormError(null);
    setMode({ kind: "edit", homework: item });
  }

  function openSuggest(item: HomeworkView) {
    setValues(homeworkFormFrom(item));
    setFormError(null);
    setMode({ kind: "suggest", homework: item });
  }

  function closeForm() {
    setMode({ kind: "closed" });
    setFormError(null);
  }

  function handleSubmit() {
    const payload = toHomeworkPayload(values);
    if (!payload) {
      setFormError("Pick both dates before saving.");
      return;
    }
    setFormError(null);

    if (mode.kind === "create") {
      addHomework.mutate(payload, {
        onSuccess: closeForm,
        onError: () => setFormError("Could not save this homework. Try again."),
      });
      return;
    }

    if (mode.kind === "submit") {
      submitHomework.mutate(
        {
          kind: SubmissionKind.newHomework,
          targetHomeworkId: null,
          ...payload,
        },
        {
          onSuccess: closeForm,
          onError: () =>
            setFormError("Could not submit your homework. Try again."),
        },
      );
      return;
    }

    if (mode.kind === "edit") {
      updateHomework.mutate(
        { id: mode.homework.id, ...payload },
        {
          onSuccess: closeForm,
          onError: () =>
            setFormError("Could not update this homework. Try again."),
        },
      );
      return;
    }

    if (mode.kind === "suggest") {
      submitHomework.mutate(
        {
          kind: SubmissionKind.editSuggestion,
          targetHomeworkId: mode.homework.id,
          ...payload,
        },
        {
          onSuccess: closeForm,
          onError: () =>
            setFormError("Could not send your suggestion. Try again."),
        },
      );
    }
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    deleteHomework.mutate(deleteTarget.id, {
      onSuccess: () => setDeleteTarget(null),
    });
  }

  const formPending =
    addHomework.isPending ||
    updateHomework.isPending ||
    submitHomework.isPending;

  const formTitle =
    mode.kind === "create"
      ? "Add homework"
      : mode.kind === "submit"
        ? "Submit homework"
        : mode.kind === "edit"
          ? "Edit homework"
          : "Suggest an edit";

  const formDescription =
    mode.kind === "create"
      ? "Publish a new assignment for the whole class."
      : mode.kind === "submit"
        ? "Send your homework to the teacher for approval."
        : mode.kind === "edit"
          ? "Update the details. Changes appear for everyone immediately."
          : "Send your proposed changes to the teacher for approval.";

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Assignments"
        title="Homework"
        description="Add, manage and track every assignment — approved work is visible to the whole class."
        action={
          isAdmin ? (
            <Button
              type="button"
              data-ocid="homework.open_modal_button"
              onClick={openCreate}
              className="rounded-full bg-gradient-primary font-semibold text-primary-foreground shadow-none transition-smooth hover:brightness-110"
            >
              <Plus className="size-4" aria-hidden="true" />
              Add homework
            </Button>
          ) : undefined
        }
      />

      {/* Approved homework — visible to everyone */}
      <section aria-labelledby="approved-heading" className="space-y-5">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-accent/15 text-accent">
            <BookOpenCheck className="size-5" aria-hidden="true" />
          </span>
          <h2
            id="approved-heading"
            className="font-display text-xl font-bold text-foreground"
          >
            Class homework
          </h2>
        </div>

        {homeworkQuery.isLoading ? (
          <LoadingState label="Loading homework…" />
        ) : homeworkQuery.isError ? (
          <ErrorState
            message="We couldn't load the homework list."
            onRetry={() => void homeworkQuery.refetch()}
          />
        ) : homework.length === 0 ? (
          <EmptyState
            icon={BookOpenCheck}
            title="No homework yet"
            description={
              isAdmin
                ? "Add the first assignment and it will appear here for the whole class."
                : "When your teacher publishes homework, it will show up here."
            }
            action={
              isAdmin ? (
                <Button
                  type="button"
                  data-ocid="homework.empty_add_button"
                  onClick={openCreate}
                  className="rounded-full bg-gradient-primary font-semibold text-primary-foreground shadow-none transition-smooth hover:brightness-110"
                >
                  <Plus className="size-4" aria-hidden="true" />
                  Add homework
                </Button>
              ) : undefined
            }
          />
        ) : (
          <div
            data-ocid="homework.list"
            className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
          >
            {homework.map((item, index) => (
              <HomeworkCard
                key={item.id.toString()}
                homework={item}
                index={index + 1}
                isAdmin={!!isAdmin}
                onEdit={openEdit}
                onDelete={setDeleteTarget}
                onSuggestEdit={openSuggest}
              />
            ))}
          </div>
        )}
      </section>

      {/* Student submissions and suggestions */}
      {!isAdmin && (
        <section aria-labelledby="submissions-heading" className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
                <Inbox className="size-5" aria-hidden="true" />
              </span>
              <h2
                id="submissions-heading"
                className="font-display text-xl font-bold text-foreground"
              >
                My submissions
              </h2>
            </div>
            <Button
              type="button"
              data-ocid="homework.submit_homework_button"
              onClick={openSubmit}
              className="rounded-full bg-gradient-primary font-semibold text-primary-foreground shadow-none transition-smooth hover:brightness-110"
            >
              <Plus className="size-4" aria-hidden="true" />
              Submit homework
            </Button>
          </div>

          {submissionsQuery.isLoading ? (
            <LoadingState label="Loading your submissions…" />
          ) : submissionsQuery.isError ? (
            <ErrorState
              message="We couldn't load your submissions."
              onRetry={() => void submissionsQuery.refetch()}
            />
          ) : submissions.length === 0 ? (
            <EmptyState
              icon={Sparkles}
              title="Nothing submitted yet"
              description="Submit new homework or suggest an edit — you'll track its approval status here."
            />
          ) : (
            <div
              data-ocid="submission.list"
              className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
            >
              {submissions.map((submission, index) => (
                <SubmissionCard
                  key={submission.id.toString()}
                  submission={submission}
                  index={index + 1}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Create / edit / suggest dialog */}
      <Dialog
        open={mode.kind !== "closed"}
        onOpenChange={(open) => {
          if (!open) closeForm();
        }}
      >
        <DialogContent
          data-ocid="homework.modal"
          className="max-h-[90dvh] overflow-y-auto rounded-2xl border-border bg-card sm:max-w-2xl"
        >
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-bold">
              {formTitle}
            </DialogTitle>
            <DialogDescription>{formDescription}</DialogDescription>
          </DialogHeader>
          <HomeworkForm
            idPrefix="homework-form"
            values={values}
            onChange={setValues}
            onSubmit={handleSubmit}
            onCancel={closeForm}
            submitLabel={
              mode.kind === "create"
                ? isAdmin
                  ? "Publish homework"
                  : "Submit homework"
                : mode.kind === "submit"
                  ? "Submit homework"
                  : mode.kind === "edit"
                    ? "Save changes"
                    : "Send suggestion"
            }
            pending={formPending}
            error={formError}
          />
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <Dialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
      >
        <DialogContent
          data-ocid="homework.delete_dialog"
          className="rounded-2xl border-border bg-card sm:max-w-md"
        >
          <DialogHeader>
            <DialogTitle className="font-display text-xl font-bold">
              Delete homework?
            </DialogTitle>
            <DialogDescription>
              “{deleteTarget?.title}” will be removed for everyone. This cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              data-ocid="homework.cancel_button"
              onClick={() => setDeleteTarget(null)}
              className="rounded-full"
            >
              Cancel
            </Button>
            <Button
              type="button"
              data-ocid="homework.confirm_button"
              onClick={confirmDelete}
              disabled={deleteHomework.isPending}
              className="rounded-full bg-destructive font-semibold text-destructive-foreground shadow-none transition-smooth hover:bg-destructive/90"
            >
              {deleteHomework.isPending ? "Deleting…" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
