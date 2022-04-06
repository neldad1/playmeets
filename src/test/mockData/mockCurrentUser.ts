import { AppUser } from '../../common/Interfaces';

export const mockCurrentUser: AppUser = {
  id: '0',
  data: {
    notifications: [],
    displayName: 'Dummy',
    ageGroup: ['0-3', '4-6'],
    favourites: [],
    name: 'Dummy Dummy',
    email: 'dummy@dummy.com',
    city: 'dummy',
    photoUrl: 'https://dummy.com/dummy.png',
    state: 'VIC',
    events: [
      { eid: '1', status: 'Hosting' },
      { eid: '2', status: 'Joined' },
    ],
  },
};
