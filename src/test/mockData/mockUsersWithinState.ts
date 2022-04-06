import { AppUser } from '../../common/Interfaces';

export const mockUsersWithinState: AppUser[] = [
  {
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
        // { eid: '0', status: 'Hosting' },
      ],
    },
  },
  {
    id: '1',
    data: {
      favourites: [],
      email: 'test@test.com',
      ageGroup: ['0-3'],
      state: 'VIC',
      city: 'test',
      displayName: 'Test',
      events: [],
      name: 'Test Test',
    },
  },
  {
    id: '2',
    data: {
      state: 'VIC',
      city: 'Two',
      email: 'two@two.com',
      displayName: 'Two',
      name: 'Two Two',
      ageGroup: ['4-6'],
    },
  },
];
