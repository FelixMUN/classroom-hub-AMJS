mixin () {
  public query func getApiDoc() : async Text {
    "# CLASSROOM HUB Backend API\n" #
    "\n" #
    "A shared class homework portal for one class. It stores user profiles, homework, per-student completion status, homework submissions and edit suggestions, announcements, and timetable events. All data is persistent and shared across users; approved changes are visible to everyone.\n" #
    "\n" #
    "## Authentication and identity\n" #
    "\n" #
    "The app uses Internet Identity. The frontend pins an Internet Identity derivation origin, published at `/.well-known/ii-derivation-origin` when available. An agent already holding the user's Internet Identity authorization derives the correct per-app principal against that origin (for example `icp identity link web <name> --app <host>`). Such a delegation acts with the user's full authority in this app until it expires.\n" #
    "\n" #
    "A principal that never signed in through the app's own frontend is unregistered, even if it belongs to the app's owner. A signed-in caller derived against a different origin is a different principal than the one the frontend registered.\n" #
    "\n" #
    "## Registration prerequisite\n" #
    "\n" #
    "Registration happens only when a caller signs in through the app's own frontend and calls `registerProfile`. A direct API caller must do the same before any role-guarded call, guarded queries included. The first caller to initialize access control receives the admin role; subsequent callers receive the student role. An unregistered or anonymous caller receives a trap on guarded endpoints: `Unauthorized: Your access request has not been approved` (approved-member guard) or `Unauthorized: Only admins can perform this action` (admin guard).\n" #
    "\n" #
    "## Authorization\n" #
    "\n" #
    "- `registerProfile` requires a signed (non-anonymous) caller. It creates a profile with role `student` and approval `pending`, and records the access request.\n" #
    "- Every other endpoint requires an approved member. `listUsers`, `setUserApproval`, `setUserRole`, `revokeUserAccess`, `addHomework`, `updateHomework`, `deleteHomework`, `listSubmissions`, `setSubmissionStatus`, `publishAnnouncement`, `updateAnnouncement`, `deleteAnnouncement`, `addTimetableEvent`, `updateTimetableEvent`, and `deleteTimetableEvent` additionally require the admin role.\n" #
    "- Students may read homework, announcements, and timetable events, and may submit homework and edit suggestions, and set their own completion status.\n" #
    "\n" #
    "## Methods\n" #
    "\n" #
    "### Profiles\n" #
    "- `registerProfile(displayName : text, className : text) : async UserView` - create or update the caller's profile and request access. Signed-in callers only.\n" #
    "- `getCallerProfile() : async ?UserView` - the caller's own profile. Approved members only.\n" #
    "- `listUsers() : async [UserView]` - all profiles. Admin only.\n" #
    "- `setUserApproval(user : principal, approval : ApprovalStatus) : async ()` - approve, reject, or reset a user's access. Admin only.\n" #
    "- `setUserRole(user : principal, role : Role) : async ()` - assign `#admin` or `#student`. Admin only.\n" #
    "- `revokeUserAccess(user : principal) : async ()` - reject a user's access. Admin only.\n" #
    "\n" #
    "### Homework\n" #
    "- `listHomework() : async [HomeworkView]` - all homework. Approved members only.\n" #
    "- `getHomework(id : nat) : async ?HomeworkView` - one homework item. Approved members only.\n" #
    "- `addHomework(subject, title, description : text, assignedDate, dueDate : int) : async HomeworkView` - admin only.\n" #
    "- `updateHomework(id : nat, subject, title, description : text, assignedDate, dueDate : int) : async ?HomeworkView` - admin only.\n" #
    "- `deleteHomework(id : nat) : async bool` - admin only.\n" #
    "- `setCompletion(homeworkId : nat, completed : bool) : async CompletionView` - set the caller's own completion status. Approved members only.\n" #
    "- `listMyCompletions() : async [CompletionView]` - the caller's own completion records. Approved members only.\n" #
    "\n" #
    "### Submissions and edit suggestions\n" #
    "- `submitHomework(kind : SubmissionKind, targetHomeworkId : ?nat, subject, title, description : text, assignedDate, dueDate : int) : async SubmissionView` - submit new homework (`#newHomework`) or an edit suggestion (`#editSuggestion`). Approved members only. New submissions start `#pending`.\n" #
    "- `listMySubmissions() : async [SubmissionView]` - the caller's own submissions. Approved members only.\n" #
    "- `listSubmissions() : async [SubmissionView]` - all submissions. Admin only.\n" #
    "- `setSubmissionStatus(id : nat, status : RequestStatus, adminReason : ?text) : async ?SubmissionView` - approve or reject a submission. Admin only. Approving a `#newHomework` submission creates the homework; approving an `#editSuggestion` applies it to `targetHomeworkId` when present.\n" #
    "\n" #
    "### Announcements\n" #
    "- `listAnnouncements() : async [AnnouncementView]` - all announcements. Approved members only.\n" #
    "- `publishAnnouncement(title, body : text) : async AnnouncementView` - admin only.\n" #
    "- `updateAnnouncement(id : nat, title, body : text) : async ?AnnouncementView` - admin only.\n" #
    "- `deleteAnnouncement(id : nat) : async bool` - admin only.\n" #
    "\n" #
    "### Timetable\n" #
    "- `listTimetableEvents() : async [TimetableView]` - all timetable events, sorted by start time. Approved members only.\n" #
    "- `addTimetableEvent(subject : text, startTime, endTime : int, room, notes : text) : async TimetableView` - admin only.\n" #
    "- `updateTimetableEvent(id : nat, subject : text, startTime, endTime : int, room, notes : text) : async ?TimetableView` - admin only.\n" #
    "- `deleteTimetableEvent(id : nat) : async bool` - admin only.\n" #
    "\n" #
    "## Units and encoding\n" #
    "\n" #
    "- Timestamps (`assignedDate`, `dueDate`, `createdAt`, `requestedAt`, `submittedAt`, `publishedAt`, `updatedAt`, `startTime`, `endTime`) are signed 64-bit nanoseconds since the Unix epoch (`int`).\n" #
    "- Identifiers (`id`, `homeworkId`, `nextHomeworkId`, and the counters) are `nat`.\n" #
    "- Principals are Internet Identity principals. Optional values (`targetHomeworkId`, `adminReason`) are `null` when absent.\n" #
    "- Variants: `Role` is `#admin | #student`; `ApprovalStatus` and `RequestStatus` are `#pending | #approved | #rejected`; `SubmissionKind` is `#newHomework | #editSuggestion`.\n" #
    "\n" #
    "## Lifecycle and polling\n" #
    "\n" #
    "- A new user is `#pending` until an admin calls `setUserApproval(user, #approved)`. Until then every guarded call traps.\n" #
    "- A submission is `#pending` until an admin calls `setSubmissionStatus`. Approved homework and edit suggestions appear for all approved members immediately after the approving call completes.\n" #
    "- There is no background job; state changes only in response to a call. Poll `listHomework`, `listAnnouncements`, `listTimetableEvents`, and `listSubmissions` to observe changes.\n" #
    "\n" #
    "## Mutation retry safety\n" #
    "\n" #
    "- `addHomework`, `publishAnnouncement`, `addTimetableEvent`, and `submitHomework` are not idempotent: each call allocates a new id and appends a new record. Retrying a call that already succeeded creates a duplicate.\n" #
    "- `updateHomework`, `updateAnnouncement`, `updateTimetableEvent`, `setUserApproval`, `setUserRole`, `setCompletion`, and `setSubmissionStatus` are idempotent for the same arguments.\n" #
    "- `deleteHomework`, `deleteAnnouncement`, and `deleteTimetableEvent` return `false` when the id does not exist; retrying is safe.\n" #
    "- `setSubmissionStatus` with `#approved` on an already-approved submission re-applies the change and may create a duplicate homework item for `#newHomework` submissions. Do not retry an approval.\n" #
    "\n" #
    "## Errors and gotchas\n" #
    "\n" #
    "- Guarded endpoints trap rather than returning an error variant. An unapproved caller sees `Unauthorized: Your access request has not been approved`; a non-admin caller sees `Unauthorized: Only admins can perform this action`.\n" #
    "- `registerProfile` traps with `Unauthorized: Sign in to register` for an anonymous caller.\n" #
    "- `getHomework`, `updateHomework`, `setSubmissionStatus`, `updateAnnouncement`, and `updateTimetableEvent` return `null` when the id does not exist.\n" #
    "- The OQL `schema()` and `execute()` endpoints expose the app's tables to the platform data agent only; they are not readable by anonymous or student callers."
  };
};
