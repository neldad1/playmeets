/* eslint-disable testing-library/no-node-access */
import { mockEvents } from '../../test/mockData/mockEvents';
import EventList from '../../event/EventList';
import { renderWithProviders } from '../renderWithProviders';

describe('Testing <EventList /> component', () => {
  it('should render the <EventCard/> twice', () => {
    renderWithProviders(<EventList list={mockEvents} />);
    expect(document.querySelectorAll('.antd-card').length).toEqual(2);
  });
});
