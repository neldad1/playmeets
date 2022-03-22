import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDocument } from '../../common/Firebase';
import { EventData } from '../../common/FSConverter';
import { toFormattedDateTimeString } from '../../common/Helpers';

const EventInfo = () => {
  const { eventId } = useParams();

  const [eventData, setEventData] = useState<EventData>();

  const getEventInfo = () => {
    getDocument('events', eventId).then((result) => {
      if (result) setEventData(result?.data() as EventData);
    });
  };

  useEffect(() => getEventInfo(), [eventId]);

  if (!eventData) return <>NO EVENT INFO</>;

  const timestamp = toFormattedDateTimeString(eventData.timestamp);

  return <></>;
};
export default EventInfo;
