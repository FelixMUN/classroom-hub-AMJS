import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import UserApproval "mo:caffeineai-user-approval/approval";
import Common "../types/common";
import Types "../types/homework";
import HomeworkLib "../lib/homework";

mixin (
  accessControlState : AccessControl.AccessControlState,
  approvalState : UserApproval.UserApprovalState,
  homework : Map.Map<Nat, Types.Homework>,
  completions : Map.Map<(Common.UserId, Nat), Types.Completion>,
  submissions : Map.Map<Nat, Types.Submission>,
  state : { var nextHomeworkId : Nat; var nextSubmissionId : Nat },
) {
  func requireApprovedHw(caller : Principal) {
    if (not UserApproval.isApproved(approvalState, caller)) {
      Runtime.trap("Unauthorized: caller is not an approved member");
    };
  };

  func requireAdminHw(caller : Principal) {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: only admins can perform this action");
    };
  };

  public query ({ caller }) func listHomework() : async [Types.HomeworkView] {
    requireApprovedHw(caller);
    HomeworkLib.listHomework(homework);
  };

  public query ({ caller }) func getHomework(id : Nat) : async ?Types.HomeworkView {
    requireApprovedHw(caller);
    HomeworkLib.getHomework(homework, id);
  };

  public shared ({ caller }) func addHomework(
    subject : Text,
    title : Text,
    description : Text,
    assignedDate : Common.Timestamp,
    dueDate : Common.Timestamp,
  ) : async Types.HomeworkView {
    requireAdminHw(caller);
    HomeworkLib.addHomework(homework, state, subject, title, description, assignedDate, dueDate, caller, Time.now());
  };

  public shared ({ caller }) func updateHomework(
    id : Nat,
    subject : Text,
    title : Text,
    description : Text,
    assignedDate : Common.Timestamp,
    dueDate : Common.Timestamp,
  ) : async ?Types.HomeworkView {
    requireAdminHw(caller);
    HomeworkLib.updateHomework(homework, id, subject, title, description, assignedDate, dueDate);
  };

  public shared ({ caller }) func deleteHomework(id : Nat) : async Bool {
    requireAdminHw(caller);
    HomeworkLib.deleteHomework(homework, id);
  };

  public shared ({ caller }) func setCompletion(homeworkId : Nat, completed : Bool) : async Types.CompletionView {
    requireApprovedHw(caller);
    HomeworkLib.setCompletion(completions, caller, homeworkId, completed, Time.now());
  };

  public query ({ caller }) func listMyCompletions() : async [Types.CompletionView] {
    requireApprovedHw(caller);
    HomeworkLib.listCompletions(completions, caller);
  };

  public shared ({ caller }) func submitHomework(
    kind : Types.SubmissionKind,
    targetHomeworkId : ?Nat,
    subject : Text,
    title : Text,
    description : Text,
    assignedDate : Common.Timestamp,
    dueDate : Common.Timestamp,
  ) : async Types.SubmissionView {
    requireApprovedHw(caller);
    HomeworkLib.submitHomework(
      submissions,
      state,
      kind,
      targetHomeworkId,
      subject,
      title,
      description,
      assignedDate,
      dueDate,
      caller,
      Time.now(),
    );
  };

  public query ({ caller }) func listMySubmissions() : async [Types.SubmissionView] {
    requireApprovedHw(caller);
    HomeworkLib.listSubmissionsBy(submissions, caller);
  };

  public query ({ caller }) func listSubmissions() : async [Types.SubmissionView] {
    requireAdminHw(caller);
    HomeworkLib.listSubmissions(submissions);
  };

  public shared ({ caller }) func setSubmissionStatus(
    id : Nat,
    status : Common.RequestStatus,
    adminReason : ?Text,
  ) : async ?Types.SubmissionView {
    requireAdminHw(caller);
    let result = HomeworkLib.setSubmissionStatus(submissions, id, status, adminReason);
    switch (result) {
      case (?view) {
        switch (status) {
          case (#approved) {
            switch (view.kind) {
              case (#newHomework) {
                ignore HomeworkLib.addHomework(
                  homework,
                  state,
                  view.subject,
                  view.title,
                  view.description,
                  view.assignedDate,
                  view.dueDate,
                  view.submittedBy,
                  Time.now(),
                );
              };
              case (#editSuggestion) {
                switch (view.targetHomeworkId) {
                  case (?targetId) {
                    ignore HomeworkLib.updateHomework(
                      homework,
                      targetId,
                      view.subject,
                      view.title,
                      view.description,
                      view.assignedDate,
                      view.dueDate,
                    );
                  };
                  case null {};
                };
              };
            };
          };
          case (_) {};
        };
        ?view;
      };
      case null { null };
    };
  };
};
