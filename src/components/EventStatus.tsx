import {
  CarryOutOutlined,
  CheckOutlined,
  HourglassFilled,
  UserAddOutlined,
} from '@ant-design/icons';
import Tooltip from 'antd/lib/tooltip';
import { SyntheticEvent, useContext } from 'react';
import {
  NotificationStatus,
  NotificationType,
  UserEventStatus,
} from '../common/Enums';
import { addDocument, setDocument } from '../common/Firebase';
import { AppUser } from '../common/Interfaces';
import { CurrentUserContext } from '../context/CurrentUser';

interface EventStatusProps {
  host: AppUser;
  eid: string;
  eventTitle: string;
}
const EventStatus = ({ host, eid, eventTitle }: EventStatusProps) => {
  const currentUser = useContext(CurrentUserContext);

  const updateHostNotifications = (nid: string) => {
    const { notifications } = host.data;
    let notifs: string[] = [];
    if (notifications) notifs = [...notifications];
    notifs.push(nid);
    setDocument('users', host.id, { ...host.data, notifications: notifs });
  };

  const updateCurrentUserEvents = () => {
    if (currentUser.data.events) {
      const userEvents = currentUser.data.events;
      userEvents.push({ eid, status: UserEventStatus.PENDING });
      setDocument('users', currentUser.id, {
        ...currentUser.data,
        events: userEvents,
      });
    }
  };

  const onPlusClick = (event: SyntheticEvent) => {
    event.preventDefault();
    const newNotification = {
      type: NotificationType.REQUEST,
      to: host.id,
      from: currentUser.id,
      eid: eid,
      status: NotificationStatus.UNREAD,
      message: `${currentUser.data.displayName} has requested to join ${eventTitle}`,
    };
    addDocument('notifications', newNotification).then((notifDoc) => {
      if (notifDoc) updateHostNotifications(notifDoc.id);
    });

    updateCurrentUserEvents();
  };

  let toolTip = 'Request to Join';
  let element = (
    <UserAddOutlined
      key="join"
      onClick={onPlusClick}
      className="antd-icon-action"
    />
  );

  if (currentUser.data.events) {
    const userEvent = currentUser.data.events.find((evt) => evt.eid === eid);
    if (userEvent) {
      switch (userEvent.status) {
        case UserEventStatus.PENDING:
          element = (
            <HourglassFilled key="pending" className="antd-icon-action" />
          );
          toolTip = 'Request is pending';
          break;
        case UserEventStatus.JOINED:
          element = <CheckOutlined key="joined" className="antd-icon-action" />;
          toolTip = 'You have joined this event.';
          break;
        case UserEventStatus.HOSTING:
          element = (
            <CarryOutOutlined key="hosting" className="antd-icon-action" />
          );
          toolTip = 'You are hosting this event.';
          break;
      }
    }
  }

  return (
    <Tooltip title={toolTip} color="blue" placement="bottom">
      {element}
    </Tooltip>
  );
};

export default EventStatus;
