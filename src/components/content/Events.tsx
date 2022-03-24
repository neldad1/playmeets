import { useContext, useEffect, useState } from 'react';
import { getDocuments } from '../../common/Firebase';
import { isObjectEmpty } from '../../common/Helpers';
import { AppEvent, EventData } from '../../common/Interfaces';
import { CurrentUserContext } from '../../context/CurrentUser';
import { FlexRow } from './Content.styled';
import EventCard from './EventCard';

const Events = () => {
  const [events, setEvents] = useState<AppEvent[]>([]);

  const currentUser = useContext(CurrentUserContext);

  const getEventsInCurrentLocState = async (state: string) => {
    const appEvents: AppEvent[] = [];
    const eventDocs = await getDocuments('events', 'location.state', state);
    eventDocs.forEach((eventDoc) => {
      appEvents.push({ id: eventDoc.id, data: eventDoc.data() as EventData });
    });
    setEvents(appEvents);
  };

  useEffect(() => {
    if (!isObjectEmpty(currentUser)) {
      getEventsInCurrentLocState(currentUser.state);
    }
  }, [currentUser]);

  return (
    <FlexRow>
      {events.map((appEvt) => (
        <EventCard key={appEvt.id} appEvt={appEvt} />
      ))}
    </FlexRow>
  );
};

export default Events;