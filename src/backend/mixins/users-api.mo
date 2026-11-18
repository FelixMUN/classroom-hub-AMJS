import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import UserApproval "mo:caffeineai-user-approval/approval";
import Common "../types/common";
import Types "../types/users";
import UsersLib "../lib/users";

mixin (
  accessControlState : AccessControl.AccessControlState,
  approvalState : UserApproval.UserApprovalState,
  profiles : Map.Map<Common.UserId, Types.UserProfile>,
) {
  func requireAdminUser(caller : Common.UserId) : () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
  };

  // Returns the caller's own profile, or null when they have not registered yet.
  // Deliberately NOT guarded by the approved-member check: the frontend must be
  // able to tell "no profile yet" (null -> registration) apart from "profile not
  // approved" (a profile whose approval is not #approved -> pending screen).
  // The app's data endpoints keep their own approved-member guards.
  public query ({ caller }) func getCallerProfile() : async ?Types.UserView {
    UsersLib.getProfile(profiles, caller);
  };

  public shared ({ caller }) func registerProfile(displayName : Text, className : Text) : async Types.UserView {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Sign in to register");
    };
    let view = UsersLib.registerProfile(profiles, caller, displayName, className, Time.now());
    // Mirror the request into the shared approval state so admins can act on it
    // and the approval gate reflects the same decision.
    switch (view.approval) {
      case (#pending) { UserApproval.requestApproval(approvalState, caller) };
      case (_) {};
    };
    view;
  };

  public query ({ caller }) func listUsers() : async [Types.UserView] {
    requireAdminUser(caller);
    UsersLib.listUsers(profiles);
  };

  public shared ({ caller }) func setUserApproval(user : Common.UserId, approval : Common.ApprovalStatus) : async () {
    requireAdminUser(caller);
    UsersLib.setApproval(profiles, user, approval);
    // Keep the shared approval state consistent with the profile decision.
    switch (approval) {
      case (#approved) { UserApproval.setApproval(approvalState, user, #approved) };
      case (#rejected) { UserApproval.setApproval(approvalState, user, #rejected) };
      case (#pending) { UserApproval.removeApproval(approvalState, user) };
    };
  };

  public shared ({ caller }) func setUserRole(user : Common.UserId, role : Common.Role) : async () {
    requireAdminUser(caller);
    UsersLib.setRole(profiles, user, role);
    // Reflect the role in the shared access-control state so guards agree.
    switch (role) {
      case (#admin) { AccessControl.assignRole(accessControlState, caller, user, #admin) };
      case (#student) { AccessControl.assignRole(accessControlState, caller, user, #user) };
    };
  };

  public shared ({ caller }) func revokeUserAccess(user : Common.UserId) : async () {
    requireAdminUser(caller);
    UsersLib.revokeAccess(profiles, user);
    UserApproval.setApproval(approvalState, user, #rejected);
  };
};
