import Common "common";

module {
  public type TimetableEvent = {
    id : Nat;
    subject : Text;
    startTime : Common.Timestamp;
    endTime : Common.Timestamp;
    room : Text;
    notes : Text;
  };

  public type TimetableView = {
    id : Nat;
    subject : Text;
    startTime : Common.Timestamp;
    endTime : Common.Timestamp;
    room : Text;
    notes : Text;
  };
};
