import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Common "../types/common";
import Types "../types/users";

module {
  public func toView(profile : Types.UserProfile) : Types.UserView {
    {
      principal = profile.principal;
      displayName = profile.displayName;
      className = profile.className;
      role = profile.role;
      approval = profile.approval;
      requestedAt = profile.requestedAt;
    };
  };

  public func listUsers(profiles : Map.Map<Common.UserId, Types.UserProfile>) : [Types.UserView] {
    profiles.values().map(func(profile) = toView(profile)).toArray();
  };

  public func getProfile(profiles : Map.Map<Common.UserId, Types.UserProfile>, user : Common.UserId) : ?Types.UserView {
    switch (profiles.get(user)) {
      case (?profile) { ?toView(profile) };
      case null { null };
    };
  };

  public func registerProfile(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    caller : Common.UserId,
    displayName : Text,
    className : Text,
    now : Common.Timestamp,
  ) : Types.UserView {
    let profile : Types.UserProfile = switch (profiles.get(caller)) {
      case (?existing) {
        {
          principal = caller;
          displayName;
          className;
          role = existing.role;
          approval = existing.approval;
          requestedAt = existing.requestedAt;
        };
      };
      case null {
        {
          principal = caller;
          displayName;
          className;
          role = #student;
          approval = #pending;
          requestedAt = now;
        };
      };
    };
    profiles.add(caller, profile);
    toView(profile);
  };

  public func setApproval(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    user : Common.UserId,
    approval : Common.ApprovalStatus,
  ) : () {
    switch (profiles.get(user)) {
      case (?profile) {
        profiles.add(user, { profile with approval });
      };
      case null {};
    };
  };

  public func setRole(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    user : Common.UserId,
    role : Common.Role,
  ) : () {
    switch (profiles.get(user)) {
      case (?profile) {
        profiles.add(user, { profile with role });
      };
      case null {};
    };
  };

  public func revokeAccess(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    user : Common.UserId,
  ) : () {
    switch (profiles.get(user)) {
      case (?profile) {
        profiles.add(user, { profile with approval = #rejected });
      };
      case null {};
    };
  };
};
