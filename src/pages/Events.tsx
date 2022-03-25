import { useContext, useEffect, useState } from 'react';
import { getDocuments } from '../common/Firebase';
import { isObjectEmpty } from '../common/Helpers';
import { AppEvent, EventData } from '../common/Interfaces';
import { FlexBlock } from '../components/Components.styled';
import { CurrentUserContext } from '../context/CurrentUser';
import EventList from '../event/list/EventList';

const Events = () => {
  const [events, setEvents] = useState<AppEvent[]>([]);

  const currentUser = useContext(CurrentUserContext);

  const getEventsInCurrentLocState = async (state: string) => {
    console.log(state);
    const appEvents: AppEvent[] = [];
    const eventDocs = await getDocuments('events', 'location.state', state);
    eventDocs.forEach((eventDoc) => {
      appEvents.push({ id: eventDoc.id, data: eventDoc.data() as EventData });
    });
    setEvents(appEvents);
  };

  useEffect(() => {
    console.log(currentUser);
    if (!isObjectEmpty(currentUser)) {
      getEventsInCurrentLocState(currentUser.data.state);
    }
  }, [currentUser]);

  return (
    <FlexBlock>
      <EventList list={events} />
    </FlexBlock>
  );
};

export default Events;
