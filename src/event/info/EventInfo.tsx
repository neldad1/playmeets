import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDocument } from '../../common/Firebase';
import { AppEvent, EventData } from '../../common/Interfaces';
import { FlexBlock } from '../../components/Components.styled';
import { UsersWithinStateContext } from '../../context/UsersWithinState';
import Address from './Address';
import Attendees from './Attendees';
import Banner from './Banner';
import Comments from './Comments';
import DateAndTime from './DateAndTime';
import Details from './Details';
import { FlexSpaceBetween } from './EventDetails.styled';
import LocationMap from './LocationMap';

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
    <FlexBlock>
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
    </FlexBlock>
  );
};
export default EventInfo;
