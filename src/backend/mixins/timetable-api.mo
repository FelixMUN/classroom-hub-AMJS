import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import UserApproval "mo:caffeineai-user-approval/approval";
import Common "../types/common";
import Types "../types/timetable";
import TimetableLib "../lib/timetable";

mixin (
  accessControlState : AccessControl.AccessControlState,
  approvalState : UserApproval.UserApprovalState,
  events : Map.Map<Nat, Types.TimetableEvent>,
  state : { var nextEventId : Nat },
) {
  func requireApprovedTt(caller : Principal) {
    if (not UserApproval.isApproved(approvalState, caller)) {
      Runtime.trap("Unauthorized: only approved users can read timetable events");
    };
  };

  func requireAdminTt(caller : Principal) {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: only admins can manage timetable events");
    };
  };

  public query ({ caller }) func listTimetableEvents() : async [Types.TimetableView] {
    requireApprovedTt(caller);
    TimetableLib.listEvents(events);
  };

  public shared ({ caller }) func addTimetableEvent(
    subject : Text,
    startTime : Common.Timestamp,
    endTime : Common.Timestamp,
    room : Text,
    notes : Text,
  ) : async Types.TimetableView {
    requireAdminTt(caller);
    TimetableLib.addEvent(events, state, subject, startTime, endTime, room, notes);
  };

  public shared ({ caller }) func updateTimetableEvent(
    id : Nat,
    subject : Text,
    startTime : Common.Timestamp,
    endTime : Common.Timestamp,
    room : Text,
    notes : Text,
  ) : async ?Types.TimetableView {
    requireAdminTt(caller);
    TimetableLib.updateEvent(events, id, subject, startTime, endTime, room, notes);
  };

  public shared ({ caller }) func deleteTimetableEvent(id : Nat) : async Bool {
    requireAdminTt(caller);
    TimetableLib.deleteEvent(events, id);
  };
};
