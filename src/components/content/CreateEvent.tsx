import { Button, DatePicker, Form, Input, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AuStates } from '../../common/DataObjects';
import { EventData, Location } from '../../common/Interfaces';
import { addDocument, auth } from '../../common/Firebase';
import UploadPhoto from './UploadPhoto';
import { useNavigate } from 'react-router-dom';
import { toFirestoreEvt } from '../../common/Helpers';

const { Option } = Select;

const CreateEvent = () => {
  const [user] = useAuthState(auth);
  const [eventData, setEventData] = useState<EventData>({} as EventData);
  const [location, setLocation] = useState<Location>({} as Location);
  const [imgUrl, setImgUrl] = useState(
    'https://res.cloudinary.com/playmeets/image/upload/v1647919105/playmeets/pm-event-defaultPhoto_ez2rxu.png'
  );

  const navigate = useNavigate();

  const setAppEvtValue = (attr: Object) => {
    setEventData({
      ...eventData,
      ...attr,
    });
  };

  const setLocValue = (attr: Object) => {
    setLocation({ ...location, ...attr });
  };

  const onDatePickerChange = (value: any, dateString: string) => {
    setAppEvtValue({ timestamp: new Date(dateString).getTime() });
  };

  const onButtonClick = () => {
    const data = toFirestoreEvt(eventData);
    addDocument('events', data).then((result) => {
      if (result) navigate('/events');
    });
  };

  useEffect(() => {
    if (location.zipcode) {
      setAppEvtValue({ location: location });
    }
  }, [location.zipcode]);

  useEffect(() => {
    setAppEvtValue({ photo: imgUrl, createdBy: user?.uid });
  }, [imgUrl]);

  return (
    <Form layout="vertical">
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
      <Form.Item label="Venue" required>
        <Input
          placeholder="Where will the event take place?"
          onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
            setLocValue({ name: target.value })
          }
        />
      </Form.Item>
      <Form.Item label="Street number and name" required>
        <Input
          placeholder="Enter the venue's street number and name"
          onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
            setLocValue({ street: target.value })
          }
        />
      </Form.Item>
      <Form.Item label="Suburb" required>
        <Input
          placeholder="Enter the suburb"
          onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
            setLocValue({ suburb: target.value })
          }
        />
      </Form.Item>
      <Form.Item label="City" required>
        <Input
          placeholder="Enter the city near the venue"
          onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
            setLocValue({ city: target.value })
          }
        />
      </Form.Item>
      <Form.Item label="State" required>
        <Select onChange={(val: string) => setLocValue({ state: val })}>
          {AuStates.map((state: string, index: number) => (
            <Option key={index} value={state}>
              {state}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Zipcode" required>
        <Input
          type="number"
          placeholder="Enter the zipcode"
          onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
            setLocValue({ zipcode: target.value })
          }
        />
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
      <Form.Item label="Details" required>
        <TextArea
          placeholder="Additional information"
          onChange={({ target }: ChangeEvent<HTMLTextAreaElement>) =>
            setAppEvtValue({ details: target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <UploadPhoto setImgUrl={setImgUrl} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={onButtonClick}>
          Create Event
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateEvent;