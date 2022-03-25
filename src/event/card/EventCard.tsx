import { Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { useContext, useEffect, useState } from 'react';
import { AppEvent, AppUser } from '../../common/Interfaces';
import { Link } from 'react-router-dom';
import {
  getEvtPhotoUrlWithTransform,
  toFormattedDateTimeString,
} from '../../common/Helpers';
import { UsersWithinStateContext } from '../../context/UsersWithinState';
import { CurrentUserContext } from '../../context/CurrentUser';
import Avatar from '../../components/Avatar';
import { EventPhoto } from './Card.styled';
import Favourite from '../../components/Favourite';
import RequestToJoin from '../../components/RequestToJoin';
import { ConsoleSqlOutlined } from '@ant-design/icons';

interface EventCardProps {
  appEvt: AppEvent;
}

const EventCard = ({ appEvt }: EventCardProps) => {
  const [userHost, setUserHost] = useState<AppUser>();

  const { data } = appEvt;

  const { getAppUserById } = useContext(UsersWithinStateContext);
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setUserHost(getAppUserById(data.createdBy));
  }, []);

  if (!userHost) return <></>;

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
          <Favourite currentUser={currentUser} eid={appEvt.id} />,
          <RequestToJoin
            to={userHost}
            from={currentUser.id}
            eid={appEvt.id}
            eventTitle={appEvt.data.title}
          />,
        ]}
      >
        <Meta
          avatar={<Avatar imgSrc={userHost.data.photoUrl} />}
          title={data.title}
          description={toFormattedDateTimeString(data.timestamp, true)}
        />
      </Card>
    </Link>
  );
};

export default EventCard;
