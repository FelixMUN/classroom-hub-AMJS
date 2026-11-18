import Common "common";

module {
  public type Announcement = {
    id : Nat;
    title : Text;
    body : Text;
    publishedBy : Common.UserId;
    publishedAt : Common.Timestamp;
  };

  public type AnnouncementView = {
    id : Nat;
    title : Text;
    body : Text;
    publishedBy : Common.UserId;
    publishedAt : Common.Timestamp;
  };
};
