import { HeartOutlined, UserAddOutlined } from '@ant-design/icons';
import { Card, Tooltip } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { useContext, useEffect, useState } from 'react';
import { AppEvent, UserData } from '../../common/Interfaces';
import { EventPhoto } from './Content.styled';
import Avatar from '../user/Avatar';
import { Link } from 'react-router-dom';
import {
  getEvtPhotoUrlWithTransform,
  toFormattedDateTimeString,
} from '../../common/Helpers';
import { UsersWithinStateContext } from '../../context/UsersWithinState';

interface EventCardProps {
  appEvt: AppEvent;
}

const EventCard = ({ appEvt }: EventCardProps) => {
  const [userHost, setUserHost] = useState<UserData>();

  const { data } = appEvt;

  const { getAppUserById } = useContext(UsersWithinStateContext);

  useEffect(() => {
    setUserHost(getAppUserById(data.createdBy)?.data);
  }, []);

  return (
    <Link to={`/events/${appEvt.id}`}>
      <Card
        style={{ width: 300 }}
        cover={
          <EventPhoto
            alt={data.title}
            src={getEvtPhotoUrlWithTransform(data.photo)}
          />
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
          avatar={<Avatar imgSrc={userHost?.photoUrl} />}
          title={data.title}
          description={toFormattedDateTimeString(data.timestamp, true)}
        />
      </Card>
    </Link>
  );
};

export default EventCard;
