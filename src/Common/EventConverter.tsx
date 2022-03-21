export interface Location {
  name: string;
  city: string;
  state: string;
  street: string;
  suburb: string;
  zipcode: number;
}
export interface Comment {
  uid: string;
  comment: string;
  timestamp: string;
}
export interface AppEvent {
  id: string;
  title: string;
  createdBy: string;
  timestamp: string;
  photo: string;
  slots: number;
  location: Location;
  comments: [Comment];
  attendees: [string];
  details: string;
}

const fromFirestore = (data: AppEvent): AppEvent => {
  return {
    id: data.id,
    title: data.title,
    createdBy: data.createdBy,
    timestamp: data.timestamp,
    photo: data.photo,
    slots: data.slots,
    location: {
      name: data.location.name,
      street: data.location.street,
      suburb: data.location.suburb,
      city: data.location.city,
      state: data.location.state,
      zipcode: data.location.zipcode,
    },
    comments: data.comments,
    attendees: data.attendees,
    details: data.details,
  };
};

const toFirestore = (data: AppEvent): AppEvent => {
  return {
    id: data.id ?? null,
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

export { fromFirestore, toFirestore };
