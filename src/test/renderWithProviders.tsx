import { act, render } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CurrentUserContext } from '../context/CurrentUser';
import { UsersWithinStateContext } from '../context/UsersWithinState';
import { mockCurrentUser } from './mockData/mockCurrentUser';
import { mockUsersWithinState } from './mockData/mockUsersWithinState';

export const renderWithProviders = (component: JSX.Element) => {
  act(() => {
    render(
      <BrowserRouter>
        <CurrentUserContext.Provider value={mockCurrentUser}>
          <UsersWithinStateContext.Provider
            value={{
              allUsers: mockUsersWithinState,
              getAppUserById: jest.fn().mockImplementation(() => {
                return mockUsersWithinState[0];
              }),
            }}
          >
            <Routes>
              <Route path="*" element={component} />
            </Routes>
          </UsersWithinStateContext.Provider>
        </CurrentUserContext.Provider>
      </BrowserRouter>
    );
  });
};
