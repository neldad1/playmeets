import { Divider } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDocument } from '../common/Firebase';
import { AppUser, NotificationData } from '../common/Interfaces';
import { UsersWithinStateContext } from '../context/UsersWithinState';
import { FlexColumn, PagesContainer } from './Pages.styled';
import ProfileInfo from '../user/ProfileInfo';
import NotificationRequest from '../notification/NotificationRequest';
import { NotificationStatus, UserEventStatus } from '../common/Enums';
import { isObjectEmpty } from '../common/Helpers';

const NotificationInfo = () => {
  const { notificationId } = useParams();
  const { getAppUserById } = useContext(UsersWithinStateContext);

  const [notificationData, setNotificationData] = useState<NotificationData>(
    {} as NotificationData
  );
  const [isResponded, setIsResponded] = useState(false);
  const [fromUser, setFromUser] = useState<AppUser>({} as AppUser);

  useEffect(() => {
    getDocument('notifications', notificationId).then((notifDoc) => {
      if (notifDoc?.exists())
        setNotificationData(notifDoc.data() as NotificationData);
    });
  }, [notificationId]);

  useEffect(() => {
    if (!notificationData) return;

    const user = getAppUserById(notificationData.from);
    if (!user) return;

    setFromUser(user);

    console.log(user);
    if (user.data.events) {
      const userEvent = user.data.events.find(
        (event) => event.eid === notificationData.eid
      );
      console.log(userEvent);
      setIsResponded(
        userEvent?.status === UserEventStatus.JOINED &&
          notificationData.status === NotificationStatus.READ
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationData]);

  if (isObjectEmpty(fromUser))
    return <PagesContainer>The user is not existing.</PagesContainer>;

  return (
    <PagesContainer offset="1em">
      {<ProfileInfo appUser={fromUser} />}
      <Divider />
      {isResponded ? (
        <FlexColumn>You have already responded to this request.</FlexColumn>
      ) : (
        <NotificationRequest
          message={notificationData.message}
          from={notificationData.from}
          nid={notificationId as string}
          eid={notificationData.eid}
        />
      )}
    </PagesContainer>
  );
};

export default NotificationInfo;
