import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { logout } from '../../Firebase';
import Avatar from '../User/Avatar';
import NotifIcon from './NotifIcon';

const { SubMenu } = Menu;

const AuthMenu = () => {
  return (
    <Menu className="menu" mode="horizontal">
      <Menu.Item key="createevent">
        <Link to="/createevent">Create An Event</Link>
      </Menu.Item>
      <Menu.Item key="notification" icon={<NotifIcon />}>
        <Link to="/notification" />
      </Menu.Item>
      <SubMenu key="subMenu" icon={<Avatar />}>
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
