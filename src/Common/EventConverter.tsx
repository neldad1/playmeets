export interface AppEvent {
  eid: string;
  title: string;
  createdBy: string;
  timestamp: string;
  photo: string;
  slots: number;
  locationName: string;
  location: {
    city: string;
    state: string;
    street: string;
    suburb: string;
    zipcode: number;
  };
  comments: [
    {
      uid: string;
      comment: string;
      timestamp: string;
    }
  ];
  attendees: [string];
}

const fromFirestore = (data: AppEvent): AppEvent => {
  return {
    eid: data.eid,
    title: data.title,
    createdBy: data.createdBy,
    timestamp: data.timestamp,
    photo: data.photo,
    slots: data.slots,
    locationName: data.locationName,
    location: {
      street: data.location.street,
      suburb: data.location.suburb,
      city: data.location.city,
      state: data.location.state,
      zipcode: data.location.zipcode,
    },
    comments: data.comments,
    attendees: data.attendees,
  };
};

const toFirestore = (data: AppEvent): AppEvent => {
  return {
    eid: data.eid,
    title: data.title,
    createdBy: data.createdBy,
    timestamp: data.timestamp,
    photo: data.photo,
    slots: data.slots,
    locationName: data.locationName,
    location: {
      street: data.location.street,
      suburb: data.location.suburb,
      city: data.location.city,
      state: data.location.state,
      zipcode: data.location.zipcode,
    },
    comments: data.comments,
    attendees: data.attendees,
  };
};

export { fromFirestore, toFirestore };
