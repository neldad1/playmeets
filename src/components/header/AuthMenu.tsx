import { MenuFoldOutlined } from '@ant-design/icons';
import { Badge, Menu } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { auth, logout } from '../../common/Firebase';
import { isObjectEmpty } from '../../common/Helpers';
import { CurrentUserContext } from '../../context/CurrentUser';
import Avatar from '../Avatar';
import NotificationIcon from './NotificationIcon';

const { SubMenu } = Menu;

const AuthMenu = () => {
  const [user] = useAuthState(auth);
  const [totalNotifications, setTotalNotifications] = useState(0);

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (!isObjectEmpty(currentUser)) {
      const count = currentUser.data.notifications
        ? currentUser.data.notifications.length
        : 0;
      setTotalNotifications(count);
    }
  }, [currentUser]);

  return (
    <Menu
      className="menu"
      mode="horizontal"
      overflowedIndicator={<MenuFoldOutlined className="antd-icon-action" />}
    >
      <Menu.Item key="createevent">
        <Link to="/create-event">Create An Event</Link>
      </Menu.Item>

      <Menu.Item key="notification" icon={<NotificationIcon />}>
        <Badge count={totalNotifications}>
          <Link to="/notification" />
        </Badge>
      </Menu.Item>

      <SubMenu
        key="subMenu"
        icon={<Avatar imgSrc={user?.photoURL as string} />}
      >
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
