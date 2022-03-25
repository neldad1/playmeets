interface UserEvent {
  eid: string;
  status: string;
}

interface UserData {
  name: string;
  displayName: string;
  email: string;
  photoUrl: string;
  state: string;
  city: string;
  ageGroup: string[];
  events: UserEvent[];
  favourites: string[];
  notifications: string[];
}

interface AppUser {
  id: string;
  data: UserData;
}

interface Location {
  name: string;
  city: string;
  state: string;
  street: string;
  suburb: string;
  zipcode: number;
}

interface CommentData {
  event_id: string;
  user_id: string;
  comment: string;
  timestamp: number;
}

interface EvtComment {
  id: string;
  data: CommentData;
}

interface EventData {
  title: string;
  createdBy: string;
  timestamp: number;
  photo: string;
  slots: number;
  location: Location;
  attendees: string[];
  details: string;
}

interface AppEvent {
  id: string;
  data: EventData;
}

interface NotificationData {
  type: string;
  to: string;
  from: string;
  event_id: string;
  message: string;
}

interface AppNotification {
  id: string;
  data: NotificationData;
}

export type {
  UserEvent,
  UserData,
  AppUser,
  Location,
  CommentData,
  EvtComment,
  EventData,
  AppEvent,
  NotificationData,
  AppNotification,
};
