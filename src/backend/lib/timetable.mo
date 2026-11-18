import Map "mo:core/Map";
import Common "../types/common";
import Types "../types/timetable";

module {
  public func toView(event : Types.TimetableEvent) : Types.TimetableView {
    {
      id = event.id;
      subject = event.subject;
      startTime = event.startTime;
      endTime = event.endTime;
      room = event.room;
      notes = event.notes;
    };
  };

  public func listEvents(events : Map.Map<Nat, Types.TimetableEvent>) : [Types.TimetableView] {
    let views = events.values().map(func(e) = toView(e));
    views.toArray().sort(func(a, b) = if (a.startTime < b.startTime) { #less } else if (a.startTime > b.startTime) { #greater } else { #equal });
  };

  public func addEvent(
    events : Map.Map<Nat, Types.TimetableEvent>,
    state : { var nextEventId : Nat },
    subject : Text,
    startTime : Common.Timestamp,
    endTime : Common.Timestamp,
    room : Text,
    notes : Text,
  ) : Types.TimetableView {
    let id = state.nextEventId;
    state.nextEventId := id + 1;
    let event : Types.TimetableEvent = {
      id;
      subject;
      startTime;
      endTime;
      room;
      notes;
    };
    events.add(id, event);
    toView(event);
  };

  public func updateEvent(
    events : Map.Map<Nat, Types.TimetableEvent>,
    id : Nat,
    subject : Text,
    startTime : Common.Timestamp,
    endTime : Common.Timestamp,
    room : Text,
    notes : Text,
  ) : ?Types.TimetableView {
    switch (events.get(id)) {
      case (?existing) {
        let updated : Types.TimetableEvent = {
          id = existing.id;
          subject;
          startTime;
          endTime;
          room;
          notes;
        };
        events.add(id, updated);
        ?toView(updated);
      };
      case null { null };
    };
  };

  public func deleteEvent(events : Map.Map<Nat, Types.TimetableEvent>, id : Nat) : Bool {
    switch (events.get(id)) {
      case (?_) {
        events.remove(id);
        true;
      };
      case null { false };
    };
  };
};
