import { HeartOutlined, UserAddOutlined } from '@ant-design/icons';
import { Card, Tooltip, Avatar } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { useEffect, useState } from 'react';
import { EventData } from '../../commons/FSConverter';
import { getDocument } from '../../commons/Firebase';
import { EventPhoto } from './Content.styled';

const UPLOAD_STR = 'upload';
const IMG_TRANSFORM = '/c_fill,h_150,w_300';

interface EventItemProps {
  data: EventData;
}

const EventCard = (event: EventItemProps) => {
  const [userName, setUserName] = useState();
  const [userPhotoUrl, setUserPhotoUrl] = useState();

  const { data } = event;

  const getUser = async () => {
    await getDocument('users', data.createdBy).then((result) => {
      if (result) {
        setUserName(result.displayName);
        setUserPhotoUrl(result.photoUrl);
      }
    });
  };

  useEffect(() => {
    if (!userName) getUser();
  }, []);

  const ts: any = data.timestamp;
  const date = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'UTC',
  }).format(ts * 1000);

  const getPhotoUrlWithTransform = () => {
    const photoUrl = data.photo;
    const uploadIndex = photoUrl.indexOf(UPLOAD_STR);
    const newPhotoUrl =
      photoUrl.slice(0, uploadIndex + UPLOAD_STR.length) +
      IMG_TRANSFORM +
      photoUrl.slice(uploadIndex + UPLOAD_STR.length);
    return newPhotoUrl;
  };

  return (
    <Card
      style={{ width: 300 }}
      cover={<EventPhoto alt={data.title} src={getPhotoUrlWithTransform()} />}
      actions={[
        <Tooltip title="Add to Fave" color="blue">
          <HeartOutlined key="fave" />
        </Tooltip>,
        <Tooltip title="Request to Join" color="blue">
          <UserAddOutlined key="join" />
        </Tooltip>,
      ]}
    >
      <Meta
        avatar={<Avatar src={userPhotoUrl} />}
        title={data.title}
        description={date}
      />
    </Card>
  );
};

export default EventCard;
