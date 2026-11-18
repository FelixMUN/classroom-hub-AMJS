import Map "mo:core/Map";
import Common "../types/common";
import Types "../types/announcements";

module {
  public func toView(announcement : Types.Announcement) : Types.AnnouncementView {
    {
      id = announcement.id;
      title = announcement.title;
      body = announcement.body;
      publishedBy = announcement.publishedBy;
      publishedAt = announcement.publishedAt;
    };
  };

  public func listAnnouncements(announcements : Map.Map<Nat, Types.Announcement>) : [Types.AnnouncementView] {
    let views = announcements.values().map(func(a) = toView(a));
    views.toArray().sort(func(a, b) = if (a.publishedAt > b.publishedAt) { #less } else if (a.publishedAt < b.publishedAt) { #greater } else { #equal });
  };

  public func publishAnnouncement(
    announcements : Map.Map<Nat, Types.Announcement>,
    state : { var nextAnnouncementId : Nat },
    title : Text,
    body : Text,
    publishedBy : Common.UserId,
    now : Common.Timestamp,
  ) : Types.AnnouncementView {
    let id = state.nextAnnouncementId;
    state.nextAnnouncementId := id + 1;
    let announcement : Types.Announcement = {
      id;
      title;
      body;
      publishedBy;
      publishedAt = now;
    };
    announcements.add(id, announcement);
    toView(announcement);
  };

  public func updateAnnouncement(
    announcements : Map.Map<Nat, Types.Announcement>,
    id : Nat,
    title : Text,
    body : Text,
  ) : ?Types.AnnouncementView {
    switch (announcements.get(id)) {
      case (?existing) {
        let updated : Types.Announcement = {
          id = existing.id;
          title;
          body;
          publishedBy = existing.publishedBy;
          publishedAt = existing.publishedAt;
        };
        announcements.add(id, updated);
        ?toView(updated);
      };
      case null { null };
    };
  };

  public func deleteAnnouncement(announcements : Map.Map<Nat, Types.Announcement>, id : Nat) : Bool {
    switch (announcements.get(id)) {
      case (?_) {
        announcements.remove(id);
        true;
      };
      case null { false };
    };
  };
};
