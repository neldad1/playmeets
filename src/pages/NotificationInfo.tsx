import { Divider } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDocument } from '../common/Firebase';
import { NotificationData } from '../common/Interfaces';
import { UsersWithinStateContext } from '../context/UsersWithinState';
import { PagesContainer } from './Pages.styled';
import ProfileInfo from '../user/ProfileInfo';
import NotificationRequest from '../notification/info/NotificationRequest';

const NotificationInfo = () => {
  const { notificationId } = useParams();
  const [notificationData, setNotificationData] = useState<NotificationData>(
    {} as NotificationData
  );

  const { getAppUserById } = useContext(UsersWithinStateContext);

  useEffect(() => {
    getDocument('notifications', notificationId).then((notifDoc) => {
      if (notifDoc?.exists())
        setNotificationData(notifDoc.data() as NotificationData);
    });
  }, [notificationId]);

  const fromUser = getAppUserById(notificationData.from);

  return (
    <PagesContainer offset="1em">
      {fromUser && <ProfileInfo appUser={fromUser} />}
      <Divider />
      <NotificationRequest
        message={notificationData.message}
        from={notificationData.from}
        nid={notificationId as string}
        eid={notificationData.eid}
      />
    </PagesContainer>
  );
};

export default NotificationInfo;
