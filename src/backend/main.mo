import Map "mo:core/Map";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import UserApproval "mo:caffeineai-user-approval/approval";
import MixinUserApproval "mo:caffeineai-user-approval/MixinUserApproval";
import Invites "mo:caffeineai-user-approval/invites";
import MixinMemberInvites "mo:caffeineai-user-approval/MixinMemberInvites";

import OQL "mo:caffeineai-oql";
import Expose "mo:caffeineai-oql/Expose";
import Entity "mo:caffeineai-oql/Entity";
import MapEntity "mo:caffeineai-oql/MapEntity";
import RecordValue "mo:caffeineai-oql/RecordValue";
import NatValue "mo:caffeineai-oql/NatValue";
import IntValue "mo:caffeineai-oql/IntValue";
import TextValue "mo:caffeineai-oql/TextValue";
import BoolValue "mo:caffeineai-oql/BoolValue";
import PrincipalValue "mo:caffeineai-oql/PrincipalValue";

import Common "types/common";
import UserTypes "types/users";
import HomeworkTypes "types/homework";
import AnnouncementTypes "types/announcements";
import TimetableTypes "types/timetable";

import UsersApi "mixins/users-api";
import HomeworkApi "mixins/homework-api";
import AnnouncementsApi "mixins/announcements-api";
import TimetableApi "mixins/timetable-api";
import ApiDocMixin "mixins/api-doc";

actor {
  let accessControlState : AccessControl.AccessControlState;
  include MixinAuthorization(accessControlState, null);

  let approvalState : UserApproval.UserApprovalState;
  include MixinUserApproval(accessControlState, approvalState);

  let invitesState : Invites.InvitesState;
  include MixinMemberInvites(accessControlState, approvalState, invitesState);

  let profiles : Map.Map<Common.UserId, UserTypes.UserProfile>;
  let homework : Map.Map<Nat, HomeworkTypes.Homework>;
  let completions : Map.Map<(Common.UserId, Nat), HomeworkTypes.Completion>;
  let submissions : Map.Map<Nat, HomeworkTypes.Submission>;
  let announcements : Map.Map<Nat, AnnouncementTypes.Announcement>;
  let events : Map.Map<Nat, TimetableTypes.TimetableEvent>;

  let state : {
    var nextHomeworkId : Nat;
    var nextSubmissionId : Nat;
    var nextAnnouncementId : Nat;
    var nextEventId : Nat;
  };

  include UsersApi(accessControlState, approvalState, profiles);
  include HomeworkApi(accessControlState, approvalState, homework, completions, submissions, state);
  include AnnouncementsApi(accessControlState, approvalState, announcements, state);
  include TimetableApi(accessControlState, approvalState, events, state);

  // Sample owner principal for OQL schema seeding; the value is ignored.
  transient let anyP = Principal.fromText("aaaaa-aa");

  include Expose({
    entities = [
      // Users: variant role/approval columns are projected to text tags.
      OQL.Entity.manual<UserTypes.UserProfile>(
        "user",
        func () = profiles.values(),
        "UserProfile",
        "principal",
      )
        .sample({
          principal = anyP;
          displayName = "";
          className = "";
          role = #student;
          approval = #pending;
          requestedAt = 0;
        })
        .payload("principal", func p = p.principal)
        .payload("displayName", func p = p.displayName)
        .payload("className", func p = p.className)
        .payload("role", func p = switch (p.role) { case (#admin) "admin"; case (#student) "student" })
        .payload("approval", func p = switch (p.approval) { case (#pending) "pending"; case (#approved) "approved"; case (#rejected) "rejected" })
        .payload("requestedAt", func p = p.requestedAt)
        .controllerOnly()
        .build(),
      // Homework: all-primitive record, auto-derived.
      homework.toEntity("homework", "Homework", "id")
        .sample({
          id = 0;
          subject = "";
          title = "";
          description = "";
          assignedDate = 0;
          dueDate = 0;
          createdBy = anyP;
          createdAt = 0;
        })
        .controllerOnly()
        .build(),
      // Completions: keyed by (student, homeworkId); values are all-primitive.
      completions.toEntity("completion", "Completion", "homeworkId")
        .sample({ homeworkId = 0; student = anyP; completed = false; updatedAt = 0 })
        .controllerOnly()
        .build(),
      // Submissions: variant kind/status and optional fields projected explicitly.
      OQL.Entity.manual<HomeworkTypes.Submission>(
        "submission",
        func () = submissions.values(),
        "Submission",
        "id",
      )
        .sample({
          id = 0;
          kind = #newHomework;
          targetHomeworkId = ?0;
          subject = "";
          title = "";
          description = "";
          assignedDate = 0;
          dueDate = 0;
          submittedBy = anyP;
          submittedAt = 0;
          status = #pending;
          adminReason = ?"";
        })
        .payload("id", func s = s.id)
        .payload("kind", func s = switch (s.kind) { case (#newHomework) "newHomework"; case (#editSuggestion) "editSuggestion" })
        .payload("targetHomeworkId", func s = s.targetHomeworkId)
        .payload("subject", func s = s.subject)
        .payload("title", func s = s.title)
        .payload("description", func s = s.description)
        .payload("assignedDate", func s = s.assignedDate)
        .payload("dueDate", func s = s.dueDate)
        .payload("submittedBy", func s = s.submittedBy)
        .payload("submittedAt", func s = s.submittedAt)
        .payload("status", func s = switch (s.status) { case (#pending) "pending"; case (#approved) "approved"; case (#rejected) "rejected" })
        .payload("adminReason", func s = s.adminReason)
        .controllerOnly()
        .build(),
      // Announcements: all-primitive record, auto-derived.
      announcements.toEntity("announcement", "Announcement", "id")
        .sample({ id = 0; title = ""; body = ""; publishedBy = anyP; publishedAt = 0 })
        .controllerOnly()
        .build(),
      // Timetable events: all-primitive record, auto-derived.
      events.toEntity("timetableEvent", "TimetableEvent", "id")
        .sample({ id = 0; subject = ""; startTime = 0; endTime = 0; room = ""; notes = "" })
        .controllerOnly()
        .build(),
    ];
  });

  include ApiDocMixin();
};
