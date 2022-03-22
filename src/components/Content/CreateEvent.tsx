import { Button, DatePicker, Form, Input, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AuStates } from '../../common/DataObjects';
import { EventData, Location, toFirestoreEvt } from '../../common/FSConverter';
import { addDocument, auth } from '../../common/Firebase';
import UploadPhoto from './UploadPhoto';
import { useNavigate } from 'react-router-dom';

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
    console.log('Input: ', eventData);
    const data = toFirestoreEvt(eventData);
    console.log(data);
    addDocument('events', data).then((res) => {
      if (res) navigate('/events');
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
          onChange={({ target }: SyntheticEvent) =>
            setAppEvtValue({ title: (target as HTMLInputElement).value })
          }
        />
      </Form.Item>
      <Form.Item label="Date and Time" required>
        <DatePicker showTime onChange={onDatePickerChange} />
      </Form.Item>
      <Form.Item label="Venue" required>
        <Input
          placeholder="Where will the event take place?"
          onChange={({ target }: SyntheticEvent) =>
            setLocValue({ name: (target as HTMLInputElement).value })
          }
        />
      </Form.Item>
      <Form.Item label="Street number and name" required>
        <Input
          placeholder="Enter the venue's street number and name"
          onChange={({ target }: SyntheticEvent) =>
            setLocValue({ street: (target as HTMLInputElement).value })
          }
        />
      </Form.Item>
      <Form.Item label="Suburb" required>
        <Input
          placeholder="Enter the suburb"
          onChange={({ target }: SyntheticEvent) =>
            setLocValue({ suburb: (target as HTMLInputElement).value })
          }
        />
      </Form.Item>
      <Form.Item label="City" required>
        <Input
          placeholder="Enter the city near the venue"
          onChange={({ target }: SyntheticEvent) =>
            setLocValue({ city: (target as HTMLInputElement).value })
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
          onChange={({ target }: SyntheticEvent) =>
            setLocValue({ zipcode: (target as HTMLInputElement).value })
          }
        />
      </Form.Item>
      <Form.Item label="Maximum Number of Attendees" required>
        <Input
          type="number"
          placeholder="Enter the maximum attendees."
          onChange={({ target }: SyntheticEvent) =>
            setAppEvtValue({ slots: (target as HTMLInputElement).value })
          }
        />
      </Form.Item>
      <Form.Item label="Details" required>
        <TextArea
          placeholder="Additional information"
          onChange={({ target }: SyntheticEvent) =>
            setAppEvtValue({ details: (target as HTMLInputElement).value })
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
