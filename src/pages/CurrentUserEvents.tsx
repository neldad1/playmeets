import { PagesContainer } from './Pages.styled';
import { Tabs } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../context/CurrentUser';
import { AppEvent, EventData } from '../common/Interfaces';
import { isObjectEmpty } from '../common/Helpers';
import EventCard from '../event/card/EventCard';
import { getDocuments } from '../common/Firebase';
import { FlexRowCenter } from '../components/Components.styled';
const { TabPane } = Tabs;

const CurrentUserEvents = () => {
  const [allEventsWithinState, setAllEventsWithinState] = useState<AppEvent[]>(
    []
  );
  const [hostingEvents, setHostingEvents] = useState<AppEvent[]>([]);
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
    if (hostEvents) setHostingEvents(hostEvents);
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
    return <PagesContainer>No Events</PagesContainer>;

  return (
    <PagesContainer>
      <Tabs defaultActiveKey="1" centered={true}>
        <TabPane tab="All" key="1">
          <FlexRowCenter>
            {allUserEvents.map((event) => (
              <EventCard key={event.id} appEvt={event} />
            ))}
          </FlexRowCenter>
        </TabPane>
        <TabPane tab="Host" key="2">
          <FlexRowCenter>
            {hostingEvents.map((event) => (
              <EventCard key={event.id} appEvt={event} />
            ))}
          </FlexRowCenter>
        </TabPane>
        <TabPane tab="Fave" key="3">
          <FlexRowCenter>
            {faveEvents.map((event) => (
              <EventCard key={event.id} appEvt={event} />
            ))}
          </FlexRowCenter>
        </TabPane>
      </Tabs>
    </PagesContainer>
  );
};

export default CurrentUserEvents;
