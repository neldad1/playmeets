import { useContext, useEffect, useState } from 'react';
import { getDocuments } from '../common/Firebase';
import { isObjectEmpty } from '../common/Helpers';
import { AppEvent, EventData } from '../common/Interfaces';
import { CurrentUserContext } from '../context/CurrentUser';
import EventList from '../event/list/EventList';
import { PagesContainer } from './Pages.styled';

const Events = () => {
  const [events, setEvents] = useState<AppEvent[]>([]);

  const currentUser = useContext(CurrentUserContext);

  const getEventsInCurrentLocState = async (state: string = '') => {
    if (!Boolean(state.length)) return;

    const appEvents: AppEvent[] = [];
    const eventDocs = await getDocuments('events', 'location.state', state);
    eventDocs.forEach((eventDoc) => {
      appEvents.push({ id: eventDoc.id, data: eventDoc.data() as EventData });
    });
    setEvents(appEvents);
  };

  useEffect(() => {
    if (!isObjectEmpty(currentUser)) {
      getEventsInCurrentLocState(currentUser.data.state);
    }
  }, [currentUser]);

  return (
    <PagesContainer>
      <EventList list={events} />
    </PagesContainer>
  );
};

export default Events;
