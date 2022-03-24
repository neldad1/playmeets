import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth, getDocument, getDocuments } from '../../common/Firebase';
import {
  AppEvent,
  AppUser,
  EventData,
  UserData,
} from '../../common/Interfaces';
import { FlexRow } from './Content.styled';
import EventCard from './EventCard';
//import { CurrentUserContext } from '../../App';

const Events = () => {
  const [events, setEvents] = useState<AppEvent[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [usersInCurrentLocState, setUsersInCurrentLocState] = useState<
    AppUser[]
  >([]);

  // const currentUserContext = useContext(CurrentUserContext);

  const getCurrentUserLocState = () => {
    getDocument('users', currentUser?.uid).then((result) => {
      if (result) {
        getAllUsers(result.state);
      }
    });
    // getAllUsers((currentUserContext as UserData).state);
  };

  const getEventsInCurrentLocState = async (state: string) => {
    const appEvents: AppEvent[] = [];
    const docs = await getDocuments('events', 'location.state', state);
    docs.forEach((doc) => {
      appEvents.push({ id: doc.id, data: doc.data() as EventData });
    });
    setEvents(appEvents);
  };

  const getAllUsers = async (locState: string) => {
    let appUsers: AppUser[] = [];
    const docs = await getDocuments('users', 'state', locState);
    docs.forEach((doc) => {
      const newUser: AppUser = { id: doc.id, data: doc.data() as UserData };
      appUsers.push(newUser);
    });
    setUsersInCurrentLocState(appUsers);
    getEventsInCurrentLocState(locState);
  };

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged((firebaseUser: User | null) =>
      setCurrentUser(firebaseUser)
    );
    return subscriber;
  }, []);

  useEffect(() => {
    if (Boolean(currentUser)) getCurrentUserLocState();
  }, [currentUser]);

  return (
    <FlexRow>
      {events.map((appEvt) => (
        <EventCard
          key={appEvt.id}
          appEvt={appEvt}
          appUsers={usersInCurrentLocState}
        />
      ))}
    </FlexRow>
  );
};

export default Events;
