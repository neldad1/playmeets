export interface Location {
  name: string;
  city: string;
  state: string;
  street: string;
  suburb: string;
  zipcode: number;
}

export interface Comment {
  id: string;
  data: {
    event_id: string;
    user_id: string;
    comment: string;
    timestamp: string;
  };
}

export interface EventData {
  title: string;
  createdBy: string;
  timestamp: number;
  photo: string;
  slots: number;
  location: Location;
  comments: [Comment];
  attendees: [string];
  details: string;
}

export interface AppEvent {
  id: string;
  data: EventData;
}

const toFirestoreEvt = (data: EventData): EventData => {
  return {
    title: data.title,
    createdBy: data.createdBy,
    timestamp: data.timestamp,
    photo: data.photo ?? null,
    slots: data.slots,
    location: {
      name: data.location.name,
      street: data.location.street,
      suburb: data.location.suburb,
      city: data.location.city,
      state: data.location.state,
      zipcode: data.location.zipcode,
    },
    comments: data.comments ?? null,
    attendees: data.attendees ?? null,
    details: data.details,
  };
};

export { toFirestoreEvt };
