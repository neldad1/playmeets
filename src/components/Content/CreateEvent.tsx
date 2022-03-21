import { UploadOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Select, Upload } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { UploadFile } from 'antd/lib/upload/interface';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AuStates } from '../../common/DataObjects';
import { AppEvent, Location, toFirestore } from '../../common/EventConverter';
import { addDocument, auth } from '../../common/Firebase';
import UploadPhoto from './UploadPhoto';

const { Option } = Select;

const CreateEvent = () => {
  const [user] = useAuthState(auth);
  const [appEvent, setAppEvent] = useState<AppEvent>({} as AppEvent);
  const [location, setLocation] = useState<Location>({} as Location);
  const [imgUrl, setImgUrl] = useState('');

  const setAppEvtValue = (attr: Object) => {
    setAppEvent({
      ...appEvent,
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
    const obj = toFirestore(appEvent);
    console.log(obj);
    addDocument('events', obj);
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
      <Form.Item label="Event Venue" required>
        <Input
          placeholder="Enter the event venue"
          onChange={({ target }: SyntheticEvent) =>
            setLocValue({ name: (target as HTMLInputElement).value })
          }
        />
      </Form.Item>
      <Form.Item label="Street number and name" required>
        <Input
          placeholder="Enter the street number and name"
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
