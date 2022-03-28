import { useContext, useEffect, useState } from 'react';
import { NotificationStatus } from '../common/Enums';
import { getDocuments } from '../common/Firebase';
import { AppNotification, NotificationData } from '../common/Interfaces';
import { FlexBlock } from '../components/Components.styled';
import { CurrentUserContext } from '../context/CurrentUser';
import Notification from '../notification/Notification';

const NoNotification = () => {
  return <>No new notification</>;
};

interface WithNotificationProps {
  unreadNotifications: AppNotification[];
}
const WithNotification = ({ unreadNotifications }: WithNotificationProps) => {
  return (
    <>
      {unreadNotifications.map((notif) => (
        <Notification key={notif.id} appNotification={notif} />
      ))}
    </>
  );
};

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

  const unreadNotifications = appNotifications.filter(
    (notif) => notif.data.status === NotificationStatus.UNREAD
  );

  return (
    <FlexBlock>
      {Boolean(unreadNotifications.length) ? (
        <WithNotification unreadNotifications={unreadNotifications} />
      ) : (
        <NoNotification />
      )}
    </FlexBlock>
  );
};

export default Notifications;
