import { useEffect, useState } from 'react';
import { getDocuments } from '../../Firebase';
import { AppEvent, fromFirestore } from '../../Common/EventConverter';
import { FlexRow } from './Content.styled';
import EventItem from './EventItem';

const Events = () => {
  const [events, setEvents] = useState<AppEvent[]>([]);

  // const fromFirestore = (data: AppEvent): AppEvent => {
  //   return {
  //     eid: data.eid,
  //     title: data.title,
  //     createdBy: data.createdBy,
  //     timestamp: data.timestamp,
  //     locationName: data.locationName,
  //     location: {
  //       street: data.location.street,
  //       suburb: data.location.suburb,
  //       city: data.location.city,
  //       state: data.location.state,
  //       zipcode: data.location.zipcode,
  //     },
  //     comments: data.comments,
  //     attendees: data.attendees,
  //   };
  // };

  const getEventsFromUserState = async () => {
    const docs = await getDocuments('events', 'location.state', 'Vic');
    let appEvents: AppEvent[] = [];
    docs.forEach((doc) => {
      const data = doc.data();
      const appEvt = fromFirestore(data as AppEvent);
      console.log(appEvt);
      appEvents.push(appEvt);
    });
    setEvents(appEvents);
  };

  useEffect(() => {
    getEventsFromUserState();
  }, []);

  return (
    /*<FlexRow>
      {events.map((appEvt, index) => (
        <EventItem key={index} data={appEvt} />
      ))}
    </FlexRow>*/
    <FlexRow>
      {[...events, ...events, ...events, ...events, ...events, ...events].map(
        (appEvt, index) => (
          <EventItem key={index} data={appEvt} />
        )
      )}
    </FlexRow>
  );
};

export default Events;
