export const mockEvents = [
  {
    id: '1',
    data: {
      title: 'Event1',
      createdBy: '1',
      timestamp: 1649203353,
      photo: 'https://playmeets.com/event1.png',
      slots: 5,
      location: {
        name: 'Venue1',
        addrObject: {
          number: '1',
          zipcode: '1111',
          street: 'street1',
          suburb: 'suburb1',
          city: 'city1',
          state: 'state1',
          country: 'au',
        },
        fullAddr: '1 street1, suburb1, state1, 1111, au',
        place_id: '1',
      },
      attendees: ['1'],
      details: 'Eat and play',
    },
  },
  {
    id: '2',
    data: {
      title: 'Event2',
      createdBy: '2',
      timestamp: 1649205542,
      photo: 'https://playmeets.com/event2.png',
      slots: 4,
      location: {
        name: 'Venue2',
        addrObject: {
          number: '2',
          zipcode: '2222',
          street: 'street2',
          suburb: 'suburb2',
          city: 'city2',
          state: 'state2',
          country: 'au',
        },
        fullAddr: '2 street2, suburb2, state2, 2222, au',
        place_id: '2',
      },
      attendees: ['1', '2'],
      details: 'We will have a fun-filled day.',
    },
  },
];

export const FirstData = {
  title: 'Event1',
  createdBy: '1',
  timestamp: 1649203353,
  photo: 'https://playmeets.com/event1.png',
  slots: 5,
  location: {
    name: 'Venue1',
    addrObject: {
      number: '1',
      zipcode: '1111',
      street: 'street1',
      suburb: 'suburb1',
      city: 'city1',
      state: 'state1',
      country: 'au',
    },
    fullAddr: '1 street1, suburb1, state1, 1111, au',
    place_id: '1',
  },
  attendees: ['1'],
  details: 'Eat and play',
};
