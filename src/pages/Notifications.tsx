import { useContext, useEffect, useState } from 'react';
import { getDocuments } from '../common/Firebase';
import { AppNotification, NotificationData } from '../common/Interfaces';
import { CurrentUserContext } from '../context/CurrentUser';
import { PagesContainer } from './Pages.styled';
import NotificationList from '../notification/NotificationList';

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
      if (userNotifs.length > 1) {
        userNotifs.sort((notif1, notif2) => {
          const ts1 = notif1.data.timestamp;
          const ts2 = notif2.data.timestamp;
          if (ts1 > ts2) return -1;
          if (ts1 < ts2) return 1;
          return 0;
        });
      }
      setAppNotifications(userNotifs);
    });
  }, [currentUser]);

  return (
    <PagesContainer offset="1em">
      {Boolean(appNotifications.length) ? (
        <NotificationList appNotifications={appNotifications} />
      ) : (
        <>No new notification</>
      )}{' '}
    </PagesContainer>
  );
};

export default Notifications;
