import { List } from 'antd';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationStatus, NotificationType } from '../common/Enums';
import { setDocument } from '../common/Firebase';
import { AppNotification } from '../common/Interfaces';
import Avatar from '../components/Avatar';
import { NotificationListContainer } from './Notification.styled';
import { UsersWithinStateContext } from '../context/UsersWithinState';
import { CurrentUserContext } from '../context/CurrentUser';

interface NotificationListProps {
  appNotifications: AppNotification[];
}
const NotificationList = ({ appNotifications }: NotificationListProps) => {
  const { getAppUserById } = useContext(UsersWithinStateContext);
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const onListItemClick = (appNotification: AppNotification) => {
    const { type, eid } = appNotification.data;
    //change the notification status
    setDocument('notifications', appNotification.id, {
      ...appNotification.data,
      status: NotificationStatus.READ,
    })
      .then(() => {
        //remove notification from the current user
        const { data } = currentUser;
        const userNotifs = data.notifications?.filter(
          (notif) => notif !== appNotification.id
        );
        setDocument('users', appNotification.data.to, {
          ...data,
          notifications: userNotifs,
        });
      })
      .then(() => {
        //navigate to next route
        const link =
          type === NotificationType.REQUEST
            ? `/notifications/${appNotification.id}`
            : `/events/${eid}`;

        navigate(link);
      });
  };

  const getUrl = (uid: string): string => {
    const user = getAppUserById(uid);
    return user?.data.photoUrl ?? '';
  };

  return (
    <NotificationListContainer>
      <List
        itemLayout="horizontal"
        dataSource={appNotifications}
        renderItem={(item) => (
          <List.Item
            className={`read${item.data.status}`}
            onClick={() => onListItemClick(item)}
          >
            <List.Item.Meta
              avatar={<Avatar imgSrc={getUrl(item.data.from)} />}
              title={<span>{item.data.type}</span>}
              description={item.data.message}
            />
          </List.Item>
        )}
      />
    </NotificationListContainer>
  );
};

export default NotificationList;
