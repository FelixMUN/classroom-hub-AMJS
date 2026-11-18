import Common "common";

module {
  public type UserProfile = {
    principal : Common.UserId;
    displayName : Text;
    className : Text;
    role : Common.Role;
    approval : Common.ApprovalStatus;
    requestedAt : Common.Timestamp;
  };

  public type UserView = {
    principal : Common.UserId;
    displayName : Text;
    className : Text;
    role : Common.Role;
    approval : Common.ApprovalStatus;
    requestedAt : Common.Timestamp;
  };
};
