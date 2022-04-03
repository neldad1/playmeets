interface UserEvent {
  eid: string;
  status: string;
}

interface UserData {
  name: string;
  displayName: string;
  email: string;
  photoUrl?: string;
  state: string;
  city: string;
  ageGroup: string[];
  events?: UserEvent[];
  favourites?: string[];
  notifications?: string[];
}

interface AppUser {
  id: string;
  data: UserData;
}

interface VenueAddress {
  number: string;
  zipcode: string;
  street: string;
  suburb: string;
  city: string;
  state: string;
  country: string;
}
interface Location {
  name: string;
  addrObject: VenueAddress;
  fullAddr: string;
  place_id: string;
}

interface CommentData {
  eid: string;
  uid: string;
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
  eid: string;
  message: string;
  status: number;
  timestamp: number;
}

interface AppNotification {
  id: string;
  data: NotificationData;
}

interface StepInfo {
  id: number;
  imgSrc: string;
  title: string;
  description: string;
}

export type {
  UserEvent,
  UserData,
  AppUser,
  Location,
  VenueAddress,
  CommentData,
  EvtComment,
  EventData,
  AppEvent,
  NotificationData,
  AppNotification,
  StepInfo,
};
