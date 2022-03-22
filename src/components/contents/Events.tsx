import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth, getDocument, getDocuments } from '../../common/Firebase';
import { AppEvent, EventData } from '../../common/FSConverter';
import { FlexRow } from './Content.styled';
import EventCard from './EventCard';

const Events = () => {
  const [events, setEvents] = useState<AppEvent[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>();

  const getCurrentUserLocState = async () => {
    const result = await getDocument('users', currentUser?.uid);
    if (result) {
      return result.state;
    }
  };

  const getEventsFromCurrentUser = async () => {
    const state = await getCurrentUserLocState();
    const docs = await getDocuments('events', 'location.state', state);
    let appEvents: AppEvent[] = [];
    docs.forEach((doc) => {
      const newEvt: AppEvent = { id: doc.id, data: doc.data() as EventData };
      appEvents.push(newEvt);
    });
    setEvents(appEvents);
  };

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged((firebaseUser: User | null) =>
      setCurrentUser(firebaseUser)
    );
    return subscriber;
  }, []);

  useEffect(() => {
    if (Boolean(currentUser)) getEventsFromCurrentUser();
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
