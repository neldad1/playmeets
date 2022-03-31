import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationStatus, NotificationType } from '../common/Enums';
import { setDocument } from '../common/Firebase';
import { AppNotification } from '../common/Interfaces';
import { FlexBlock } from '../components/Components.styled';
import { CurrentUserContext } from '../context/CurrentUser';
import {
  NotificationContainer,
  NotificationRectangle,
} from './Notification.styled';

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
        switch (type) {
          case NotificationType.REQUEST:
            navigate(`/notifications/${appNotification.id}`);
            break;
          case NotificationType.COMMENT:
            navigate(`/events/${appNotification.data.eid}`);
            break;
        }
      });
  };

  return (
    <FlexBlock>
      <NotificationContainer>
        <NotificationRectangle
          status={notificationStatus}
          onClick={onResponseNotificationClick}
        >
          {message}
        </NotificationRectangle>
      </NotificationContainer>
    </FlexBlock>
  );
};

export default Notification;
