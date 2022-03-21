import { HeartOutlined, UserAddOutlined } from '@ant-design/icons';
import { Card, Tooltip, Avatar } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { useEffect, useState } from 'react';
import { AppEvent } from '../../common/EventConverter';
import { getDocument } from '../../common/Firebase';
//import Avatar from '../User/Avatar';
import { EventPhoto } from './Content.styled';

interface EventItemProps {
  data: AppEvent;
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

  console.log(data.timestamp);
  const ts: any = data.timestamp;
  const date = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'UTC',
  }).format(ts * 1000);

  return (
    <Card
      style={{ width: 300 }}
      cover={<EventPhoto alt={data.title} src={data.photo} />}
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
