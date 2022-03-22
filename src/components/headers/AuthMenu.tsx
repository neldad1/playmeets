import { Menu } from 'antd';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { auth, logout } from '../../common/Firebase';
import Avatar from '../users/Avatar';
import NotifIcon from './NotifIcon';

const { SubMenu } = Menu;

const AuthMenu = () => {
  const [user] = useAuthState(auth);
  return (
    <Menu className="menu" mode="horizontal">
      <Menu.Item key="createevent">
        <Link to="/create-event">Create An Event</Link>
      </Menu.Item>
      <Menu.Item key="notification" icon={<NotifIcon />}>
        <Link to="/notification" />
      </Menu.Item>
      <SubMenu
        key="subMenu"
        icon={<Avatar imageSrc={user?.photoURL as string} />}
      >
        <Menu.Item key="yourevents">
          <Link to="/yourevents"> Your Events</Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link to="/profile"> Profile</Link>
        </Menu.Item>
        <Menu.Item key="logout" onClick={logout}>
          <Link to="/">Logout</Link>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default AuthMenu;
