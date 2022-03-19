import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const PublicMenu = () => {
  return (
    <Menu className="menu" mode="horizontal">
      <Menu.Item key="signup">
        <Link to="/signup">Sign Up</Link>
      </Menu.Item>
      <Menu.Item key="login">
        <Link to="/login"> Log In</Link>
      </Menu.Item>
    </Menu>
  );
};

export default PublicMenu;
