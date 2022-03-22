import { HeartOutlined, UserAddOutlined } from '@ant-design/icons';
import { Card, Tooltip } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { useEffect, useState } from 'react';
import { AppEvent, EventData } from '../../common/FSConverter';
import { getDocument } from '../../common/Firebase';
import { EventPhoto } from './Content.styled';
import Avatar from '../users/Avatar';
import { Link } from 'react-router-dom';
import { toFormattedDateTimeString } from '../../common/Helpers';

const UPLOAD_STR = 'upload';
const IMG_TRANSFORM = '/c_fill,h_150,w_300';

interface EventCardProps {
  appEvt: AppEvent;
}

const EventCard = ({ appEvt }: EventCardProps) => {
  const [userPhotoUrl, setUserPhotoUrl] = useState('');

  const { data } = appEvt;

  const getUser = () => {
    getDocument('users', data.createdBy).then((result) => {
      if (result) {
        setUserPhotoUrl(result.photoUrl);
      }
    });
  };

  useEffect(() => {
    if (userPhotoUrl.length === 0) getUser();
  }, []);

  const dateTimeString = toFormattedDateTimeString(data.timestamp);

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
    <Link to={`/events/${appEvt.id}`}>
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
          avatar={<Avatar imageSrc={userPhotoUrl} />}
          title={data.title}
          description={dateTimeString}
        />
      </Card>
    </Link>
  );
};

export default EventCard;
