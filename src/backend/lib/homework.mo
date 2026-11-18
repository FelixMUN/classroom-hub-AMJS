import Map "mo:core/Map";
import Common "../types/common";
import Types "../types/homework";

module {
  public func toView(homework : Types.Homework) : Types.HomeworkView {
    {
      id = homework.id;
      subject = homework.subject;
      title = homework.title;
      description = homework.description;
      assignedDate = homework.assignedDate;
      dueDate = homework.dueDate;
      createdBy = homework.createdBy;
      createdAt = homework.createdAt;
    };
  };

  public func listHomework(homework : Map.Map<Nat, Types.Homework>) : [Types.HomeworkView] {
    homework.values().map(func h = toView(h)).toArray();
  };

  public func getHomework(homework : Map.Map<Nat, Types.Homework>, id : Nat) : ?Types.HomeworkView {
    switch (homework.get(id)) {
      case (?h) { ?toView(h) };
      case null { null };
    };
  };

  public func addHomework(
    homework : Map.Map<Nat, Types.Homework>,
    state : { var nextHomeworkId : Nat },
    subject : Text,
    title : Text,
    description : Text,
    assignedDate : Common.Timestamp,
    dueDate : Common.Timestamp,
    createdBy : Common.UserId,
    now : Common.Timestamp,
  ) : Types.HomeworkView {
    let id = state.nextHomeworkId;
    state.nextHomeworkId := id + 1;
    let record : Types.Homework = {
      id;
      subject;
      title;
      description;
      assignedDate;
      dueDate;
      createdBy;
      createdAt = now;
    };
    homework.add(id, record);
    toView(record);
  };

  public func updateHomework(
    homework : Map.Map<Nat, Types.Homework>,
    id : Nat,
    subject : Text,
    title : Text,
    description : Text,
    assignedDate : Common.Timestamp,
    dueDate : Common.Timestamp,
  ) : ?Types.HomeworkView {
    switch (homework.get(id)) {
      case (?existing) {
        let updated : Types.Homework = {
          id = existing.id;
          subject;
          title;
          description;
          assignedDate;
          dueDate;
          createdBy = existing.createdBy;
          createdAt = existing.createdAt;
        };
        homework.add(id, updated);
        ?toView(updated);
      };
      case null { null };
    };
  };

  public func deleteHomework(homework : Map.Map<Nat, Types.Homework>, id : Nat) : Bool {
    switch (homework.get(id)) {
      case (?_) {
        homework.remove(id);
        true;
      };
      case null { false };
    };
  };

  public func setCompletion(
    completions : Map.Map<(Common.UserId, Nat), Types.Completion>,
    student : Common.UserId,
    homeworkId : Nat,
    completed : Bool,
    now : Common.Timestamp,
  ) : Types.CompletionView {
    let record : Types.Completion = {
      homeworkId;
      student;
      completed;
      updatedAt = now;
    };
    completions.add((student, homeworkId), record);
    {
      homeworkId = record.homeworkId;
      student = record.student;
      completed = record.completed;
      updatedAt = record.updatedAt;
    };
  };

  public func listCompletions(
    completions : Map.Map<(Common.UserId, Nat), Types.Completion>,
    student : Common.UserId,
  ) : [Types.CompletionView] {
    completions.values().filter(func c = c.student == student).map(
      func c = {
        homeworkId = c.homeworkId;
        student = c.student;
        completed = c.completed;
        updatedAt = c.updatedAt;
      }
    ).toArray();
  };

  public func toSubmissionView(submission : Types.Submission) : Types.SubmissionView {
    {
      id = submission.id;
      kind = submission.kind;
      targetHomeworkId = submission.targetHomeworkId;
      subject = submission.subject;
      title = submission.title;
      description = submission.description;
      assignedDate = submission.assignedDate;
      dueDate = submission.dueDate;
      submittedBy = submission.submittedBy;
      submittedAt = submission.submittedAt;
      status = submission.status;
      adminReason = submission.adminReason;
    };
  };

  public func listSubmissions(submissions : Map.Map<Nat, Types.Submission>) : [Types.SubmissionView] {
    submissions.values().map(func s = toSubmissionView(s)).toArray();
  };

  public func listSubmissionsBy(
    submissions : Map.Map<Nat, Types.Submission>,
    student : Common.UserId,
  ) : [Types.SubmissionView] {
    submissions.values().filter(func s = s.submittedBy == student).map(
      func s = toSubmissionView(s)
    ).toArray();
  };

  public func submitHomework(
    submissions : Map.Map<Nat, Types.Submission>,
    state : { var nextSubmissionId : Nat },
    kind : Types.SubmissionKind,
    targetHomeworkId : ?Nat,
    subject : Text,
    title : Text,
    description : Text,
    assignedDate : Common.Timestamp,
    dueDate : Common.Timestamp,
    submittedBy : Common.UserId,
    now : Common.Timestamp,
  ) : Types.SubmissionView {
    let id = state.nextSubmissionId;
    state.nextSubmissionId := id + 1;
    let record : Types.Submission = {
      id;
      kind;
      targetHomeworkId;
      subject;
      title;
      description;
      assignedDate;
      dueDate;
      submittedBy;
      submittedAt = now;
      status = #pending;
      adminReason = null;
    };
    submissions.add(id, record);
    toSubmissionView(record);
  };

  public func setSubmissionStatus(
    submissions : Map.Map<Nat, Types.Submission>,
    id : Nat,
    status : Common.RequestStatus,
    adminReason : ?Text,
  ) : ?Types.SubmissionView {
    switch (submissions.get(id)) {
      case (?existing) {
        let updated : Types.Submission = {
          id = existing.id;
          kind = existing.kind;
          targetHomeworkId = existing.targetHomeworkId;
          subject = existing.subject;
          title = existing.title;
          description = existing.description;
          assignedDate = existing.assignedDate;
          dueDate = existing.dueDate;
          submittedBy = existing.submittedBy;
          submittedAt = existing.submittedAt;
          status;
          adminReason;
        };
        submissions.add(id, updated);
        ?toSubmissionView(updated);
      };
      case null { null };
    };
  };
};
