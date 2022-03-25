import { Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { useContext, useEffect, useState } from 'react';
import { AppEvent, UserData } from '../../common/Interfaces';
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

interface EventCardProps {
  appEvt: AppEvent;
}

const EventCard = ({ appEvt }: EventCardProps) => {
  const [userHost, setUserHost] = useState<UserData>();

  const { data } = appEvt;

  const { getAppUserById } = useContext(UsersWithinStateContext);
  const currentUser = useContext(CurrentUserContext);

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
          <Favourite currentUser={currentUser} eid={appEvt.id} />,
          <RequestToJoin />,
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
