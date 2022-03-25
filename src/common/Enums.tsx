enum NotificationType {
  REQUEST = 'REQ',
  RESPONSE = 'RESP',
}

enum UserResponse {
  NO = 0,
  YES = 1,
}

enum UserEventStatus {
  PENDING = 'Pending',
  JOINED = 'Joined',
  ATTENDED = 'Attended',
}

export { NotificationType, UserResponse, UserEventStatus };
