import { useContext, useEffect, useState } from 'react';
import { getDocuments } from '../common/Firebase';
import { AppNotification, NotificationData } from '../common/Interfaces';
import { FlexBlock } from '../components/Components.styled';
import { CurrentUserContext } from '../context/CurrentUser';
import Notification from '../notification/Notification';

const Notifications = () => {
  const [appNotifications, setAppNotifications] = useState<AppNotification[]>(
    []
  );
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (!currentUser) return;

    getDocuments('notifications', 'to', currentUser.id).then((notifDocs) => {
      const userNotifs: AppNotification[] = [];
      notifDocs.forEach((doc) => {
        const notif: AppNotification = {
          id: doc.id,
          data: doc.data() as NotificationData,
        };
        userNotifs.push(notif);
      });
      setAppNotifications(userNotifs);
    });
  }, [currentUser]);

  const notificationElements = appNotifications.map((notif) => (
    <Notification key={notif.id} appNotification={notif} />
  ));

  return <FlexBlock>{notificationElements}</FlexBlock>;
};

export default Notifications;
