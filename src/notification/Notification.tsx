import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NotificationStatus, NotificationType } from '../common/Enums';
import { setDocument } from '../common/Firebase';
import { AppNotification } from '../common/Interfaces';
import { CurrentUserContext } from '../context/CurrentUser';
import { PagesContainer } from '../pages/Pages.styled';
import {
  NotificationContainer,
  NotificationRectangle,
} from './Notification.styled';

interface RequestNotificationRectProps {
  nid: string;
  status: number;
  message: string;
  link: string;
}
const RequestNotificationRect = ({
  nid,
  status,
  message,
  link = '',
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
  const navigate = useNavigate();

  const onResponseNotificationClick = () => {
    setDocument('notifications', appNotification.id, {
      ...appNotification.data,
      status: NotificationStatus.READ,
    })
      .then(() => {
        setNotificationStatus(NotificationStatus.READ);
        const newUserNotifs = currentUser.data.notifications?.filter(
          (notif) => notif !== appNotification.id
        );
        setDocument('users', currentUser.id, {
          ...currentUser.data,
          notifications: newUserNotifs,
        });
      })
      .then(() => {
        let link = '';
        switch (type) {
          case NotificationType.REQUEST:
            link = `/notifications/${appNotification.id}`;
            break;
          case NotificationType.COMMENT:
            link = `/events/${appNotification.data.eid}`;
            break;
          default:
            link = '';
        }
        if (link !== '') navigate(link);
      });
  };

  return (
    <PagesContainer>
      <NotificationContainer>
        <NotificationRectangle
          status={notificationStatus}
          onClick={onResponseNotificationClick}
        >
          {message}
        </NotificationRectangle>
      </NotificationContainer>
    </PagesContainer>
  );
};

export default Notification;
