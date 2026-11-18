import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import UserApproval "mo:caffeineai-user-approval/approval";
import Common "../types/common";
import Types "../types/announcements";
import AnnouncementsLib "../lib/announcements";

mixin (
  accessControlState : AccessControl.AccessControlState,
  approvalState : UserApproval.UserApprovalState,
  announcements : Map.Map<Nat, Types.Announcement>,
  state : { var nextAnnouncementId : Nat },
) {
  func requireApprovedAnn(caller : Principal) {
    if (not UserApproval.isApproved(approvalState, caller)) {
      Runtime.trap("Unauthorized: only approved users can read announcements");
    };
  };

  func requireAdminAnn(caller : Principal) {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: only admins can manage announcements");
    };
  };

  public query ({ caller }) func listAnnouncements() : async [Types.AnnouncementView] {
    requireApprovedAnn(caller);
    AnnouncementsLib.listAnnouncements(announcements);
  };

  public shared ({ caller }) func publishAnnouncement(title : Text, body : Text) : async Types.AnnouncementView {
    requireAdminAnn(caller);
    AnnouncementsLib.publishAnnouncement(announcements, state, title, body, caller, Time.now());
  };

  public shared ({ caller }) func updateAnnouncement(id : Nat, title : Text, body : Text) : async ?Types.AnnouncementView {
    requireAdminAnn(caller);
    AnnouncementsLib.updateAnnouncement(announcements, id, title, body);
  };

  public shared ({ caller }) func deleteAnnouncement(id : Nat) : async Bool {
    requireAdminAnn(caller);
    AnnouncementsLib.deleteAnnouncement(announcements, id);
  };
};
