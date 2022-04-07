import { Form, Input, DatePicker, Button, Popconfirm } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from 'react-google-places-autocomplete';
import { useNavigate } from 'react-router-dom';
import { deleteDocument, setDocument } from '../../common/Firebase';
import { getVenueAddress } from '../../common/getVenueAddress';
import {
  getEvtPhotoUrlWithTransform,
  isObjectEmpty,
  toFirestoreEvt,
} from '../../common/Helpers';
import {
  AppEvent,
  EventData,
  Location,
  UserEvent,
} from '../../common/Interfaces';
import { FlexRowLeft } from '../../components/Components.styled';
import UploadPhoto from '../../components/UploadPhoto';
import { CurrentUserContext } from '../../context/CurrentUser';
import { EventPhoto } from '../card/Card.styled';

interface EventFormProps {
  appEvent?: AppEvent;
  isEditEvent: boolean;
}
const EventForm = ({
  isEditEvent = true,
  appEvent = {} as AppEvent,
}: EventFormProps) => {
  const [eventData, setEventData] = useState<EventData>({} as EventData);
  const [location, setLocation] = useState<Location>({} as Location);
  const [imgUrl, setImgUrl] = useState(
    'https://res.cloudinary.com/playmeets/image/upload/v1647919105/playmeets/pm-event-defaultPhoto_ez2rxu.png'
  );
  const [autoValue, setAutoValue] = useState('');
  const [venueAddr, setVenueAddr] = useState('');
  const [showPopconfirm, setShowPopconfirm] = useState(false);
  const [dateTimePickerValue, setDateTimePickerValue] = useState(
    moment(eventData.timestamp)
  );

  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const setAppEvtValue = (attr: Object) => {
    setEventData({
      ...eventData,
      ...attr,
    });
  };

  const onVenueChange = (venue: any) => {
    setAutoValue(venue.label);
    geocodeByPlaceId(venue.value.place_id).then((result) => {
      setVenueAddr(result[0].formatted_address);
      const addr = getVenueAddress(result[0].address_components);
      const venueLocation = {
        name: venue.value.structured_formatting.main_text,
        place_id: venue.value.place_id,
        fullAddr: result[0].formatted_address,
        addrObject: addr,
      };
      setLocation(venueLocation);
    });
  };

  const onDatePickerChange = (value: any, dateString: string) => {
    setDateTimePickerValue(value);
    setAppEvtValue({ timestamp: new Date(dateString).getTime() / 1000 });
  };

  const onSaveEventButtonClick = () => {
    const data = toFirestoreEvt(eventData);
    setDocument('events', appEvent.id, data).then(() =>
      navigate(`/events/${appEvent.id}`)
    );
  };

  const onDeleteEventButtonClick = () => {
    if (isEditEvent && !isObjectEmpty(appEvent)) {
      setShowPopconfirm(true);
    }
  };

  useEffect(() => {
    if (isObjectEmpty(appEvent)) return;
    const { data } = appEvent;
    const evtData = {
      title: data.title,
      createdBy: data.createdBy,
      timestamp: data.timestamp,
      photo: data.photo,
      slots: data.slots,
      location: data.location,
      attendees: data.attendees,
      details: data.details,
    };
    setLocation(data.location);
    setVenueAddr(data.location.fullAddr);
    setEventData(evtData);
  }, [appEvent]);

  useEffect(() => {
    if (location) {
      setAppEvtValue({ location });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    const attendees = [currentUser?.id];
    setAppEvtValue({ photo: imgUrl, createdBy: currentUser?.id, attendees });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgUrl]);

  const onPopupConfirm = () => {
    if (!showPopconfirm) return;

    /* User confirmed to delete the event */
    new Promise((resolve) => {
      deleteDocument('events', appEvent.id)
        .then(() => {
          let userEvents: UserEvent[] = [];
          if (currentUser.data.events) {
            userEvents = currentUser.data.events.filter(
              (userEvt) => userEvt.eid !== appEvent.id
            );
          }
          setDocument('users', currentUser.id, {
            ...currentUser.data,
            events: userEvents,
          });
        })
        .then(() => navigate('/events'));
    });
  };

  if (isObjectEmpty(appEvent)) return <>Querying the event information.</>;
  return (
    <Form layout="vertical" className="antd-form">
      <Form.Item label="Title" required>
        <Input
          placeholder="Enter the title"
          value={eventData.title}
          onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
            setAppEvtValue({ title: target.value })
          }
        />
      </Form.Item>
      <Form.Item label="Date and Time" required>
        <DatePicker
          showTime
          value={dateTimePickerValue}
          onChange={onDatePickerChange}
        />
      </Form.Item>
      <Form.Item label="Maximum Number of Attendees" required>
        <Input
          type="number"
          placeholder="Enter the maximum attendees."
          value={eventData.slots}
          onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
            setAppEvtValue({ slots: target.value })
          }
        />
      </Form.Item>
      <Form.Item label="Venue" required>
        <GooglePlacesAutocomplete
          apiKey={process.env.REACT_APP_FIREBASE_API_KEY}
          minLengthAutocomplete={5}
          selectProps={{
            value: autoValue,
            onChange: onVenueChange,
          }}
          autocompletionRequest={{
            componentRestrictions: {
              country: ['au'],
            },
            types: ['establishment'],
          }}
        />
        <p>{location.name}</p>
        <p>{venueAddr}</p>
      </Form.Item>
      <Form.Item label="Details" required>
        <TextArea
          placeholder="Additional information"
          value={eventData.details}
          onChange={({ target }: ChangeEvent<HTMLTextAreaElement>) =>
            setAppEvtValue({ details: target.value })
          }
        />
      </Form.Item>
      <Form.Item label="Change image.">
        <UploadPhoto setImgUrl={setImgUrl} />
        <EventPhoto
          alt={eventData.title}
          src={getEvtPhotoUrlWithTransform(eventData.photo)}
        />
      </Form.Item>
      <Form.Item>
        <FlexRowLeft>
          <Button type="primary" onClick={onSaveEventButtonClick}>
            Save Event
          </Button>
          <Popconfirm
            title="Do you want to delete the event?"
            cancelText="No"
            okText="Yes"
            visible={showPopconfirm}
            onConfirm={onPopupConfirm}
            onCancel={() => setShowPopconfirm(false)}
          >
            <Button type="primary" onClick={onDeleteEventButtonClick} danger>
              Delete Event
            </Button>
          </Popconfirm>
          <Button
            type="primary"
            onClick={() => navigate(`/events/${appEvent.id}`)}
            ghost
          >
            Discard Changes
          </Button>
        </FlexRowLeft>
      </Form.Item>
    </Form>
  );
};

export default EventForm;
