import { MenuFoldOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { NotificationStatus } from '../../common/Enums';
import { getDocuments, logout } from '../../common/Firebase';
import { isObjectEmpty } from '../../common/Helpers';
import { NotificationData } from '../../common/Interfaces';
import { CurrentUserContext } from '../../context/CurrentUser';
import HeaderIcon from './HeaderIcon';
import CreateEventSolid from '../../assets/headerIcons/createEvent.png';
import NotificationSolid from '../../assets/headerIcons/notification.png';
import UserEventsSolid from '../../assets/headerIcons/userEvents.png';
import LogoutSolid from '../../assets/headerIcons/logout.png';
import ProfileSolid from '../../assets/headerIcons/profile.png';
import IconWithLabel from './IconWithLabel';
import DefaultAvatar from '../../assets/defaultAvatar.png';
import { useLocation } from 'react-router-dom';

const { SubMenu } = Menu;

const AuthMenu = () => {
  const [totalNotifications, setTotalNotifications] = useState(0);

  const currentUser = useContext(CurrentUserContext);

  const location = useLocation();

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

  const imgSrc = currentUser.data?.photoUrl ?? DefaultAvatar;

  return (
    <Menu
      className="menu"
      mode="horizontal"
      overflowedIndicator={<MenuFoldOutlined className="antd-icon-action" />}
      selectedKeys={[location.pathname]}
    >
      <Menu.Item
        key="/create-event"
        icon={
          <IconWithLabel
            title="Create an Event"
            link="/create-event"
            direction="column"
            icon={<HeaderIcon imgSrc={CreateEventSolid} />}
          />
        }
      />

      <Menu.Item
        key="/notifications"
        icon={
          <IconWithLabel
            title="Notifications"
            link="/notifications"
            direction="column"
            badgeCount={totalNotifications}
            icon={<HeaderIcon imgSrc={NotificationSolid} />}
          />
        }
      />

      <SubMenu
        key="submenu"
        icon={
          <IconWithLabel
            title="Profile"
            direction="column"
            icon={<HeaderIcon imgSrc={imgSrc} />}
          />
        }
      >
        <Menu.Item
          key="/yourevents"
          icon={
            <IconWithLabel
              title="Your Events"
              link="/yourevents"
              icon={<HeaderIcon imgSrc={UserEventsSolid} />}
            />
          }
        />

        <Menu.Item
          key="/profile"
          icon={
            <IconWithLabel
              title="Profile"
              link="/profile"
              icon={<HeaderIcon imgSrc={ProfileSolid} />}
            />
          }
        />

        <Menu.Item
          key="logout"
          onClick={logout}
          icon={
            <IconWithLabel
              title="Logout"
              icon={<HeaderIcon imgSrc={LogoutSolid} />}
            />
          }
        />
      </SubMenu>
    </Menu>
  );
};

export default AuthMenu;
