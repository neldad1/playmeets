import { MenuFoldOutlined } from '@ant-design/icons';
import { Badge, Menu } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NotificationStatus } from '../../common/Enums';
import { getDocuments, logout } from '../../common/Firebase';
import { isObjectEmpty } from '../../common/Helpers';
import { NotificationData } from '../../common/Interfaces';
import { CurrentUserContext } from '../../context/CurrentUser';
import Avatar from '../Avatar';
import { FlexBlock } from '../Components.styled';
import { MenuItemContainer, MenuItemText } from './Header.styled';
import HeaderIcon from './HeaderIcon';
import NotificationIcon from './HeaderIcon';

const { SubMenu } = Menu;

interface MenuIconProps {
  title: string;
  link: string;
  icon: JSX.Element;
}
const MenuIcon = ({ title, link, icon }: MenuIconProps) => {
  const navigate = useNavigate();

  const onItemClick = () => {
    if (Boolean(link.length)) navigate(link);
  };
  return (
    <MenuItemContainer onClick={onItemClick}>
      {icon}
      <MenuItemText>{title}</MenuItemText>
    </MenuItemContainer>
  );
};

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
          }
        });
        setTotalNotifications(count);
      });
    }
  }, [currentUser]);

  if (isObjectEmpty(currentUser)) return <></>;

  const imgSrc = currentUser.data?.photoUrl ?? '';

  return (
    <Menu
      className="menu"
      mode="horizontal"
      overflowedIndicator={<MenuFoldOutlined className="antd-icon-action" />}
    >
      <Menu.Item
        key="createevent"
        icon={
          <MenuIcon
            title="Create an Event"
            link="/create-event"
            icon={
              <HeaderIcon imgSrc={require('../../assets/createevent.png')} />
            }
          />
        }
      />

      <Menu.Item
        key="notification"
        icon={
          <MenuIcon
            title="Notifications"
            link="/notifications"
            icon={<HeaderIcon imgSrc={require('../../assets/bellIcon.png')} />}
          />
        }
      />

      <SubMenu
        key="subMenu"
        icon={
          <MenuIcon
            title="Profile"
            link=""
            icon={<HeaderIcon imgSrc={imgSrc} />}
          />
        }
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
