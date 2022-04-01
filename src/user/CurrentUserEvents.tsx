import { PagesContainer } from '../pages/Pages.styled';
import { Tabs } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../context/CurrentUser';
import { AppEvent, EventData } from '../common/Interfaces';
import { isObjectEmpty } from '../common/Helpers';
import EventCard from '../event/card/EventCard';
import { getDocuments } from '../common/Firebase';
import { FlexRowLeft } from '../components/Components.styled';
const { TabPane } = Tabs;

const CurrentUserEvents = () => {
  const [allEventsWithinState, setAllEventsWithinState] = useState<AppEvent[]>(
    []
  );
  const [createdEvents, setCreatedEvents] = useState<AppEvent[]>([]);
  const [faveEvents, setFaveEvents] = useState<AppEvent[]>([]);
  const [allUserEvents, setAllsUserEvents] = useState<AppEvent[]>([]);

  const currentUser = useContext(CurrentUserContext);
  const { data } = currentUser;

  useEffect(() => {
    if (isObjectEmpty(currentUser)) return;
    let appEvents: AppEvent[] = [];
    getDocuments('events', 'location.state', data.state).then((eventDocs) => {
      eventDocs.forEach((eventDoc) => {
        appEvents.push({
          id: eventDoc.id,
          data: eventDoc.data() as EventData,
        });
      });
      setAllEventsWithinState(appEvents);
    });
  }, [currentUser]);

  useEffect(() => {
    if (allEventsWithinState.length === 0) return;
    getHostingEvents();
    getFaveEvents();
    getUserEvents();
  }, [allEventsWithinState]);

  const getHostingEvents = () => {
    if (!data.events) return;

    const hostEvents = allEventsWithinState.filter(
      (evt) => evt.data.createdBy === currentUser.id
    );
    if (hostEvents) setCreatedEvents(hostEvents);
  };

  const getFaveEvents = () => {
    if (!data.favourites) return;

    const faveEvents: AppEvent[] = [];
    data.favourites.forEach((fave) => {
      const faveEvt = allEventsWithinState.find((evt) => evt.id === fave);
      if (faveEvt) faveEvents.push(faveEvt);
    });
    setFaveEvents(faveEvents);
  };

  const getUserEvents = () => {
    if (!data.events) return;

    const userEvents: AppEvent[] = [];
    data.events.forEach((fave) => {
      const userEvent = allEventsWithinState.find((evt) => evt.id === fave.eid);
      if (userEvent) userEvents.push(userEvent);
    });
    setAllsUserEvents(userEvents);
  };

  if (!Boolean(allEventsWithinState.length))
    return <PagesContainer offset="1em">No Events</PagesContainer>;

  return (
    <PagesContainer>
      <Tabs defaultActiveKey="1" centered={true}>
        <TabPane tab="All" key="1">
          <FlexRowLeft>
            {allUserEvents.map((event) => (
              <EventCard key={event.id} appEvt={event} />
            ))}
          </FlexRowLeft>
        </TabPane>
        <TabPane tab="Created" key="2">
          <FlexRowLeft>
            {createdEvents.map((event) => (
              <EventCard key={event.id} appEvt={event} />
            ))}
          </FlexRowLeft>
        </TabPane>
        <TabPane tab="Favourites" key="3">
          <FlexRowLeft>
            {faveEvents.map((event) => (
              <EventCard key={event.id} appEvt={event} />
            ))}
          </FlexRowLeft>
        </TabPane>
      </Tabs>
    </PagesContainer>
  );
};

export default CurrentUserEvents;