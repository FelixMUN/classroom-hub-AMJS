import Map "mo:core/Map";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import UserApproval "mo:caffeineai-user-approval/approval";
import Invites "mo:caffeineai-user-approval/invites";

module {
  type UserId = Principal;
  type Timestamp = Int;

  type Role = { #admin; #student };
  type ApprovalStatus = { #pending; #approved; #rejected };
  type RequestStatus = { #pending; #approved; #rejected };

  type UserProfile = {
    principal : UserId;
    displayName : Text;
    className : Text;
    role : Role;
    approval : ApprovalStatus;
    requestedAt : Timestamp;
  };

  type Homework = {
    id : Nat;
    subject : Text;
    title : Text;
    description : Text;
    assignedDate : Timestamp;
    dueDate : Timestamp;
    createdBy : UserId;
    createdAt : Timestamp;
  };

  type Completion = {
    homeworkId : Nat;
    student : UserId;
    completed : Bool;
    updatedAt : Timestamp;
  };

  type SubmissionKind = { #newHomework; #editSuggestion };

  type Submission = {
    id : Nat;
    kind : SubmissionKind;
    targetHomeworkId : ?Nat;
    subject : Text;
    title : Text;
    description : Text;
    assignedDate : Timestamp;
    dueDate : Timestamp;
    submittedBy : UserId;
    submittedAt : Timestamp;
    status : RequestStatus;
    adminReason : ?Text;
  };

  type Announcement = {
    id : Nat;
    title : Text;
    body : Text;
    publishedBy : UserId;
    publishedAt : Timestamp;
  };

  type TimetableEvent = {
    id : Nat;
    subject : Text;
    startTime : Timestamp;
    endTime : Timestamp;
    room : Text;
    notes : Text;
  };

  type NewActor = {
    accessControlState : AccessControl.AccessControlState;
    approvalState : UserApproval.UserApprovalState;
    invitesState : Invites.InvitesState;
    profiles : Map.Map<UserId, UserProfile>;
    homework : Map.Map<Nat, Homework>;
    completions : Map.Map<(UserId, Nat), Completion>;
    submissions : Map.Map<Nat, Submission>;
    announcements : Map.Map<Nat, Announcement>;
    events : Map.Map<Nat, TimetableEvent>;
    state : {
      var nextHomeworkId : Nat;
      var nextSubmissionId : Nat;
      var nextAnnouncementId : Nat;
      var nextEventId : Nat;
    };
  };

  public func migration(_old : {}) : NewActor {
    let accessControlState = AccessControl.initState();
    {
      accessControlState;
      approvalState = UserApproval.initState(accessControlState);
      invitesState = Invites.initState();
      profiles = Map.empty();
      homework = Map.empty();
      completions = Map.empty();
      submissions = Map.empty();
      announcements = Map.empty();
      events = Map.empty();
      state = {
        var nextHomeworkId = 0;
        var nextSubmissionId = 0;
        var nextAnnouncementId = 0;
        var nextEventId = 0;
      };
    };
  };
};
