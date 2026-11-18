import type {
  AnnouncementView,
  ApprovalStatus,
  CompletionView,
  HomeworkView,
  InviteInfo,
  SubmissionView,
  TimetableView,
  UserView,
} from "@/backend";

export type {
  AnnouncementView,
  ApprovalStatus,
  CompletionView,
  HomeworkView,
  InviteInfo,
  SubmissionView,
  TimetableView,
  UserView,
};

export type { Role, RequestStatus, SubmissionKind, UserRole } from "@/backend";

/** A homework item joined with the signed-in student's completion state. */
export interface HomeworkWithCompletion extends HomeworkView {
  completed: boolean;
}

/** Navigation entry rendered in the shared header. */
export interface NavItem {
  to: string;
  label: string;
  adminOnly?: boolean;
}
