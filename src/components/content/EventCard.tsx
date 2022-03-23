import { HeartOutlined, UserAddOutlined } from '@ant-design/icons';
import { Card, Tooltip } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { useEffect, useState } from 'react';
import { AppEvent, AppUser, UserData } from '../../common/Interfaces';
import { EventPhoto } from './Content.styled';
import Avatar from '../user/Avatar';
import { Link } from 'react-router-dom';
import { getUserData, toFormattedDateTimeString } from '../../common/Helpers';

const UPLOAD_STR = 'upload';
const IMG_TRANSFORM = '/c_fill,h_150,w_300';

interface EventCardProps {
  appEvt: AppEvent;
  appUsers: AppUser[];
}

const EventCard = ({ appEvt, appUsers }: EventCardProps) => {
  const [userHost, setUserHost] = useState<UserData>();

  const { data } = appEvt;

  const getUserHost = () => {
    const user = getUserData(appUsers, data.createdBy);
    if (user) setUserHost(user);
  };

  useEffect(() => {
    if (!userHost) getUserHost();
  }, []);

  const dateTimeString = toFormattedDateTimeString(data.timestamp, true);

  const getEvtPhotoUrlWithTransform = () => {
    const photoUrl = data.photo;
    const uploadIndex = photoUrl.indexOf(UPLOAD_STR);
    const newPhotoUrl =
      photoUrl.slice(0, uploadIndex + UPLOAD_STR.length) +
      IMG_TRANSFORM +
      photoUrl.slice(uploadIndex + UPLOAD_STR.length);
    return newPhotoUrl;
  };

  return (
    <Link to={`/events/${appEvt.id}`} state={appUsers}>
      <Card
        style={{ width: 300 }}
        cover={
          <EventPhoto alt={data.title} src={getEvtPhotoUrlWithTransform()} />
        }
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
          avatar={<Avatar userData={userHost} />}
          title={data.title}
          description={dateTimeString}
        />
      </Card>
    </Link>
  );
};

export default EventCard;
