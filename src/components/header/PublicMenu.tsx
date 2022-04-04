import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import SignupSolid from '../../assets/headerIcons/signup.png';
import LoginSolid from '../../assets/headerIcons/login.png';
import IconWithLabel from './IconWithLabel';
import HeaderIcon from './HeaderIcon';

const PublicMenu = () => {
  return (
    <Menu className="menu" mode="horizontal">
      <Menu.Item
        key="signup"
        icon={
          <IconWithLabel
            title="Sign Up"
            link="/signup"
            direction="column"
            icon={<HeaderIcon imgSrc={SignupSolid} />}
          />
        }
      />

      <Menu.Item
        key="login"
        icon={
          <IconWithLabel
            title="Login"
            link="/login"
            direction="column"
            icon={<HeaderIcon imgSrc={LoginSolid} />}
          />
        }
      />
    </Menu>
  );
};

export default PublicMenu;
