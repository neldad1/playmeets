/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-debugging-utils */
import { act, render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../../pages/Login';
import { container } from '../../setupTests';

describe('Testing <Login /> component', () => {
  it('should render the <Login/> form', () => {
    act(() => {
      render(
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Login />} />
          </Routes>
        </BrowserRouter>,
        container
      );
    });
    expect(screen.getByText('Not a member yet?')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Log In')).toBeInTheDocument();
    expect(screen.getByText('Login with Google')).toBeInTheDocument();
    expect(screen.getByTestId('logo').getAttribute('src')).toEqual(
      '/playmeets/logo512.svg'
    );
  });
});
