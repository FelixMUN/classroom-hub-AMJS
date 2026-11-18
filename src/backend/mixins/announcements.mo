import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import UserApproval "mo:caffeineai-user-approval/approval";
import Common "../types/common";
import AnnouncementTypes "../types/announcements";
import TimetableTypes "../types/timetable";
import AnnouncementsLib "../lib/announcements";
import TimetableLib "../lib/timetable";

mixin (
  accessControlState : AccessControl.AccessControlState,
  approvalState : UserApproval.UserApprovalState,
  announcements : Map.Map<Nat, AnnouncementTypes.Announcement>,
  events : Map.Map<Nat, TimetableTypes.TimetableEvent>,
  state : { var nextAnnouncementId : Nat; var nextEventId : Nat },
) {
  func requireApproved(caller : Principal) {
    if (not UserApproval.isApproved(approvalState, caller)) {
      Runtime.trap("Unauthorized: only approved users can read announcements and timetable");
    };
  };

  func requireAdmin(caller : Principal) {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: only admins can manage announcements and timetable");
    };
  };

  // --- Announcements ---

  public query ({ caller }) func listAnnouncements() : async [AnnouncementTypes.AnnouncementView] {
    requireApproved(caller);
    AnnouncementsLib.listAnnouncements(announcements);
  };

  public shared ({ caller }) func publishAnnouncement(title : Text, body : Text) : async AnnouncementTypes.AnnouncementView {
    requireAdmin(caller);
    AnnouncementsLib.publishAnnouncement(announcements, state, title, body, caller, Time.now());
  };

  public shared ({ caller }) func updateAnnouncement(id : Nat, title : Text, body : Text) : async ?AnnouncementTypes.AnnouncementView {
    requireAdmin(caller);
    AnnouncementsLib.updateAnnouncement(announcements, id, title, body);
  };

  public shared ({ caller }) func deleteAnnouncement(id : Nat) : async Bool {
    requireAdmin(caller);
    AnnouncementsLib.deleteAnnouncement(announcements, id);
  };

  // --- Timetable ---

  public query ({ caller }) func listTimetableEvents() : async [TimetableTypes.TimetableView] {
    requireApproved(caller);
    TimetableLib.listEvents(events);
  };

  public shared ({ caller }) func addTimetableEvent(
    subject : Text,
    startTime : Common.Timestamp,
    endTime : Common.Timestamp,
    room : Text,
    notes : Text,
  ) : async TimetableTypes.TimetableView {
    requireAdmin(caller);
    TimetableLib.addEvent(events, state, subject, startTime, endTime, room, notes);
  };

  public shared ({ caller }) func updateTimetableEvent(
    id : Nat,
    subject : Text,
    startTime : Common.Timestamp,
    endTime : Common.Timestamp,
    room : Text,
    notes : Text,
  ) : async ?TimetableTypes.TimetableView {
    requireAdmin(caller);
    TimetableLib.updateEvent(events, id, subject, startTime, endTime, room, notes);
  };

  public shared ({ caller }) func deleteTimetableEvent(id : Nat) : async Bool {
    requireAdmin(caller);
    TimetableLib.deleteEvent(events, id);
  };
};
