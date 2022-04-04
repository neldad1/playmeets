import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDocument } from '../../common/Firebase';
import { AppEvent, EventData } from '../../common/Interfaces';
import { PagesContainer } from '../../pages/Pages.styled';
import EventForm from './EventForm';

const EditEvent = () => {
  const { eventId } = useParams();

  const [appEvent, setAppEvent] = useState<AppEvent>();

  useEffect(() => {
    if (!appEvent) {
      getDocument('events', eventId).then((eventDoc) => {
        if (eventDoc)
          setAppEvent({ id: eventDoc.id, data: eventDoc.data() as EventData });
      });
    }
  }, []);

  return (
    <PagesContainer>
      <EventForm isEditEvent={true} appEvent={appEvent} />
    </PagesContainer>
  );
};

export default EditEvent;
