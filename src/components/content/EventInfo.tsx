import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDocument } from '../../common/Firebase';
import { EventData } from '../../common/Interfaces';
import { FlexBlock, FlexSpaceBetween } from './Content.styled';
import Banner from '../eventdetails/Banner';
import Attendees from '../eventdetails/Attendees';
import Comments from '../eventdetails/Comments';
import Details from '../eventdetails/Details';
import LocationMap from '../eventdetails/LocationMap';
import { UsersWithinStateContext } from '../../context/UsersWithinState';

const EventInfo = () => {
  const { eventId } = useParams();

  const [eventData, setEventData] = useState<EventData>();

  const { getAppUserById } = useContext(UsersWithinStateContext);

  useEffect(() => {
    if (!Boolean(eventData)) {
      getDocument('events', eventId).then((result) => {
        if (result) setEventData(result as EventData);
      });
    }
  }, [eventData, eventId]);

  if (!eventData) return <>NO EVENT INFO</>;

  const host = getAppUserById(eventData.createdBy)?.data;
  return (
    <FlexBlock>
      <Banner
        timestamp={eventData.timestamp}
        location={eventData.location}
        title={eventData.title}
        userData={host}
      />
      <FlexSpaceBetween>
        <FlexBlock>
          <Details details={eventData.details} />
          <Attendees attendees={eventData.attendees} />
          <Comments eid={eventId as string} />
        </FlexBlock>
        <LocationMap location={eventData.location} />
      </FlexSpaceBetween>
    </FlexBlock>
  );
};
export default EventInfo;
