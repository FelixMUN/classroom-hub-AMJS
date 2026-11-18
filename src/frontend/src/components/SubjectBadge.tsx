import {
  SUBJECT_TONE_CLASSES,
  SUBJECT_TONE_SOFT,
  subjectTone,
} from "@/lib/subjects";
import { cn } from "@/lib/utils";

export function SubjectBadge({
  subject,
  variant = "solid",
  className,
}: {
  subject: string;
  variant?: "solid" | "soft";
  className?: string;
}) {
  const tone = subjectTone(subject);
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider",
        variant === "solid"
          ? SUBJECT_TONE_CLASSES[tone]
          : cn("border", SUBJECT_TONE_SOFT[tone]),
        className,
      )}
    >
      {subject}
    </span>
  );
}
