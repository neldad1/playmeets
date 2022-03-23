interface UserData {
  name: string;
  displayName: string;
  email: string;
  photoUrl: string;
  state: string;
  city: string;
  ageGroup: string[];
  attended: number;
  events: string[];
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

export type {
  UserData,
  AppUser,
  Location,
  CommentData,
  EvtComment,
  EventData,
  AppEvent,
};
