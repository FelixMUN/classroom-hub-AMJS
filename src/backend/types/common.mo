module {
  public type UserId = Principal;
  public type Timestamp = Int;

  public type Role = {
    #admin;
    #student;
  };

  public type ApprovalStatus = {
    #pending;
    #approved;
    #rejected;
  };

  public type RequestStatus = {
    #pending;
    #approved;
    #rejected;
  };
};
