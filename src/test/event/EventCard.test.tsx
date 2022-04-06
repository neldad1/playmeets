/* eslint-disable testing-library/no-debugging-utils */
/* eslint-disable testing-library/no-node-access */
import { screen } from '@testing-library/react';
import { mockEvents } from '../../test/mockData/mockEvents';
import { renderWithProviders } from '../renderWithProviders';
import EventCard from '../../event/card/EventCard';

describe('Testing <EventCard /> component', () => {
  it('should render the <EventCard/> once', () => {
    renderWithProviders(<EventCard appEvt={mockEvents[0]} />);
    expect(document.querySelectorAll('.antd-card').length).toEqual(1);
    expect(screen.getByText('Event1')).toBeInTheDocument();
    expect(screen.getByText('Wed, Apr 6, 12:02 AM')).toBeInTheDocument();
    expect(screen.getAllByRole('img').length).toEqual(4);
  });
});
