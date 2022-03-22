import { useEffect, useState } from 'react';
import { getDocuments } from '../../common/Firebase';
import { AppEvent, EventData } from '../../common/FSConverter';
import { FlexRow } from './Content.styled';
import EventCard from './EventCard';

const Events = () => {
  const [events, setEvents] = useState<AppEvent[]>([]);

  const getEventsFromUserState = async () => {
    const docs = await getDocuments('events', 'location.state', 'Vic');
    let appEvents: AppEvent[] = [];
    docs.forEach((doc) => {
      const newEvt: AppEvent = { id: doc.id, data: doc.data() as EventData };
      appEvents.push(newEvt);
    });
    setEvents(appEvents);
  };

  useEffect(() => {
    getEventsFromUserState();
  }, []);

  return (
    <FlexRow>
      {[...events, ...events, ...events, ...events].map((appEvt, index) => (
        <EventCard key={index} data={appEvt.data} />
      ))}
    </FlexRow>
  );
};

export default Events;
