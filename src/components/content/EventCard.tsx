import { HeartFilled, HeartOutlined, UserAddOutlined } from '@ant-design/icons';
import { Card, Tooltip } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { AppEvent, UserData } from '../../common/Interfaces';
import { EventPhoto } from './Content.styled';
import Avatar from '../user/Avatar';
import { Link } from 'react-router-dom';
import {
  getEvtPhotoUrlWithTransform,
  toFormattedDateTimeString,
} from '../../common/Helpers';
import { UsersWithinStateContext } from '../../context/UsersWithinState';
import { setDocument } from '../../common/Firebase';
import { CurrentUserContext } from '../../context/CurrentUser';

interface EventCardProps {
  appEvt: AppEvent;
}

const EventCard = ({ appEvt }: EventCardProps) => {
  const [userHost, setUserHost] = useState<UserData>();
  const [isFavourite, setIsFavourite] = useState(false);

  const { data } = appEvt;

  const { getAppUserById } = useContext(UsersWithinStateContext);
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setUserHost(getAppUserById(data.createdBy)?.data);
  }, []);

  const onFaveClick = (event: SyntheticEvent) => {
    event.preventDefault();
    setDocument('users', currentUser.id, {
      ...currentUser.data,
      favourites: [...(currentUser.data.favourites ?? []), appEvt.id],
    });
    setIsFavourite(true);
  };

  const onUnFaveClick = (event: SyntheticEvent) => {
    event.preventDefault();
    const faves = currentUser.data.favourites.filter(
      (fave) => fave !== appEvt.id
    );
    setDocument('users', currentUser.id, {
      ...currentUser.data,
      favourites: faves,
    });
    setIsFavourite(false);
  };

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
            {isFavourite ? (
              <HeartFilled key="fave-filled" onClick={onUnFaveClick} />
            ) : (
              <HeartOutlined key="fave-outlined" onClick={onFaveClick} />
            )}
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
