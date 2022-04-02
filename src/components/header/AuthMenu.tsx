import { MenuFoldOutlined } from '@ant-design/icons';
import { Badge, Menu } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NotificationStatus, NotificationType } from '../../common/Enums';
import { getDocuments, logout } from '../../common/Firebase';
import { isObjectEmpty } from '../../common/Helpers';
import { NotificationData } from '../../common/Interfaces';
import { CurrentUserContext } from '../../context/CurrentUser';
import Avatar from '../Avatar';
import NotificationIcon from './NotificationIcon';

const { SubMenu } = Menu;

const AuthMenu = () => {
  const [totalNotifications, setTotalNotifications] = useState(0);

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (!isObjectEmpty(currentUser)) {
      let count = 0;
      getDocuments('notifications', 'to', currentUser.id).then((notifDocs) => {
        notifDocs.forEach((notifDoc) => {
          const notifData = notifDoc.data() as NotificationData;
          if (notifData.status === NotificationStatus.UNREAD) {
            ++count;
            console.log('Count: ', count);
          }
        });
        setTotalNotifications(count);
      });
    }
  }, [currentUser]);

  if (isObjectEmpty(currentUser)) return <></>;

  const imgSrc = currentUser.data.photoUrl ?? '';

  return (
    <Menu
      className="menu"
      mode="horizontal"
      overflowedIndicator={<MenuFoldOutlined className="antd-icon-action" />}
    >
      <Menu.Item key="createevent">
        <Link to="/create-event">Create An Event</Link>
      </Menu.Item>

      <Menu.Item key="notification">
        <Link to="/notifications">
          <Badge count={totalNotifications}>
            <NotificationIcon />
          </Badge>
        </Link>
      </Menu.Item>

      <SubMenu key="subMenu" icon={<Avatar imgSrc={imgSrc} />}>
        <Menu.Item key="yourevents">
          <Link to="/yourevents"> Your Events</Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link to="/profile"> Profile</Link>
        </Menu.Item>
        <Menu.Item key="logout" onClick={logout}>
          Logout
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default AuthMenu;
