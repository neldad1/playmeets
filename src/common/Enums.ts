enum NotificationType {
  REQUEST = 'Request to Join',
  RESPONSE = 'Response to Request',
  COMMENT = 'Comment',
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
