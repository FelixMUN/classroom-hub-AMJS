import Common "common";

module {
  public type Homework = {
    id : Nat;
    subject : Text;
    title : Text;
    description : Text;
    assignedDate : Common.Timestamp;
    dueDate : Common.Timestamp;
    createdBy : Common.UserId;
    createdAt : Common.Timestamp;
  };

  public type HomeworkView = {
    id : Nat;
    subject : Text;
    title : Text;
    description : Text;
    assignedDate : Common.Timestamp;
    dueDate : Common.Timestamp;
    createdBy : Common.UserId;
    createdAt : Common.Timestamp;
  };

  public type Completion = {
    homeworkId : Nat;
    student : Common.UserId;
    completed : Bool;
    updatedAt : Common.Timestamp;
  };

  public type CompletionView = {
    homeworkId : Nat;
    student : Common.UserId;
    completed : Bool;
    updatedAt : Common.Timestamp;
  };

  public type SubmissionKind = {
    #newHomework;
    #editSuggestion;
  };

  public type Submission = {
    id : Nat;
    kind : SubmissionKind;
    targetHomeworkId : ?Nat;
    subject : Text;
    title : Text;
    description : Text;
    assignedDate : Common.Timestamp;
    dueDate : Common.Timestamp;
    submittedBy : Common.UserId;
    submittedAt : Common.Timestamp;
    status : Common.RequestStatus;
    adminReason : ?Text;
  };

  public type SubmissionView = {
    id : Nat;
    kind : SubmissionKind;
    targetHomeworkId : ?Nat;
    subject : Text;
    title : Text;
    description : Text;
    assignedDate : Common.Timestamp;
    dueDate : Common.Timestamp;
    submittedBy : Common.UserId;
    submittedAt : Common.Timestamp;
    status : Common.RequestStatus;
    adminReason : ?Text;
  };
};
