import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDocument } from '../../common/Firebase';
import { EventData } from '../../common/Interfaces';
import {
  FlexBlock,
  FlexSpaceBetween,
} from '../../components/Components.styled';
import { UsersWithinStateContext } from '../../context/UsersWithinState';
import Attendees from './Attendees';
import Banner from './Banner';
import Comments from './Comments';
import Details from './Details';
import LocationMap from './LocationMap';

const EventInfo = () => {
  const { eventId } = useParams();

  const [eventData, setEventData] = useState<EventData>();

  const { getAppUserById } = useContext(UsersWithinStateContext);

  useEffect(() => {
    if (!Boolean(eventData)) {
      getDocument('events', eventId).then((eventDoc) => {
        if (eventDoc) setEventData(eventDoc.data() as EventData);
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
