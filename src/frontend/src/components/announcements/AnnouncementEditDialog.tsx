import type { AnnouncementView } from "@/backend";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export function AnnouncementEditDialog({
  announcement,
  open,
  onOpenChange,
  onSave,
  isPending,
  error,
}: {
  announcement: AnnouncementView | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (draft: { id: bigint; title: string; body: string }) => void;
  isPending: boolean;
  error?: string | null;
}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // Seed the draft once when the dialog opens for a given announcement.
  useEffect(() => {
    if (open && announcement) {
      setTitle(announcement.title);
      setBody(announcement.body);
    }
  }, [open, announcement]);

  const canSave = title.trim().length > 0 && body.trim().length > 0;

  function handleSave() {
    if (!announcement || !canSave || isPending) return;
    onSave({ id: announcement.id, title: title.trim(), body: body.trim() });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-ocid="announcements.edit_dialog"
        className="sm:max-w-lg"
      >
        <DialogHeader>
          <DialogTitle className="font-display">Edit announcement</DialogTitle>
          <DialogDescription>
            Update the wording and save to publish the change to your class.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-announcement-title">Title</Label>
            <Input
              id="edit-announcement-title"
              data-ocid="announcements.edit_title_input"
              value={title}
              maxLength={120}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-announcement-body">Message</Label>
            <Textarea
              id="edit-announcement-body"
              data-ocid="announcements.edit_body_textarea"
              value={body}
              rows={5}
              maxLength={2000}
              onChange={(event) => setBody(event.target.value)}
            />
          </div>
          {error && (
            <p
              role="alert"
              data-ocid="announcements.edit_error_state"
              className="text-sm text-destructive"
            >
              {error}
            </p>
          )}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            data-ocid="announcements.edit_cancel_button"
            className="rounded-xl"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            data-ocid="announcements.edit_save_button"
            disabled={!canSave || isPending}
            className="rounded-xl bg-gradient-primary font-semibold text-primary-foreground"
            onClick={handleSave}
          >
            {isPending && (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            )}
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
