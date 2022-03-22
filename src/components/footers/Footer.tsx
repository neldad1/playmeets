import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { FooterCont, FooterLabel } from './Footer.styled';

const Footer = () => {
  return (
    <FooterCont>
      <FooterLabel>© Playmeets 2022</FooterLabel>
      <Menu mode="horizontal" className="menu">
        <Menu.Item key="terms">
          <Link to="/terms">Terms</Link>
        </Menu.Item>
        <Menu.Item key="privacy">
          <Link to="/privacy">Privacy</Link>
        </Menu.Item>
      </Menu>
    </FooterCont>
  );
};

export default Footer;
