import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDocument } from '../common/Firebase';
import { AppEvent, EventData } from '../common/Interfaces';
import { FlexBlock } from '../components/Components.styled';
import { UsersWithinStateContext } from '../context/UsersWithinState';
import Address from '../event/info/Address';
import Attendees from '../event/info/Attendees';
import Banner from '../event/info/Banner';
import Comments from '../event/info/Comments';
import DateAndTime from '../event/info/DateAndTime';
import Details from '../event/info/Details';
import { FlexSpaceBetween } from '../event/info/EventDetails.styled';
import LocationMap from '../event/info/LocationMap';
import { PagesContainer } from './Pages.styled';

const EventInfo = () => {
  const { eventId } = useParams();

  const [appEvent, setAppEvent] = useState<AppEvent>();

  const { getAppUserById } = useContext(UsersWithinStateContext);

  useEffect(() => {
    if (!Boolean(appEvent)) {
      getDocument('events', eventId).then((eventDoc) => {
        if (eventDoc)
          setAppEvent({ id: eventDoc.id, data: eventDoc.data() as EventData });
      });
    }
  }, [appEvent, eventId]);

  if (!appEvent) return <>NO EVENT INFO</>;

  const { data } = appEvent;

  const host = getAppUserById(data.createdBy);
  if (!host) return <>NO EVENT INFO</>;

  return (
    <PagesContainer>
      <Banner
        timestamp={data.timestamp}
        location={data.location}
        eventTitle={data.title}
        host={host}
        eid={appEvent.id}
      />
      <FlexSpaceBetween>
        <FlexBlock>
          <Details details={data.details} />
          <Attendees attendees={data.attendees} />
          <Comments eid={eventId as string} />
        </FlexBlock>
        <FlexBlock>
          <DateAndTime timestamp={data.timestamp} />
          <Address location={data.location} />
          <LocationMap location={data.location} />
        </FlexBlock>
      </FlexSpaceBetween>
    </PagesContainer>
  );
};
export default EventInfo;
