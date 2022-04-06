import { PagesContainer } from './Pages.styled';
import { Tabs } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../context/CurrentUser';
import { AppEvent, EventData } from '../common/Interfaces';
import { isObjectEmpty } from '../common/Helpers';
import EventCard from '../event/card/EventCard';
import { getDocuments } from '../common/Firebase';
import { FlexRowCenter } from '../components/Components.styled';
import EmptyList from '../components/EmptyList';
const { TabPane } = Tabs;

const CurrentUserEvents = () => {
  const [allEventsWithinState, setAllEventsWithinState] = useState<AppEvent[]>(
    []
  );
  const [createdEvents, setCreatedEvents] = useState<AppEvent[]>([]);
  const [faveEvents, setFaveEvents] = useState<AppEvent[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<AppEvent[]>([]);

  const currentUser = useContext(CurrentUserContext);
  const { data } = currentUser;

  useEffect(() => {
    if (isObjectEmpty(currentUser)) return;

    let appEvents: AppEvent[] = [];
    getDocuments('events', 'location.addrObject.state', data.state).then(
      (eventDocs) => {
        eventDocs.forEach((eventDoc) => {
          appEvents.push({
            id: eventDoc.id,
            data: eventDoc.data() as EventData,
          });
        });

        if (appEvents.length > 1) {
          appEvents.sort((event1, event2) => {
            const ts1 = event1.data.timestamp;
            const ts2 = event2.data.timestamp;
            if (ts1 < ts2) return -1;
            if (ts1 > ts2) return 1;
            return 0;
          });
        }

        setAllEventsWithinState(appEvents);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  useEffect(() => {
    if (allEventsWithinState.length === 0) return;
    getHostingEvents();
    getFaveEvents();
    getUserEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const upcomingEvents: AppEvent[] = [];

    data.events.forEach((userEvt) => {
      const userEvent = allEventsWithinState.find(
        (evt) => userEvt.eid === evt.id
      );

      if (
        userEvent &&
        userEvent.data.timestamp > Math.round(Date.now() / 1000)
      ) {
        upcomingEvents.push(userEvent);
      }
    });
    setUpcomingEvents(upcomingEvents);
  };

  if (!Boolean(allEventsWithinState.length))
    return (
      <PagesContainer offset="1em">
        <EmptyList />
      </PagesContainer>
    );

  return (
    <PagesContainer>
      <Tabs defaultActiveKey="1" centered={true}>
        <TabPane tab="Upcoming" key="1">
          <FlexRowCenter>
            {Boolean(upcomingEvents.length) ? (
              upcomingEvents.map((event) => (
                <EventCard key={event.id} appEvt={event} />
              ))
            ) : (
              <EmptyList
                message="You don't have any upcoming events."
                link="/events"
                actionTitle="Browse Events"
              />
            )}
          </FlexRowCenter>
        </TabPane>
        <TabPane tab="Created" key="2">
          <FlexRowCenter>
            {Boolean(createdEvents.length) ? (
              createdEvents.map((event) => (
                <EventCard key={event.id} appEvt={event} />
              ))
            ) : (
              <EmptyList message="You haven't created an event." />
            )}
          </FlexRowCenter>
        </TabPane>
        <TabPane tab="Favourites" key="3">
          <FlexRowCenter>
            {Boolean(faveEvents.length) ? (
              faveEvents.map((event) => (
                <EventCard key={event.id} appEvt={event} />
              ))
            ) : (
              <EmptyList
                message="You haven't favourited any event."
                link="/events"
                actionTitle="Browse Events"
              />
            )}
          </FlexRowCenter>
        </TabPane>
      </Tabs>
    </PagesContainer>
  );
};

export default CurrentUserEvents;
