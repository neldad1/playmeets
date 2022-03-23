import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { auth, getDocument } from '../../common/Firebase';
import { AppUser, EventData } from '../../common/Interfaces';
import { getUserData } from '../../common/Helpers';
import { FlexBlock, FlexSpaceBetween } from './Content.styled';
import Banner from '../eventdetails/Banner';
import Attendees from '../eventdetails/Attendees';
import Comments from '../eventdetails/Comments';
import Details from '../eventdetails/Details';

const EventInfo = () => {
  const { eventId } = useParams();
  const { state } = useLocation();
  const users = state as AppUser[];

  const [eventData, setEventData] = useState<EventData>();

  useEffect(() => {
    if (!Boolean(eventData)) {
      getDocument('events', eventId).then((result) => {
        if (result) setEventData(result as EventData);
      });
    }
  }, [eventData, eventId]);

  if (!eventData) return <>NO EVENT INFO</>;

  const host = getUserData(users, eventData.createdBy);
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
          <Attendees users={users} attendees={eventData.attendees} />
          <Comments eid={eventId as string} appUsers={users} />
        </FlexBlock>
      </FlexSpaceBetween>
    </FlexBlock>
  );
};
export default EventInfo;
