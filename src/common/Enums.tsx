enum NotificationType {
  REQUEST = 'REQ',
  RESPONSE = 'RESP',
}

enum UserEventResponse {
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

enum UserEventStatus {
  PENDING = 'Pending',
  JOINED = 'Joined',
  ATTENDED = 'Attended',
  HOSTING = 'Hosting',
}

enum NotificationStatus {
  UNREAD = 0,
  READ = 1,
}

export {
  NotificationType,
  UserEventResponse,
  UserEventStatus,
  NotificationStatus,
};
