import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDocuments } from '../common/Firebase';
import { isObjectEmpty } from '../common/Helpers';
import { AppEvent, EventData } from '../common/Interfaces';
import { CurrentUserContext } from '../context/CurrentUser';
import EventList from '../event/list/EventList';
import { PagesContainer } from './Pages.styled';

const Events = () => {
  const [events, setEvents] = useState<AppEvent[]>([]);

  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const getEventsInCurrentLocState = async (state: string = '') => {
    if (!Boolean(state.length)) {
      navigate('/finish-signup');
    }

    const appEvents: AppEvent[] = [];
    const eventDocs = await getDocuments(
      'events',
      'location.addrObject.state',
      state
    );
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

  if (events.length > 1) {
    events.sort((event1, event2) => {
      const ts1 = event1.data.timestamp;
      const ts2 = event2.data.timestamp;
      if (ts1 < ts2) return -1;
      if (ts1 > ts2) return 1;
      return 0;
    });
  }

  return (
    <PagesContainer>
      <EventList list={events} />
    </PagesContainer>
  );
};

export default Events;
