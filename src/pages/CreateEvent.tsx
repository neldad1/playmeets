import { Button, DatePicker, Form, Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDocument, setDocument } from '../common/Firebase';
import { toFirestoreEvt } from '../common/Helpers';
import { EventData, Location, UserEvent } from '../common/Interfaces';
import UploadPhoto from '../components/UploadPhoto';
import { PagesContainer } from './Pages.styled';
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from 'react-google-places-autocomplete';
import { getVenueAddress } from '../common/getVenueAddress';
import { CurrentUserContext } from '../context/CurrentUser';
import { UserEventStatus } from '../common/Enums';

const CreateEvent = () => {
  const [eventData, setEventData] = useState<EventData>({} as EventData);
  const [location, setLocation] = useState<Location>({} as Location);
  const [imgUrl, setImgUrl] = useState(
    'https://res.cloudinary.com/playmeets/image/upload/v1647919105/playmeets/pm-event-defaultPhoto_ez2rxu.png'
  );
  const [autoValue, setAutoValue] = useState('');
  const [venueAddr, setVenueAddr] = useState('');

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
    setAppEvtValue({ timestamp: new Date(dateString).getTime() / 1000 });
  };

  const onCreateEventButtonClick = () => {
    const data = toFirestoreEvt(eventData);
    addDocument('events', data).then((result) => {
      if (result) {
        let userEvents: UserEvent[] = [];
        const hostedEvent = { eid: result.id, status: UserEventStatus.HOSTING };
        if (currentUser.data.events) {
          userEvents = [...currentUser.data.events, hostedEvent];
        } else {
          userEvents.push(hostedEvent);
        }
        setDocument('users', currentUser.id, {
          ...currentUser.data,
          events: userEvents,
        }).then(() => navigate('/events'));
      }
    });
  };

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

  return (
    <PagesContainer offset="1em">
      <Form layout="vertical" className="antd-form">
        <Form.Item label="Title" required>
          <Input
            placeholder="Enter the title"
            onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
              setAppEvtValue({ title: target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Date and Time" required>
          <DatePicker showTime onChange={onDatePickerChange} />
        </Form.Item>
        <Form.Item label="Maximum Number of Attendees" required>
          <Input
            type="number"
            placeholder="Enter the maximum attendees."
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
            onChange={({ target }: ChangeEvent<HTMLTextAreaElement>) =>
              setAppEvtValue({ details: target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Upload image.">
          <UploadPhoto setImgUrl={setImgUrl} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={onCreateEventButtonClick}>
            Create Event
          </Button>
        </Form.Item>
      </Form>
    </PagesContainer>
  );
};

export default CreateEvent;
