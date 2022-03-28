import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { NotificationStatus, NotificationType } from '../common/Enums';
import { setDocument } from '../common/Firebase';
import { AppNotification } from '../common/Interfaces';
import { CurrentUserContext } from '../context/CurrentUser';
import { NotificationRectangle } from './Notification.styled';

interface RequestNotificationRectProps {
  nid: string;
  status: number;
  message: string;
}
const RequestNotificationRect = ({
  nid,
  status,
  message,
}: RequestNotificationRectProps) => {
  return (
    <Link to={`/notifications/${nid}`}>
      <NotificationRectangle status={status}>{message}</NotificationRectangle>
    </Link>
  );
};

interface NotificationProps {
  appNotification: AppNotification;
}
const Notification = ({ appNotification }: NotificationProps) => {
  const { status, message, type } = appNotification.data;
  const [notificationStatus, setNotificationStatus] = useState(status);

  const currentUser = useContext(CurrentUserContext);

  const onResponseNotificationClick = () => {
    setDocument('notifications', appNotification.id, {
      ...appNotification.data,
      status: NotificationStatus.READ,
    }).then(() => {
      setNotificationStatus(NotificationStatus.READ);
      const newUserNotifs = currentUser.data.notifications?.filter(
        (notif) => notif !== appNotification.id
      );
      setDocument('users', currentUser.id, {
        ...currentUser.data,
        notifications: newUserNotifs,
      });
    });
  };

  return type === NotificationType.REQUEST ? (
    <RequestNotificationRect
      nid={appNotification.id}
      status={status}
      message={message}
    />
  ) : (
    <NotificationRectangle
      status={notificationStatus}
      onClick={onResponseNotificationClick}
    >
      {message}
    </NotificationRectangle>
  );
};

export default Notification;
