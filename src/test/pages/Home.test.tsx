/* eslint-disable testing-library/no-debugging-utils */
/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HowItWorks from '../../home/HowItWorks';
import Step from '../../home/Step';
import { container } from '../../setupTests';
import Home from '../../pages/Home';

describe('Testing <Home /> component', () => {
  it('should render the <Home/> and <Landing/>', () => {
    act(() => {
      render(
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Home />} />
          </Routes>
        </BrowserRouter>,
        container
      );
    });
    expect(screen.getByTestId('landing-img').getAttribute('src')).toEqual(
      'carKids.svg'
    );
    expect(
      screen.getByText('"It is a happy talent to know how to play"')
    ).toBeInTheDocument();
    expect(screen.getByText('- Ralph Waldo Emerson')).toBeInTheDocument();
    expect(screen.getByText('Sign up for more details')).toBeInTheDocument();
    expect(screen.getByText('How Playmeets Works')).toBeInTheDocument();
  });
});

describe('Testing <HowItWorks/> component', () => {
  it('should render the title and description', () => {
    act(() => {
      render(
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<HowItWorks />} />
          </Routes>
        </BrowserRouter>,
        container
      );
    });
    expect(screen.getByText('How Playmeets Works')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Meet the parents who are interested to gain some friends and playmates for their kids. Creating an account is free.'
      )
    ).toBeInTheDocument();
  });
});

describe('Testing <Step/> component', () => {
  it('should render the title and description', () => {
    act(() => {
      const stepInfo = {
        id: 0,
        imgSrc: 'assets/join.svg',
        title: 'DummyTitle',
        description: 'This is a dummy description.',
      };
      render(
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Step info={stepInfo} />} />
          </Routes>
        </BrowserRouter>,
        container
      );
    });
    expect(screen.getByText('DummyTitle')).toBeInTheDocument();
    expect(
      screen.getByText('This is a dummy description.')
    ).toBeInTheDocument();
  });
});
